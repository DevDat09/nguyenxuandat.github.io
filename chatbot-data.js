/**
 * ============================================================
 *  CHATBOT Q&A — Nguyễn Xuân Đạt Portfolio
 * ============================================================
 *  Chỉnh sửa file này để thay đổi câu trả lời của chatbot.
 *  Không cần chạm vào index.html.
 *
 *  Mỗi mục trong "faqs" gồm:
 *    keywords       — từ/cụm từ kích hoạt (không phân biệt hoa/thường)
 *    answer_vi      — câu trả lời tiếng Việt
 *    answer_en      — câu trả lời tiếng Anh
 *    suggestions_vi — 3 gợi ý tiếng Việt hiện sau câu trả lời
 *    suggestions_en — 3 gợi ý tiếng Anh hiện sau câu trả lời
 *
 *  Thứ tự ưu tiên: mục nằm TRÊN sẽ được kiểm tra trước.
 *  "fallback" dùng khi không khớp từ khóa nào.
 * ============================================================
 */

const CHATBOT_DATA = {

  faqs: [

    // ── Chào hỏi ────────────────────────────────────────────
    {
      keywords: ['xin chào', 'chào', 'hello', 'hi', 'hey', 'alo', 'good morning', 'good afternoon', 'good evening'],
      answer_vi: 'Xin chào! Tôi là trợ lý của Nguyễn Xuân Đạt — Network Engineer với hơn 2 năm kinh nghiệm tại Hà Nội. Bạn muốn biết gì về Đạt?',
      answer_en: 'Hello! I\'m the AI assistant for Nguyễn Xuân Đạt — a Network Engineer with 2+ years of experience based in Hanoi. What would you like to know about Dat?',
      suggestions_vi: ['Kỹ năng của Đạt?', 'Đạt đã làm dự án gì?', 'Liên hệ Đạt thế nào?'],
      suggestions_en: ['What are his skills?', 'What projects has he done?', 'How to contact Dat?']
    },

    // ── Giới thiệu bản thân ─────────────────────────────────
    {
      keywords: ['giới thiệu', 'bạn là ai', 'đạt là ai', 'về đạt', 'about', 'who are you', 'who is dat', 'introduce'],
      answer_vi: 'Nguyễn Xuân Đạt là Network Engineer với hơn 2 năm kinh nghiệm, tốt nghiệp Cử nhân Khoa học tại ĐHQG TP.HCM. Anh ấy hiện đang sinh sống tại Hà Nội và mở cửa với các cơ hội việc làm mới.',
      answer_en: 'Nguyễn Xuân Đạt is a Network Engineer with 2+ years of experience, holding a Bachelor of Science from VNU Ho Chi Minh City. He is currently based in Hanoi and open to new opportunities.',
      suggestions_vi: ['Kỹ năng chuyên môn?', 'Chứng chỉ có gì?', 'Dự án đã làm?'],
      suggestions_en: ['What are his technical skills?', 'What certifications does he have?', 'What projects has he done?']
    },

    // ── Kỹ năng ─────────────────────────────────────────────
    {
      keywords: ['kỹ năng', 'skill', 'chuyên môn', 'công nghệ', 'technology', 'technical', 'biết gì', 'làm được gì', 'expertise'],
      answer_vi: 'Đạt có kinh nghiệm về:\n• Routing & Switching: OSPF, BGP, EIGRP, STP, VLAN (Cisco IOS)\n• Network Security: Firewall, VPN IPSec, ACL, IDS/IPS, 802.1X\n• Cloud & SD-WAN: Cisco SD-WAN, AWS VPC, Azure VNet, MPLS\n• Monitoring & Tools: Wireshark, PRTG, Zabbix, Ansible, Python',
      answer_en: 'Dat\'s technical skills include:\n• Routing & Switching: OSPF, BGP, EIGRP, STP, VLAN (Cisco IOS)\n• Network Security: Firewall, VPN IPSec, ACL, IDS/IPS, 802.1X\n• Cloud & SD-WAN: Cisco SD-WAN, AWS VPC, Azure VNet, MPLS\n• Monitoring & Tools: Wireshark, PRTG, Zabbix, Ansible, Python',
      suggestions_vi: ['Chứng chỉ của Đạt?', 'Dự án đã triển khai?', 'Kinh nghiệm bao nhiêu năm?'],
      suggestions_en: ['What certifications does he have?', 'What projects has he deployed?', 'How many years of experience?']
    },

    // ── Routing & Switching ─────────────────────────────────
    {
      keywords: ['routing', 'switching', 'ospf', 'bgp', 'eigrp', 'vlan', 'stp', 'cisco', 'layer 2', 'layer 3', 'hsrp'],
      answer_vi: 'Đạt thành thạo Routing & Switching trên nền Cisco IOS: thiết kế và triển khai OSPF, BGP, EIGRP, STP, phân vùng VLAN theo phòng ban, cấu hình HSRP để đảm bảo high availability.',
      answer_en: 'Dat is proficient in Routing & Switching on Cisco IOS: designing and deploying OSPF, BGP, EIGRP, STP, VLAN segmentation by department, and HSRP configuration for high availability.',
      suggestions_vi: ['Network Security?', 'Cloud & SD-WAN?', 'Dự án thực tế?'],
      suggestions_en: ['Network Security skills?', 'Cloud & SD-WAN experience?', 'Real-world projects?']
    },

    // ── Network Security ────────────────────────────────────
    {
      keywords: ['security', 'bảo mật', 'firewall', 'vpn', 'ipsec', 'acl', 'ids', 'ips', '802.1x', 'threat'],
      answer_vi: 'Về Network Security, Đạt có kinh nghiệm cấu hình Firewall, VPN IPSec site-to-site, ACL kiểm soát truy cập, triển khai IDS/IPS và xác thực 802.1X cho mạng doanh nghiệp.',
      answer_en: 'In Network Security, Dat has experience configuring Firewalls, site-to-site VPN IPSec, ACL access control, IDS/IPS deployment, and 802.1X authentication for enterprise networks.',
      suggestions_vi: ['SD-WAN là gì?', 'Dự án bảo mật?', 'Chứng chỉ bảo mật?'],
      suggestions_en: ['SD-WAN experience?', 'Security projects?', 'Security certifications?']
    },

    // ── Cloud & SD-WAN ──────────────────────────────────────
    {
      keywords: ['cloud', 'sd-wan', 'sdwan', 'aws', 'azure', 'mpls', 'vpc', 'vnet'],
      answer_vi: 'Đạt có kinh nghiệm với Cisco SD-WAN, thiết kế AWS VPC và Azure VNet cho môi trường hybrid cloud, cùng kiến thức MPLS cho kết nối WAN doanh nghiệp.',
      answer_en: 'Dat has experience with Cisco SD-WAN, designing AWS VPC and Azure VNet for hybrid cloud environments, along with MPLS knowledge for enterprise WAN connectivity.',
      suggestions_vi: ['Kỹ năng monitoring?', 'Dự án cloud?', 'Chứng chỉ?'],
      suggestions_en: ['Monitoring skills?', 'Cloud projects?', 'Certifications?']
    },

    // ── Monitoring & Tools ──────────────────────────────────
    {
      keywords: ['monitoring', 'giám sát', 'wireshark', 'prtg', 'zabbix', 'ansible', 'python', 'tool', 'công cụ', 'automation'],
      answer_vi: 'Đạt sử dụng thành thạo: Wireshark (phân tích packet), PRTG & Zabbix (giám sát hệ thống), Ansible (tự động hóa cấu hình), Python (scripting).',
      answer_en: 'Dat is proficient with: Wireshark (packet analysis), PRTG & Zabbix (system monitoring), Ansible (configuration automation), and Python (scripting).',
      suggestions_vi: ['Kỹ năng khác?', 'Dự án automation?', 'Liên hệ Đạt?'],
      suggestions_en: ['Other skills?', 'Automation projects?', 'How to contact Dat?']
    },

    // ── Dự án ───────────────────────────────────────────────
    {
      keywords: ['dự án', 'project', 'đã làm', 'kinh nghiệm', 'experience', 'hosiden', 'orion', 'nhà máy', 'factory', 'work history'],
      answer_vi: 'Đạt đã thực hiện 2 dự án nổi bật:\n\n1. Hosiden Enterprise Network (2024) — Triển khai hạ tầng mạng cho nhà máy Hosiden: phân vùng VLAN, routing nội bộ (OSPF, HSRP), hệ thống bảo mật đảm bảo vận hành liên tục.\n\n2. Orion Factory Network Maintenance (2023) — Bảo trì và khắc phục sự cố mạng nhà máy bánh kẹo Orion (Bắc Ninh), đảm bảo kết nối ổn định cho dây chuyền sản xuất.',
      answer_en: 'Dat has completed 2 notable projects:\n\n1. Hosiden Enterprise Network (2024) — Deployed network infrastructure for Hosiden factory: VLAN segmentation, internal routing (OSPF, HSRP), security systems ensuring continuous operation.\n\n2. Orion Factory Network Maintenance (2023) — Regular maintenance and troubleshooting of Orion confectionery factory network (Bắc Ninh), ensuring stable connectivity for production lines.',
      suggestions_vi: ['Chi tiết dự án Hosiden?', 'Chi tiết dự án Orion?', 'Kỹ năng sử dụng?'],
      suggestions_en: ['Hosiden project details?', 'Orion project details?', 'Skills used?']
    },

    // ── Dự án Hosiden ───────────────────────────────────────
    {
      keywords: ['hosiden', 'hosiden enterprise'],
      answer_vi: 'Dự án Hosiden Enterprise Network (2024): Đạt triển khai toàn bộ hạ tầng mạng cho nhà máy Hosiden tại Việt Nam, bao gồm phân vùng VLAN theo phòng ban, OSPF làm giao thức định tuyến nội bộ, HSRP đảm bảo redundancy, cùng hệ thống bảo mật giúp sản xuất không bị gián đoạn.',
      answer_en: 'Hosiden Enterprise Network project (2024): Dat deployed the complete network infrastructure for Hosiden\'s Vietnam factory, including department-based VLAN segmentation, OSPF for internal routing, HSRP for redundancy, and security systems ensuring uninterrupted production.',
      suggestions_vi: ['Dự án Orion?', 'Kỹ năng liên quan?', 'Liên hệ Đạt?'],
      suggestions_en: ['Orion project?', 'Skills used?', 'Contact Dat?']
    },

    // ── Dự án Orion ─────────────────────────────────────────
    {
      keywords: ['orion', 'bắc ninh', 'bánh kẹo', 'confectionery'],
      answer_vi: 'Dự án Orion Factory Network (2023): Đạt đảm nhận kiểm tra định kỳ, bảo trì và khắc phục sự cố hạ tầng mạng tại nhà máy bánh kẹo Orion (Bắc Ninh), đảm bảo kết nối ổn định cho dây chuyền sản xuất và các hệ thống giám sát.',
      answer_en: 'Orion Factory Network project (2023): Dat handled regular inspection, maintenance, and troubleshooting of the network infrastructure at Orion\'s confectionery factory in Bắc Ninh, ensuring stable connectivity for production lines and monitoring systems.',
      suggestions_vi: ['Dự án Hosiden?', 'Kỹ năng troubleshooting?', 'Liên hệ Đạt?'],
      suggestions_en: ['Hosiden project?', 'Troubleshooting skills?', 'Contact Dat?']
    },

    // ── Học vấn ─────────────────────────────────────────────
    {
      keywords: ['học vấn', 'education', 'trường', 'university', 'đại học', 'bằng cấp', 'degree', 'tốt nghiệp', 'graduate', 'đhqg', 'khoa học tự nhiên', 'vnu'],
      answer_vi: 'Nguyễn Xuân Đạt tốt nghiệp Cử nhân Khoa học tại Trường Đại học Khoa học Tự nhiên — ĐHQG TP.HCM.',
      answer_en: 'Nguyễn Xuân Đạt holds a Bachelor of Science from the University of Science — VNU Ho Chi Minh City (ĐHQG TP.HCM).',
      suggestions_vi: ['Chứng chỉ chuyên môn?', 'Kỹ năng?', 'Dự án đã làm?'],
      suggestions_en: ['Professional certifications?', 'Technical skills?', 'Projects completed?']
    },

    // ── Chứng chỉ ───────────────────────────────────────────
    {
      keywords: ['chứng chỉ', 'certification', 'certificate', 'ccnp', 'ccna', 'cert', 'qualified'],
      answer_vi: 'Đạt hiện có chứng chỉ CCNP (Cisco Certified Network Professional) — chứng chỉ chuyên gia mạng cấp cao của Cisco.',
      answer_en: 'Dat holds the CCNP (Cisco Certified Network Professional) certification — Cisco\'s advanced-level networking credential.',
      suggestions_vi: ['Kỹ năng Cisco?', 'Kinh nghiệm làm việc?', 'Liên hệ Đạt?'],
      suggestions_en: ['Cisco skills?', 'Work experience?', 'Contact Dat?']
    },

    // ── Kinh nghiệm / Số năm ────────────────────────────────
    {
      keywords: ['bao nhiêu năm', 'năm kinh nghiệm', 'how many years', 'years of experience', 'how long', 'senior', 'junior'],
      answer_vi: 'Đạt có hơn 2 năm kinh nghiệm làm Network Engineer, đã trực tiếp triển khai và vận hành hạ tầng mạng cho các nhà máy sản xuất quy mô lớn.',
      answer_en: 'Dat has 2+ years of experience as a Network Engineer, having directly deployed and operated network infrastructure for large-scale manufacturing facilities.',
      suggestions_vi: ['Dự án đã làm?', 'Kỹ năng chuyên môn?', 'Liên hệ Đạt?'],
      suggestions_en: ['Projects completed?', 'Technical expertise?', 'Contact Dat?']
    },

    // ── Tìm việc / Open to work ─────────────────────────────
    {
      keywords: ['tìm việc', 'open to work', 'tuyển dụng', 'hiring', 'available', 'cơ hội', 'opportunity', 'job', 'việc làm', 'recruit', 'position', 'vị trí'],
      answer_vi: 'Đạt hiện đang mở cửa với các cơ hội mới, đặc biệt quan tâm đến vị trí Network Engineer, Cloud/SD-WAN Engineer tại Hà Nội hoặc remote. Đừng ngần ngại liên hệ!',
      answer_en: 'Dat is currently open to new opportunities, particularly interested in Network Engineer or Cloud/SD-WAN Engineer roles in Hanoi or remote. Don\'t hesitate to reach out!',
      suggestions_vi: ['Liên hệ Đạt thế nào?', 'Kỹ năng của Đạt?', 'Dự án đã làm?'],
      suggestions_en: ['How to contact Dat?', 'What are his skills?', 'Projects he has done?']
    },

    // ── Liên hệ ─────────────────────────────────────────────
    {
      keywords: ['liên hệ', 'contact', 'email', 'phone', 'zalo', 'số điện thoại', 'reach', 'get in touch', 'github'],
      answer_vi: 'Bạn có thể liên hệ Đạt qua:\n• Email: nguyen.xuan.dat9090@gmail.com\n• Phone / Zalo: 0392 082 123\n• GitHub: github.com/DevDat09',
      answer_en: 'You can reach Dat via:\n• Email: nguyen.xuan.dat9090@gmail.com\n• Phone / Zalo: 0392 082 123\n• GitHub: github.com/DevDat09',
      suggestions_vi: ['Đạt đang tìm việc không?', 'Kỹ năng của Đạt?', 'Dự án đã làm?'],
      suggestions_en: ['Is Dat open to work?', 'What are his skills?', 'Projects he has done?']
    },

    // ── Vị trí / Location ────────────────────────────────────
    {
      keywords: ['ở đâu', 'location', 'địa điểm', 'hà nội', 'hanoi', 'thành phố', 'city', 'where', 'based'],
      answer_vi: 'Đạt hiện đang sinh sống và làm việc tại Hà Nội, Việt Nam.',
      answer_en: 'Dat is currently based in Hanoi, Vietnam.',
      suggestions_vi: ['Đạt có làm remote không?', 'Liên hệ Đạt?', 'Kỹ năng của Đạt?'],
      suggestions_en: ['Is Dat open to remote work?', 'How to contact Dat?', 'What are his skills?']
    },

  ],

  // ── Câu trả lời mặc định khi không khớp từ khóa nào ──────
  fallback: {
    answer_vi: 'Xin lỗi, tôi chưa có câu trả lời cho câu hỏi này. Bạn có thể liên hệ trực tiếp với Đạt qua email nguyen.xuan.dat9090@gmail.com hoặc Zalo 0392 082 123.',
    answer_en: 'Sorry, I don\'t have an answer for that question. You can contact Dat directly at nguyen.xuan.dat9090@gmail.com or Zalo 0392 082 123.',
    suggestions_vi: ['Kỹ năng của Đạt?', 'Dự án đã làm?', 'Liên hệ Đạt?'],
    suggestions_en: ['What are his skills?', 'Projects he has done?', 'Contact Dat?']
  }

};
