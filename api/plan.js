import { openaiResponse, outputText, stripJson } from './_openai.js';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const body = req.body || {};
  const days = Math.max(1, Math.min(10, Number(body.days) || 5));
  try {
    const r = await openaiResponse({
      model: 'gpt-6-luna',
      reasoning: { effort: 'medium' },
      instructions: `你是沖繩家庭自由行規劃師。依輸入資料產生可直接套用的完整${days}天行程。每天固定六格：breakfast,morning,lunch,afternoon,dinner,evening。優先減少南北折返，尊重住宿Day範圍、航班首尾日、交通方式、幼童/長輩/推車/午休與不要太趕。首尾日依航班時間降低密度。不要虛構精確評分、票價或未查證營業時間。只輸出合法JSON，不要markdown。格式：{"summary":"","days":[{"day":1,"theme":"","breakfast":{"value":"","meta":""},"morning":{"value":"","meta":""},"lunch":{"value":"","meta":""},"afternoon":{"value":"","meta":""},"dinner":{"value":"","meta":""},"evening":{"value":"","meta":""}}]}。days必須剛好${days}筆。`,
      input: JSON.stringify(body),
      store: false
    });
    const parsed = JSON.parse(stripJson(outputText(r)));
    if (!Array.isArray(parsed.days) || !parsed.days.length) throw new Error('AI 未產生有效行程');
    parsed.days = parsed.days.filter(x => Number(x.day) >= 1 && Number(x.day) <= days).slice(0, days);
    return res.status(200).json(parsed);
  } catch (e) { const status=String(e?.message||'').includes('OPENAI_API_KEY')?503:500; return res.status(status).json({ error: e?.message || 'AI 行程產生失敗' }); }
}
