// ═══════════════════════════════════════════
// OBRAK-ABRIK 2027 — TESTIMONIALS & USER DATA
// ═══════════════════════════════════════════

export const testimonials = [
  { id: 1, name: 'Siti Nurhaliza', role: 'HR Staff — PT Maju Bersama', avatar: '👩‍💼', tier: 2, text: 'Materi psikometrinya beda banget dari kursus lain. Dandy bener-bener praktisi, bukan cuma teori. Langsung bisa saya apply di kantor.', rating: 5 },
  { id: 2, name: 'Budi Santoso', role: 'Fresh Graduate — UGJ Cirebon', avatar: '👨‍🎓', tier: 1, text: 'Dengan Rp 299k saya dapat akses 4 course lengkap. Di tempat lain harus bayar jutaan. Sekarang saya lebih PD interview kerja di posisi HR.', rating: 5 },
  { id: 3, name: 'Diana Putri', role: 'HR Manager — CV Cirebon Sejahtera', avatar: '👩‍💻', tier: 3, text: 'Konsultasi 1-on-1 sama Dandy worth every penny. Kasus PHK yang bikin pusing 3 bulan, solved dalam 1 sesi.', rating: 5 },
  { id: 4, name: 'Ahmad Fauzi', role: 'Career Switcher — Ex-Sales', avatar: '👨‍💼', tier: 2, text: 'Background saya sales, tapi setelah ikut Tier 2 sekarang sudah handle rekrutmen dan BEI di perusahaan baru. Kurikulumnya terstruktur banget.', rating: 5 },
  { id: 5, name: 'Rina Wati', role: 'HR Admin — PT Indocement', avatar: '👩‍🏫', tier: 1, text: 'Belajar payroll dan admin HR dari nol. Video-nya gampang dipahami dan bisa diulang kapan aja. Cocok buat yang baru mulai.', rating: 4 },
  { id: 6, name: 'Yoga Pratama', role: 'HRBP — Startup Bandung', avatar: '🧑‍💼', tier: 3, text: 'Course People Analytics dan AI Rekrutmen-nya game changer. Gak ada di tempat lain. Sekarang hiring process kami 40% lebih cepat.', rating: 5 },
];

export const instructors = [
  {
    id: 'dandy',
    name: 'Dandy',
    role: 'Psikolog Industri & HR Expert',
    title: 'Co-Founder · Speaker Utama',
    avatar: '🧪',
    bio: 'Founder excellent.id (biro psikologi). Handle psikotest PT & sekolah. Praktisi HR aktif di korporat. Kredensial akademik Psikologi Industri.',
    expertise: ['Psikometri', 'BEI', 'Organizational Development', 'Industrial Relations'],
  },
  {
    id: 'raka',
    name: 'Raka',
    role: 'AI Automation & Platform Builder',
    title: 'Co-Founder · Tech Lead',
    avatar: '⚙️',
    bio: 'AI automation & prompt engineering. n8n workflow & LMS builder. Medical researcher & digital product. Vibe coding & API integration.',
    expertise: ['AI in HR', 'People Analytics', 'Automation', 'LMS Development'],
  },
  {
    id: 'ardi',
    name: 'Ardi',
    role: 'Digital Marketing & Distribution',
    title: 'Co-Founder · Growth',
    avatar: '👨‍💼',
    bio: 'Agency label musik aktif. Manage multi-brand social media. Expertise paid & organic growth. Content pipeline & community.',
    expertise: ['Growth Hacking', 'Social Media', 'Content Strategy', 'Community Building'],
  },
];

// Mock user for demo
export const mockUser = {
  id: 'user-001',
  name: 'Demo User',
  email: 'demo@obrakabrik.id',
  avatar: '👤',
  tier: 1,
  enrolledCourses: [1, 2],
  progress: {
    1: { completed: ['les-1', 'les-2', 'les-3'], percent: 12 },
    2: { completed: ['les-26', 'les-27'], percent: 8 },
  },
  joinedAt: '2026-06-01',
};
