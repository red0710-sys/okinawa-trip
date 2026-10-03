import { openaiResponse, outputText, stripJson } from './_openai.js';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const query = String(req.body?.query || '').trim();
  if (query.length < 2) return res.status(400).json({ error: '請輸入至少 2 個字' });
  try {
    const found = await openaiResponse({
      model: 'gpt-6-luna',
      instructions: '你是沖繩旅遊即時搜尋助理。使用繁體中文。只根據網路搜尋所得資料回答，優先官方來源。若資訊衝突或不確定要明說。回答控制在220字內，可涵蓋營業時間、票價、交通、親子適合度、雨天備案。',
      input: '搜尋沖繩旅遊資訊：' + query,
      tools: [{ type: 'web_search' }],
      store: false
    });
    const answer = outputText(found);
    const map = new Map();
    for (const item of found.output || []) {
      if (item?.type !== 'message') continue;
      for (const part of item.content || []) {
        if (part?.type !== 'output_text') continue;
        for (const a of part.annotations || []) {
          if (a?.type === 'url_citation' && a?.url) {
            let title = a.title || a.url;
            try { title = a.title || new URL(a.url).hostname; } catch {}
            map.set(a.url, title);
          }
        }
      }
    }
    let places = [];
    if (answer) {
      const extracted = await openaiResponse({
        model: 'gpt-6-luna',
        instructions: '從提供的沖繩旅遊搜尋摘要抽出可實際加入行程的具體景點、餐廳、商場或設施，最多5個。不要把網站、文章標題、行政區或抽象類型當成地點。只輸出合法JSON，不要markdown。格式：{"places":[{"title":"","area":"","type":"景點|美食|購物|其他","note":"","sourceUrl":null,"searchQuery":""}]}',
        input: answer + '\n\n來源：\n' + [...map.entries()].map(([u,t]) => `${t} ${u}`).join('\n'),
        store: false
      });
      try { places = (JSON.parse(stripJson(outputText(extracted))).places || []).slice(0, 5); } catch { places = []; }
    }
    return res.status(200).json({
      answer: answer || '有找到來源，但目前無法產生摘要。',
      sources: [...map.entries()].slice(0, 5).map(([url, title]) => ({ url, title })),
      places
    });
  } catch (e) { const status=String(e?.message||'').includes('OPENAI_API_KEY')?503:500; return res.status(status).json({ error: e?.message || '搜尋失敗' }); }
}
