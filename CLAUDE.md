# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

Single-page portfolio website for a Senior Network Engineer. Pure static HTML/CSS/JS — no build tools, no framework, no package manager. The output is a single `index.html` file (with optional separate `style.css`/`script.js`) deployable directly to GitHub Pages at `devdat09.github.io`.

**Development:** Open `index.html` directly in a browser, or use VS Code Live Server. No build step required.

**Contact form:** Integrated via [Formspree](https://formspree.io) — form `action` attribute points to the Formspree endpoint; no backend needed.

**Photo:** `61851045_304725027098995_2421815196449243136_n.jpg` is the profile photo for the hero section canvas/`<img>`.

---

# Portfolio — Dark & Premium Design System
**Phong cách:** Senior Network Engineer Portfolio  
**Cảm giác:** Tactical, high-tech, cinematic dark UI  
**Đối tượng:** Nhà tuyển dụng cấp cao, khách hàng enterprise

---

## 1. Triết lý thiết kế

> "Giống màn hình terminal của một NOC room, nhưng đẹp như sản phẩm thương mại."

- **Dark-first** — mọi thứ xây trên nền tối, không có light mode
- **Cyan accent** — màu nhấn duy nhất `#00c8ff`, nhất quán từ đầu đến cuối
- **Monospace cho data, sans-serif cho nội dung** — phân tách rõ vai trò từng loại text
- **Motion có chủ đích** — chỉ animate khi phục vụ narrative, không decoration thuần túy
- **Tối giản nhưng không trống** — mỗi pixel phải có lý do tồn tại

---

## 2. Color System

```css
:root {
  /* Backgrounds — xếp tầng từ tối đến sáng nhẹ */
  --bg:      #080c10;   /* nền chính, section hero / footer */
  --bg2:     #0d1117;   /* nền xen kẽ, skills / contact */
  --bg3:     #111820;   /* nền card visual / project thumbnail */
  --surface: #141c26;   /* surface component: card, input, badge */

  /* Borders */
  --border:  rgba(0, 200, 255, 0.10);  /* border mặc định — rất subtle */
  --dim:     #2a3a4a;                  /* border visible hơn khi cần */

  /* Accent palette */
  --cyan:    #00c8ff;   /* primary accent — link, icon, highlight */
  --cyan2:   #0af0c0;   /* secondary accent — gradient pair với cyan */
  --amber:   #f0a500;   /* accent phụ — dùng cho separator, label đặc biệt */

  /* Text */
  --text:    #e2eaf2;   /* body text */
  --muted:   #5a7080;   /* placeholder, label, metadata */
}
```

**Quy tắc màu:**
- Chỉ dùng `--cyan` và `--cyan2` làm gradient pair: `linear-gradient(135deg, var(--cyan), var(--cyan2))`
- `--amber` chỉ xuất hiện 1–2 lần mỗi section để tạo điểm nhấn, không dùng đại trà
- Hover state luôn đẩy `border-color` từ `--border` → `rgba(0,200,255,0.25–0.35)`
- Glow effect: `box-shadow: 0 24px 60px rgba(0, 200, 255, 0.06)` — rất mờ, chỉ cảm nhận được

---

## 3. Typography

### Font Stack
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
```

| Font | Vai trò | Weights |
|------|---------|---------|
| **Space Grotesk** | Heading, tên, số lớn, CTA button | 600, 700 |
| **JetBrains Mono** | Label, badge, nav, metadata, code-like text | 300, 400, 500 |
| **Inter** | Body text, mô tả, form input | 300, 400, 500 |

### Scale & Style
```css
/* Hero name */
font-family: 'Space Grotesk'; font-size: clamp(48px, 6vw, 78px); font-weight: 700;
letter-spacing: -3px; line-height: 1.0;

/* Section title */
font-family: 'Space Grotesk'; font-size: clamp(32px, 4vw, 48px); font-weight: 700;
letter-spacing: -1.5px; line-height: 1.1;

/* Section label (trên title) */
font-family: 'JetBrains Mono'; font-size: 11px; letter-spacing: 3px;
text-transform: uppercase; color: var(--cyan);

/* Body */
font-family: 'Inter'; font-size: 15–16px; line-height: 1.7–1.8;
color: rgba(226, 234, 242, 0.6);

/* Mono metadata (year, index, badge) */
font-family: 'JetBrains Mono'; font-size: 10–12px; letter-spacing: 1–2.5px;
text-transform: uppercase; color: var(--muted);
```

### Gradient Text
```css
/* Dùng cho tên hoặc từ khoá quan trọng trong heading */
background: linear-gradient(135deg, var(--cyan) 0%, var(--cyan2) 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

---

## 4. Layout System

### Container
```css
max-width: 1200px;
margin: 0 auto;
padding: 0 60px;   /* desktop */
/* mobile: padding: 0 20px */
```

### Section Rhythm
```
Hero:    min-height: 100vh,  padding: 0 60px
Skills:  padding: 100px 0
Projects: padding: 100px 60px
Contact: padding: 100px 60px 120px
Footer:  padding: 30px 60px
```

### Grid Patterns
```css
/* Hero: text + photo card */
grid-template-columns: 1fr 400px;
gap: 80px;

/* Skills: 4 cards đều */
grid-template-columns: repeat(4, 1fr);
gap: 20px;

/* Projects: 2 cột, featured chiếm full */
grid-template-columns: 1fr 1fr;
gap: 24px;
/* Featured card: grid-column: 1 / -1; grid-template-columns: 1fr 1fr */

/* Contact: 2 cột info + form */
grid-template-columns: 1fr 1fr;
gap: 80px;
```

---

## 5. Components

### Nav
```
- Fixed top, z-index: 100
- Logo: JetBrains Mono, 13px, cyan, "// PREFIX.domain"
- Links: uppercase, 11px, letter-spacing 2.5px, hover → cyan + underline slide
- Scroll > 60px: background rgba(8,12,16,0.97) + blur(12px) + border-bottom
```

### Section Label Pattern
```html
<div class="section-label">Chuyên môn</div>
<h2 class="section-title">Kỹ năng & Công nghệ</h2>
```
```css
.section-label::before {
  /* đường kẻ 24px trước text */
  content: ''; width: 24px; height: 1px; background: var(--cyan);
}
```

### Skill Card
```
- bg: --surface, border: --border, border-radius: 12px
- Hover: translateY(-4px) + border-color sáng + top gradient bar scaleX(0→1)
- Top bar: linear-gradient(90deg, cyan, cyan2), height 2px
- Icon 24px, Name (Space Grotesk 700), Tags (JetBrains Mono 10px)
```

### Project Card
```
- Photo-first layout: visual area (220px height) + body (padding 28px)
- Featured card: grid-column span 2, visual bên trái, body bên phải
- Visual: bg --bg3, emoji lớn 64px + SVG topology overlay (opacity 0.3)
- Hover: translateY(-6px) + border cyan + box-shadow glow
- Meta: "// 01" cyan + year muted
- Stack badges: border 1px cyan-20%, bg cyan-4%, text cyan
```

### Contact Item
```
- Flex row: icon box (40x40, bg cyan-8%, border cyan-15%) + label/value
- Label: JetBrains Mono 10px uppercase muted
- Value: Inter 14px
- Hover: border-color → cyan-30%
```

### Buttons
```css
/* Primary */
background: var(--cyan); color: var(--bg);
font-family: 'Space Grotesk'; font-weight: 700; font-size: 13px;
padding: 14px 28px; border-radius: 4px;
/* Hover: slide-in --cyan2 overlay từ trái */

/* Secondary */
background: transparent; border: 1px solid var(--dim);
color: var(--text);
/* Hover: border → cyan, color → cyan */

/* Send (gradient) */
background: linear-gradient(135deg, var(--cyan), var(--cyan2));
color: var(--bg); font-family: 'Space Grotesk'; font-weight: 700;
/* Hover: opacity 0.9 + translateY(-2px) */
```

### Form Inputs
```css
background: var(--surface); border: 1px solid var(--border);
border-radius: 6px; padding: 12px 16px;
color: var(--text); font-family: 'Inter'; font-size: 14px;
/* Focus: border cyan-40% + box-shadow 0 0 0 3px cyan-6% */
/* Placeholder: --muted */
```

---

## 6. Visual FX & Decorations

### Hero Background Layers (thứ tự z-index thấp → cao)
1. **Grid pattern** — `background-image` hai linear-gradient vuông góc, 60px × 60px, cyan 3%, mask radial-gradient để fade ra viền
2. **Orb blur** — 2 div tuyệt đối, `border-radius: 50%`, `filter: blur(90px)`, animate floatOrb
3. **Topology SVG** — dashed circles + nodes + lines, opacity 0.25, bên phải màn hình
4. **Content** — z-index: 2

### Glow Orbs
```css
/* Orb 1 — góc trên phải */
width: 500px; height: 500px;
background: rgba(0, 200, 255, 0.07);
animation: floatOrb 8s ease-in-out infinite;

/* Orb 2 — dưới trái, ngược chiều */
width: 300px; height: 300px;
background: rgba(10, 240, 192, 0.05);
animation: floatOrb 10s ease-in-out infinite reverse;
```

### Network Canvas (Photo Placeholder)
```javascript
// 18 nodes di chuyển ngẫu nhiên
// Vẽ line khi distance < 120px, opacity = 0.5 * (1 - d/120)
// requestAnimationFrame loop
// Thay bằng <img> thật khi có ảnh
```

### Card Deco Corners
```css
/* 4 góc L-shape bằng border partial */
.tl { top: -8px; left: -8px; border-top: 2px; border-left: 2px; }
/* tương tự cho tr, bl, br */
color: var(--cyan); opacity: 0.6;
```

### SVG Topology trong Project Cards
- Dùng `<svg viewBox>` với `stroke="#00c8ff"` hoặc `stroke="#f0a500"`
- Opacity thấp (0.3–0.4), stroke-width 0.5–1
- Chủ đề phù hợp dự án: `rect` cho server/switch, `circle` cho node, `line` cho kết nối

---

## 7. Animation System

### Entrance Animations
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Dùng với delay stagger */
.hero-badge  { animation: fadeUp 0.7s 0.1s forwards; }
.hero-name   { animation: fadeUp 0.8s 0.2s forwards; }
.hero-title  { animation: fadeUp 0.8s 0.3s forwards; }
.hero-desc   { animation: fadeUp 0.8s 0.4s forwards; }
.hero-cta    { animation: fadeUp 0.8s 0.5s forwards; }
.hero-photo  { animation: fadeLeft 0.9s 0.4s forwards; }
```

### Scroll Reveal
```javascript
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
```
```css
.reveal { opacity: 0; transform: translateY(30px); transition: 0.7s ease; }
.reveal.visible { opacity: 1; transform: none; }

/* Stagger children với transition-delay 0s → 0.5s */
.reveal-stagger > *:nth-child(n) { transition-delay: (n-1) * 0.1s; }
```

### Micro-interactions
```css
/* Hover trên card */
transform: translateY(-4px);          /* skill cards */
transform: translateY(-6px);          /* project cards */

/* Arrow icon trong project link */
.project-card:hover .arrow { transform: translate(3px, -3px); }

/* Scroll indicator line */
@keyframes scrollLine { from { left: -100%; } to { left: 100%; } }

/* Pulsing dot trong badge */
@keyframes pulse { 50% { opacity: 0.4; transform: scale(0.7); } }
```

### Custom Cursor
```javascript
// Dot (10px) snap trực tiếp theo mouse
// Ring (36px) lag theo với lerp factor 0.12
// Hover trên interactive: dot 6px, ring 52px + đổi màu cyan2
```

---

## 8. Page Structure

```
nav (fixed)
│
├── #hero (section, min-height: 100vh)
│   ├── .hero-grid (bg pattern)
│   ├── .orb-1, .orb-2 (glow)
│   ├── .topo-lines > svg
│   └── .hero-content (grid 2 col)
│       ├── .hero-text (badge, h1, title, desc, cta)
│       └── .hero-photo-wrap (card + stats-strip)
│
├── #skills (div, bg: --bg2)
│   └── .skills-inner > .skills-grid (4 col)
│
├── #projects (section)
│   ├── .projects-header
│   └── .projects-grid
│       ├── .project-card.featured (span 2)
│       └── .project-card × N
│
├── #contact (div, bg: --bg2)
│   └── .contact-inner (grid 2 col)
│       ├── .contact-info (items)
│       └── .contact-form (inputs + btn-send)
│
└── footer
```

---

## 9. Naming Conventions

| Pattern | Ví dụ |
|---------|-------|
| Section wrapper | `#hero`, `#skills`, `#projects`, `#contact` |
| Inner container | `.skills-inner`, `.contact-inner` |
| Header block | `projects-header` |
| Label trên title | `.section-label` |
| Title | `.section-title` |
| Sub text | `.section-sub` |
| Card container | `.skill-card`, `.project-card`, `.contact-item` |
| Visual/thumbnail | `.project-visual`, `.project-visual-inner` |
| Body content | `.project-body`, `.project-meta` |
| Badge/tag | `.skill-tag`, `.stack-badge` |
| Stat block | `.stat`, `.stat-num`, `.stat-label` |
| Decorative | `.orb`, `.hero-grid`, `.topo-lines`, `.card-deco-corner` |
| State | `.reveal`, `.reveal-stagger`, `.visible` |

---

## 10. Quy tắc mở rộng

### Thêm section mới
1. Xen kẽ màu nền: `--bg` và `--bg2` giữa các section
2. Bắt đầu bằng `.section-label` + `.section-title` + class `.reveal`
3. Pad dọc: `100px–120px` top/bottom
4. Không bao giờ vượt `max-width: 1200px` cho content

### Thêm project card
- Luôn có: index `// 0N`, year, title (Space Grotesk 700), desc, stack badges, project-link
- Visual area bắt buộc có SVG topology hoặc illustration phù hợp chủ đề
- Featured = first card, span full width, layout 2 cột

### Thêm skill card
- Icon emoji 24px + tên category (Space Grotesk) + tags (JetBrains Mono)
- Không dùng progress bar — quá cliché, dùng tags thay thế

### Responsive breakpoints (khi cần)
```css
@media (max-width: 900px) {
  .hero-content      { grid-template-columns: 1fr; }
  .skills-grid       { grid-template-columns: repeat(2, 1fr); }
  .projects-grid     { grid-template-columns: 1fr; }
  .project-card.featured { grid-template-columns: 1fr; }
  .contact-inner     { grid-template-columns: 1fr; }
  nav                { padding: 18px 24px; }
  section            { padding: 80px 24px; }
}
@media (max-width: 600px) {
  .skills-grid { grid-template-columns: 1fr; }
  .hero-name   { font-size: 42px; }
}
```

---

## 11. Không làm (Anti-patterns)

- Không dùng `border-radius > 16px` — giữ cảm giác angular, kỹ thuật
- Không dùng shadow nặng như `box-shadow: 0 10px 30px rgba(0,0,0,0.5)` — tối trên tối vô nghĩa
- Không dùng màu background trắng hoặc xám nhạt bất kỳ đâu
- Không dùng font sans-serif thông thường cho label/badge — phải JetBrains Mono
- Không tạo thêm màu accent ngoài cyan/cyan2/amber
- Không animate liên tục những thứ người dùng không hover
- Không dùng icon library (FontAwesome, etc.) — dùng emoji hoặc SVG inline
- Không đặt text màu trắng thuần `#fff` — dùng `--text` (`#e2eaf2`) hoặc thấp hơn

---

## 12. Checklist trước khi ship

- [ ] Custom cursor hoạt động, không thấy default cursor
- [ ] Tất cả `.reveal` element đều được observe bởi IntersectionObserver
- [ ] Nav đổi background khi scroll > 60px
- [ ] Stats strip phía dưới hero photo card không bị overflow
- [ ] Form inputs có focus state rõ ràng
- [ ] Project cards có hover state cả visual lẫn title color
- [ ] Orb animations chạy vô hạn, không giật
- [ ] Canvas network animation resize đúng khi load
- [ ] Tất cả font đã load qua Google Fonts trước khi render
- [ ] Section alternating bg (`--bg` / `--bg2`) đúng thứ tự
