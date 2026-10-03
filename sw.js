const CACHE='okinawa-trip-beta-1.0.5';
const SHELL=['/','/index.html','/app.css?v=beta-1.0.5','/app.js?v=beta-1.0.5','/manifest.webmanifest?v=beta-1.0.5','/privacy.html','/terms.html','/icon.svg'];
const NETWORK_FIRST=new Set(['/app.js','/app.css','/manifest.webmanifest','/sw.js']);

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys()
    .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});

self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin) return;

  if(req.mode==='navigate'){
    event.respondWith(
      fetch(req).then(res=>{
        const copy=res.clone();
        caches.open(CACHE).then(c=>c.put(req,copy));
        return res;
      }).catch(async()=>await caches.match(req)||await caches.match('/index.html'))
    );
    return;
  }

  if(NETWORK_FIRST.has(url.pathname)){
    event.respondWith(
      fetch(req,{cache:'no-store'}).then(res=>{
        if(res.ok){
          const copy=res.clone();
          caches.open(CACHE).then(c=>c.put(req,copy));
        }
        return res;
      }).catch(()=>caches.match(req))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(hit=>hit||fetch(req).then(res=>{
      if(res.ok){
        const copy=res.clone();
        caches.open(CACHE).then(c=>c.put(req,copy));
      }
      return res;
    }))
  );
});
