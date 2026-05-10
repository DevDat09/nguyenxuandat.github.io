/**
 * ============================================================
 *  CHATBOT Q&A — Nguyễn Xuân Đạt Portfolio
 * ============================================================
 *  Chỉnh sửa file này để thay đổi câu trả lời của chatbot.
 *  Không cần chạm vào index.html.
 *
 *  Mỗi mục trong "faqs" gồm:
 *    keywords    — danh sách từ/cụm từ kích hoạt (không phân biệt hoa/thường)
 *    answer      — câu trả lời hiển thị trong chat
 *    suggestions — 3 câu hỏi gợi ý hiện ra sau câu trả lời
 *
 *  Thứ tự ưu tiên: mục nào nằm TRÊN sẽ được kiểm tra trước.
 *  "fallback" là câu trả lời khi không khớp từ khóa nào.
 * ============================================================
 */

const CHATBOT_DATA = {

  faqs: [

    // ── Chào hỏi ────────────────────────────────────────────
    {
      keywords: ['xin chào', 'chào', 'hello', 'hi', 'hey', 'alo', 'good morning', 'good afternoon', 'good evening'],
      answer: 'Xin chào! Tôi là trợ lý của Nguyễn Xuân Đạt — Network Engineer với hơn 2 năm kinh nghiệm tại Hà Nội. Bạn muốn biết gì về Đạt?',
      suggestions: ['Kỹ năng của Đạt?', 'Đạt đã làm dự án gì?', 'Liên hệ Đạt thế nào?']
    },

    // ── Giới thiệu bản thân ─────────────────────────────────
    {
      keywords: ['giới thiệu', 'bạn là ai', 'đạt là ai', 'về đạt', 'about', 'who are you', 'introduce'],
      answer: 'Nguyễn Xuân Đạt là Network Engineer với hơn 2 năm kinh nghiệm, tốt nghiệp Cử nhân Khoa học tại ĐHQG TP.HCM. Anh ấy hiện đang sinh sống tại Hà Nội và mở cửa với các cơ hội việc làm mới.',
      suggestions: ['Kỹ năng chuyên môn?', 'Chứng chỉ có gì?', 'Dự án đã làm?']
    },

    // ── Kỹ năng ─────────────────────────────────────────────
    {
      keywords: ['kỹ năng', 'skill', 'chuyên môn', 'công nghệ', 'technology', 'technical', 'biết gì', 'làm được gì'],
      answer: 'Đạt có kinh nghiệm về:\n• Routing & Switching: OSPF, BGP, EIGRP, STP, VLAN (Cisco IOS)\n• Network Security: Firewall, VPN IPSec, ACL, IDS/IPS, 802.1X\n• Cloud & SD-WAN: Cisco SD-WAN, AWS VPC, Azure VNet, MPLS\n• Monitoring & Tools: Wireshark, PRTG, Zabbix, Ansible, Python',
      suggestions: ['Chứng chỉ của Đạt?', 'Dự án đã triển khai?', 'Kinh nghiệm bao nhiêu năm?']
    },

    // ── Routing & Switching ─────────────────────────────────
    {
      keywords: ['routing', 'switching', 'ospf', 'bgp', 'eigrp', 'vlan', 'stp', 'cisco', 'layer 2', 'layer 3'],
      answer: 'Đạt thành thạo Routing & Switching trên nền Cisco IOS: thiết kế và triển khai OSPF, BGP, EIGRP, STP, phân vùng VLAN theo phòng ban, cấu hình HSRP để đảm bảo high availability.',
      suggestions: ['Network Security?', 'Cloud & SD-WAN?', 'Dự án thực tế?']
    },

    // ── Network Security ────────────────────────────────────
    {
      keywords: ['security', 'bảo mật', 'firewall', 'vpn', 'ipsec', 'acl', 'ids', 'ips', '802.1x', 'threat'],
      answer: 'Về Network Security, Đạt có kinh nghiệm cấu hình Firewall, VPN IPSec site-to-site, ACL kiểm soát truy cập, triển khai IDS/IPS và xác thực 802.1X cho mạng doanh nghiệp.',
      suggestions: ['SD-WAN là gì?', 'Dự án bảo mật?', 'Chứng chỉ bảo mật?']
    },

    // ── Cloud & SD-WAN ──────────────────────────────────────
    {
      keywords: ['cloud', 'sd-wan', 'sdwan', 'aws', 'azure', 'mpls', 'vpc', 'vnet'],
      answer: 'Đạt có kinh nghiệm với Cisco SD-WAN, thiết kế AWS VPC và Azure VNet cho môi trường hybrid cloud, cùng kiến thức MPLS cho kết nối WAN doanh nghiệp.',
      suggestions: ['Kỹ năng monitoring?', 'Dự án cloud?', 'Chứng chỉ?']
    },

    // ── Monitoring & Tools ──────────────────────────────────
    {
      keywords: ['monitoring', 'giám sát', 'wireshark', 'prtg', 'zabbix', 'ansible', 'python', 'tool', 'công cụ'],
      answer: 'Đạt sử dụng thành thạo các công cụ: Wireshark (phân tích packet), PRTG & Zabbix (giám sát hệ thống), Ansible (tự động hóa cấu hình), Python (scripting).',
      suggestions: ['Kỹ năng khác?', 'Dự án automation?', 'Liên hệ Đạt?']
    },

    // ── Dự án ───────────────────────────────────────────────
    {
      keywords: ['dự án', 'project', 'đã làm', 'kinh nghiệm', 'experience', 'hosiden', 'orion', 'nhà máy', 'factory'],
      answer: 'Đạt đã thực hiện 2 dự án nổi bật:\n\n1. Hosiden Enterprise Network (2024) — Triển khai hạ tầng mạng cho nhà máy Hosiden: phân vùng VLAN theo phòng ban, routing nội bộ (OSPF, HSRP), hệ thống bảo mật đảm bảo vận hành liên tục.\n\n2. Orion Factory Network Maintenance (2023) — Bảo trì và khắc phục sự cố mạng nhà máy bánh kẹo Orion (Bắc Ninh), đảm bảo kết nối ổn định cho dây chuyền sản xuất.',
      suggestions: ['Chi tiết dự án Hosiden?', 'Chi tiết dự án Orion?', 'Kỹ năng sử dụng?']
    },

    // ── Dự án Hosiden ───────────────────────────────────────
    {
      keywords: ['hosiden', 'hosiden enterprise', '2024'],
      answer: 'Dự án Hosiden Enterprise Network (2024): Đạt triển khai toàn bộ hạ tầng mạng cho nhà máy Hosiden tại Việt Nam, bao gồm phân vùng VLAN theo từng phòng ban, cấu hình OSPF làm giao thức định tuyến nội bộ, HSRP đảm bảo redundancy, cùng hệ thống bảo mật đảm bảo sản xuất không bị gián đoạn.',
      suggestions: ['Dự án Orion?', 'Kỹ năng liên quan?', 'Liên hệ Đạt?']
    },

    // ── Dự án Orion ─────────────────────────────────────────
    {
      keywords: ['orion', 'bắc ninh', 'bánh kẹo', '2023'],
      answer: 'Dự án Orion Factory Network (2023): Đạt đảm nhận công việc kiểm tra định kỳ, bảo trì và khắc phục sự cố hạ tầng mạng tại nhà máy bánh kẹo Orion (Bắc Ninh), đảm bảo kết nối ổn định cho dây chuyền sản xuất và các hệ thống giám sát.',
      suggestions: ['Dự án Hosiden?', 'Kỹ năng troubleshooting?', 'Liên hệ Đạt?']
    },

    // ── Học vấn ─────────────────────────────────────────────
    {
      keywords: ['học vấn', 'education', 'trường', 'university', 'đại học', 'bằng cấp', 'degree', 'tốt nghiệp', 'graduate', 'đhqg', 'khoa học tự nhiên'],
      answer: 'Nguyễn Xuân Đạt tốt nghiệp Cử nhân Khoa học tại Trường Đại học Khoa học Tự nhiên — ĐHQG TP.HCM (University of Science, VNU Ho Chi Minh City).',
      suggestions: ['Chứng chỉ chuyên môn?', 'Kỹ năng?', 'Dự án đã làm?']
    },

    // ── Chứng chỉ ───────────────────────────────────────────
    {
      keywords: ['chứng chỉ', 'certification', 'certificate', 'ccnp', 'ccna', 'cert'],
      answer: 'Đạt hiện có chứng chỉ CCNP (Cisco Certified Network Professional) — chứng chỉ chuyên gia mạng cấp cao của Cisco.',
      suggestions: ['Kỹ năng Cisco?', 'Kinh nghiệm làm việc?', 'Liên hệ Đạt?']
    },

    // ── Kinh nghiệm / Số năm ────────────────────────────────
    {
      keywords: ['bao nhiêu năm', 'kinh nghiệm', 'năm kinh nghiệm', 'how many years', 'years of experience', 'how long'],
      answer: 'Đạt có hơn 2 năm kinh nghiệm làm Network Engineer, đã trực tiếp triển khai và vận hành hạ tầng mạng cho các nhà máy sản xuất quy mô lớn.',
      suggestions: ['Dự án đã làm?', 'Kỹ năng chuyên môn?', 'Liên hệ Đạt?']
    },

    // ── Tìm việc / Open to work ─────────────────────────────
    {
      keywords: ['tìm việc', 'open to work', 'tuyển dụng', 'hiring', 'available', 'cơ hội', 'opportunity', 'job', 'việc làm', 'recruit'],
      answer: 'Đạt hiện đang mở cửa với các cơ hội mới, đặc biệt quan tâm đến vị trí Network Engineer, Cloud/SD-WAN Engineer tại Hà Nội hoặc remote. Đừng ngần ngại liên hệ!',
      suggestions: ['Liên hệ Đạt thế nào?', 'Kỹ năng của Đạt?', 'Dự án đã làm?']
    },

    // ── Liên hệ ─────────────────────────────────────────────
    {
      keywords: ['liên hệ', 'contact', 'email', 'phone', 'zalo', 'số điện thoại', 'reach', 'get in touch', 'github'],
      answer: 'Bạn có thể liên hệ Đạt qua:\n• Email: nguyen.xuan.dat9090@gmail.com\n• Phone / Zalo: 0392 082 123\n• GitHub: github.com/DevDat09',
      suggestions: ['Đạt đang tìm việc không?', 'Kỹ năng của Đạt?', 'Dự án đã làm?']
    },

    // ── Vị trí / Location ────────────────────────────────────
    {
      keywords: ['ở đâu', 'location', 'địa điểm', 'hà nội', 'hanoi', 'thành phố', 'city', 'where'],
      answer: 'Đạt hiện đang sinh sống và làm việc tại Hà Nội, Việt Nam.',
      suggestions: ['Đạt có làm remote không?', 'Liên hệ Đạt?', 'Kỹ năng của Đạt?']
    },

  ],

  // ── Câu trả lời mặc định khi không khớp từ khóa nào ──────
  fallback: {
    answer: 'Xin lỗi, tôi chưa có câu trả lời cho câu hỏi này. Bạn có thể liên hệ trực tiếp với Đạt qua email nguyen.xuan.dat9090@gmail.com hoặc Zalo 0392 082 123.',
    suggestions: ['Kỹ năng của Đạt?', 'Dự án đã làm?', 'Liên hệ Đạt?']
  }

};
