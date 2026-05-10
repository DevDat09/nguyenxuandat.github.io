const SYSTEM_PROMPT = `You are a helpful AI assistant representing Nguyễn Xuân Đạt on his portfolio website.

Profile:
- Name: Nguyễn Xuân Đạt
- Role: Network Engineer with 2+ years of experience
- Education: Bachelor of Science, University of Science — VNU Ho Chi Minh City (ĐHQG TP.HCM)
- Location: Hanoi, Vietnam
- Status: Open to new opportunities
- GitHub: github.com/DevDat09

Technical Skills:
- Routing & Switching: Cisco IOS, OSPF, BGP, EIGRP, STP, VLAN
- Network Security: Firewall, VPN IPSec, ACL, IDS/IPS, 802.1X
- Cloud & SD-WAN: Cisco SD-WAN, AWS VPC, Azure VNet, MPLS
- Monitoring & Tools: Wireshark, PRTG, Zabbix, Ansible, Python

Notable Projects:
1. Hosiden Enterprise Network Infrastructure (2024) — Deployed and configured network infrastructure for Hosiden manufacturing plant: VLAN segmentation by department, internal routing (OSPF, HSRP), and security systems ensuring continuous production operation.
2. Orion Factory Network Maintenance (2023) — Regular inspection, maintenance, and troubleshooting of the Orion confectionery factory network (Bắc Ninh), ensuring stable connectivity for production lines and monitoring systems.

Certifications: CCNP

Contact:
- Email: nguyen.xuan.dat9090@gmail.com
- Phone / Zalo: 0392 082 123

RULES:
1. Answer questions about Dat's professional background concisely in 2-4 sentences.
2. Respond in the SAME language the user writes in (Vietnamese or English).
3. You MUST output ONLY a valid JSON object — no markdown, no explanation, no code fences.
4. JSON format: {"answer":"your response here","suggestions":["question 1","question 2","question 3"]}
5. suggestions = 3 short follow-up questions in the same language as the user, max 8 words each.`;

const MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'google/gemma-4-31b-it:free',
  'meta-llama/llama-3.2-3b-instruct:free',
  'google/gemma-4-26b-a4b-it:free',
];

async function callOpenRouter(model, messages, apiKey) {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://devdat09.github.io',
      'X-Title': 'NXD Portfolio Chatbot',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 600,
      temperature: 0.7,
    }),
  });
  return res.json();
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    let messages;
    try {
      ({ messages } = await request.json());
      if (!Array.isArray(messages) || messages.length === 0) throw new Error();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const recentMessages = messages.slice(-10);
    let raw = '';
    let lastError = '';

    for (const model of MODELS) {
      try {
        const data = await callOpenRouter(model, recentMessages, env.OPENROUTER_API_KEY);

        if (data.error) {
          lastError = `[${model}] ${data.error.code}: ${data.error.message}`;
          const retryAfter = data.error?.metadata?.retry_after_seconds;
          if (data.error.code === 429 && retryAfter && retryAfter < 10) {
            await new Promise(r => setTimeout(r, Math.ceil(retryAfter) * 1000 + 500));
            const retry = await callOpenRouter(model, recentMessages, env.OPENROUTER_API_KEY);
            if (!retry.error) {
              raw = retry.choices?.[0]?.message?.content ?? '';
              if (raw) break;
            } else {
              lastError += ` | retry failed: ${retry.error.message}`;
            }
          }
          continue;
        }

        raw = data.choices?.[0]?.message?.content ?? '';
        if (raw) break;
      } catch (e) {
        lastError = String(e);
      }
    }

    let answer = raw || 'Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau.';
    let suggestions = [];

    try {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        if (parsed.answer) answer = parsed.answer;
        if (Array.isArray(parsed.suggestions)) {
          suggestions = parsed.suggestions.slice(0, 3).filter(s => typeof s === 'string');
        }
      }
    } catch {
      // fallback: use raw text as answer
    }

    return new Response(JSON.stringify({ content: [{ text: answer }], suggestions }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  },
};
