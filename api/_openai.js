import { getVercelOidcToken } from '@vercel/oidc';

export async function openaiResponse(body) {
  const gatewayKey = process.env.AI_GATEWAY_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  let url;
  let token;
  const payload = { ...body };

  if (gatewayKey) {
    url = 'https://ai-gateway.vercel.sh/v1/responses';
    token = gatewayKey;
    if (payload.model && !String(payload.model).includes('/')) {
      payload.model = `openai/${payload.model}`;
    }
  } else {
    try {
      token = await getVercelOidcToken();
    } catch {}
    if (token) {
      url = 'https://ai-gateway.vercel.sh/v1/responses';
      if (payload.model && !String(payload.model).includes('/')) {
        payload.model = `openai/${payload.model}`;
      }
    } else if (openaiKey) {
      url = 'https://api.openai.com/v1/responses';
      token = openaiKey;
    } else {
      throw new Error('AI 尚未啟用：Vercel OIDC / AI Gateway / OPENAI_API_KEY 皆不可用');
    }
  }

  const r = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data?.error?.message || 'AI request failed');
  return data;
}

export function outputText(data) {
  const parts = [];
  for (const item of data?.output || []) {
    if (item?.type !== 'message') continue;
    for (const c of item?.content || []) {
      if (c?.type === 'output_text' && c?.text) parts.push(c.text);
    }
  }
  return parts.join('\n').trim();
}

export function stripJson(text) {
  return String(text || '')
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```/, '')
    .replace(/```$/, '')
    .trim();
}
