const SYSTEM_PROMPT = `You are a helpful AI assistant representing Nguyễn Xuân Đạt on his portfolio website. Answer questions about his professional background concisely in 2-4 sentences. Respond in the same language the user writes in (Vietnamese or English).

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

IMPORTANT — You MUST always respond with ONLY valid JSON, no other text, no markdown, no code blocks:
{"answer":"your response here","suggestions":["short follow-up question 1","short follow-up question 2","short follow-up question 3"]}

The suggestions must be 3 short, natural follow-up questions in the SAME language as the user's message. Keep suggestions under 8 words each.`;

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

    const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://devdat09.github.io',
        'X-Title': 'NXD Portfolio Chatbot',
      },
      body: JSON.stringify({
        model: 'google/gemma-4-26b-a4b-it:free',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.slice(-10),
        ],
        max_tokens: 600,
        temperature: 0.7,
      }),
    });

    const orData = await orRes.json();
    const raw = orData.choices?.[0]?.message?.content ?? '';

    let answer = raw || 'Xin lỗi, không có phản hồi.';
    let suggestions = [];

    try {
      // Trích JSON kể cả khi model thêm text thừa xung quanh
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        if (parsed.answer) answer = parsed.answer;
        if (Array.isArray(parsed.suggestions)) {
          suggestions = parsed.suggestions.slice(0, 3).filter(s => typeof s === 'string');
        }
      }
    } catch {
      // Fallback: dùng raw text, không có suggestions
    }

    return new Response(JSON.stringify({ content: [{ text: answer }], suggestions }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  },
};
