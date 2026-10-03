export async function openaiResponse(body) {
  const gatewayKey = process.env.AI_GATEWAY_API_KEY;
  const oidc = process.env.VERCEL_OIDC_TOKEN;
  const openaiKey = process.env.OPENAI_API_KEY;

  let url;
  let token;
  let payload = { ...body };

  // Preferred on Vercel: AI Gateway via short-lived OIDC token (no provider secret).
  if (gatewayKey || oidc) {
    url = 'https://ai-gateway.vercel.sh/v1/responses';
    token = gatewayKey || oidc;
    if (payload.model && !String(payload.model).includes('/')) {
      payload.model = `openai/${payload.model}`;
    }
  } else if (openaiKey) {
    // Portable fallback for non-Vercel hosting.
    url = 'https://api.openai.com/v1/responses';
    token = openaiKey;
  } else {
    throw new Error('AI 尚未啟用：Vercel OIDC / AI Gateway / OPENAI_API_KEY 皆不可用');
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
    .replace(/^\`\`\`json\s*/i, '')
    .replace(/^\`\`\`/, '')
    .replace(/\`\`\`$/, '')
    .trim();
}
