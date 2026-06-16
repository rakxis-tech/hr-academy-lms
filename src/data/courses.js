// ═══════════════════════════════════════════
// OBRAK-ABRIK 2027 — COURSE DATA
// 6 Foundation + 6 Exclusive Courses
// ═══════════════════════════════════════════

export const TIERS = {
  1: { id: 1, name: 'Foundation', icon: '🔰', price: 299000, priceLabel: 'Rp 299k', color: 'orange', courses: [1,2,3,4] },
  2: { id: 2, name: 'Advanced', icon: '⭐', price: 599000, priceLabel: 'Rp 599k', color: 'teal', courses: [1,2,3,4,5,6,7,8] },
  3: { id: 3, name: 'Mastermind', icon: '👑', price: 1499000, priceLabel: 'Rp 1.499k', color: 'cream', courses: [1,2,3,4,5,6,7,8,9,10,11,12] },
};

let lessonId = 0;
const L = (title, dur) => ({ id: `les-${++lessonId}`, title, duration: dur, type: 'video', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', completed: false });

export const courses = [
  // ──── FOUNDATION COURSES (1–6) ────
  {
    id: 1, slug: 'rekrutmen-seleksi',
    title: 'Rekrutmen & Seleksi Karyawan',
    description: 'Pelajari seluruh siklus rekrutmen dari job analysis hingga offering letter. Termasuk teknik sourcing modern, BEI interview, dan assessment tools.',
    thumbnail: '/thumbnails/course-1.jpg',
    icon: '📌', level: 'Beginner-Intermediate', minTier: 1, category: 'foundation',
    instructor: 'Dandy', duration: '8-10 jam', rating: 4.8, enrolledCount: 234,
    tags: ['Rekrutmen', 'Interview', 'Seleksi'],
    modules: [
      { id: 'm1-1', title: 'Fundamentals of Recruitment', order: 1, isFreePreview: true, lessons: [
        L('Peran rekrutmen dalam organisasi', 12), L('Recruitment lifecycle overview', 15), L('Internal vs External recruitment', 10), L('Employer branding basics', 13),
      ]},
      { id: 'm1-2', title: 'Job Analysis & Job Description', order: 2, isFreePreview: false, lessons: [
        L('Teknik job analysis', 14), L('Menyusun job description efektif', 12), L('Job specification & kompetensi', 11), L('Template JD berbagai posisi', 10),
      ]},
      { id: 'm1-3', title: 'Sourcing & Talent Acquisition', order: 3, isFreePreview: false, lessons: [
        L('Channel sourcing: job portal, LinkedIn, referral', 15), L('Social media recruitment', 12), L('Campus hiring & job fair', 10), L('Headhunting & executive search', 13), L('Talent pipeline management', 11),
      ]},
      { id: 'm1-4', title: 'Screening & Shortlisting', order: 4, isFreePreview: false, lessons: [
        L('Resume screening techniques', 12), L('Phone screening best practices', 10), L('Assessment tools & psychotest', 14),
      ]},
      { id: 'm1-5', title: 'Interview Process', order: 5, isFreePreview: false, lessons: [
        L('Jenis-jenis interview (BEI, structured, panel)', 15), L('Menyusun pertanyaan interview', 12), L('BEI deep dive', 18), L('Scoring & evaluation matrix', 11), L('Interview do\'s and don\'ts', 10),
      ]},
      { id: 'm1-6', title: 'Selection & Offering', order: 6, isFreePreview: false, lessons: [
        L('Decision making framework', 12), L('Background & reference check', 10), L('Salary negotiation dari sisi HR', 14), L('Offering letter & onboarding prep', 11),
      ]},
    ],
  },
  {
    id: 2, slug: 'administrasi-hr',
    title: 'Administrasi HR & Personalia',
    description: 'Kuasai administrasi HR dari onboarding hingga offboarding. HRIS, kontrak kerja, cuti, absensi, dan HR reporting.',
    thumbnail: '/thumbnails/course-2.jpg',
    icon: '📌', level: 'Beginner', minTier: 1, category: 'foundation',
    instructor: 'Dandy', duration: '8-10 jam', rating: 4.7, enrolledCount: 189,
    tags: ['Admin HR', 'HRIS', 'Personalia'],
    modules: [
      { id: 'm2-1', title: 'Dasar-Dasar Administrasi HR', order: 1, isFreePreview: true, lessons: [
        L('Peran admin HR dalam organisasi', 12), L('HRIS overview', 15), L('Document management & filing', 10), L('Data privacy karyawan', 11),
      ]},
      { id: 'm2-2', title: 'Employee Lifecycle Management', order: 2, isFreePreview: false, lessons: [
        L('Onboarding administration', 14), L('Kontrak kerja: PKWT, PKWTT, outsourcing', 16), L('Mutasi, promosi, demosi', 12), L('Cuti & absensi management', 11), L('Offboarding & exit process', 13),
      ]},
      { id: 'm2-3', title: 'Payroll Administration Basics', order: 3, isFreePreview: false, lessons: [
        L('Komponen gaji & tunjangan', 14), L('Perhitungan PPh 21', 18), L('BPJS Kesehatan & Ketenagakerjaan', 15), L('Slip gaji & reporting', 10),
      ]},
      { id: 'm2-4', title: 'HR Reporting & Analytics Dasar', order: 4, isFreePreview: false, lessons: [
        L('HR metrics & KPI dasar', 12), L('HR dashboard sederhana', 14), L('Monthly & annual HR report', 11),
      ]},
    ],
  },
  {
    id: 3, slug: 'kompensasi-benefit-payroll',
    title: 'Kompensasi, Benefit & Payroll',
    description: 'Strategi kompensasi, job evaluation, salary survey, benefit program, dan payroll management sesuai regulasi Indonesia.',
    thumbnail: '/thumbnails/course-3.jpg',
    icon: '📌', level: 'Intermediate', minTier: 1, category: 'foundation',
    instructor: 'Dandy', duration: '8-10 jam', rating: 4.9, enrolledCount: 156,
    tags: ['Kompensasi', 'Payroll', 'Benefit'],
    modules: [
      { id: 'm3-1', title: 'Compensation Philosophy & Strategy', order: 1, isFreePreview: true, lessons: [
        L('Total rewards concept', 14), L('Compensation philosophy & policy', 12), L('Market positioning strategy', 11), L('Pay equity & fairness', 13),
      ]},
      { id: 'm3-2', title: 'Job Evaluation & Grading', order: 2, isFreePreview: false, lessons: [
        L('Metode job evaluation', 15), L('Job grading system', 12), L('Salary structure design', 14), L('Salary band & range', 10),
      ]},
      { id: 'm3-3', title: 'Salary Survey & Benchmarking', order: 3, isFreePreview: false, lessons: [
        L('Membaca salary survey', 13), L('Benchmarking compensation', 12), L('Compa-ratio analysis', 11),
      ]},
      { id: 'm3-4', title: 'Benefit Program Design', order: 4, isFreePreview: false, lessons: [
        L('Mandatory vs voluntary benefits', 12), L('Flexible benefit program', 14), L('Employee wellness program', 11), L('Benefit cost analysis', 13),
      ]},
      { id: 'm3-5', title: 'Payroll Management', order: 5, isFreePreview: false, lessons: [
        L('Payroll process & cycle', 14), L('Overtime (UU Cipta Kerja)', 16), L('THR & bonus calculation', 12), L('Payroll compliance & audit', 11), L('Payroll software overview', 10),
      ]},
    ],
  },
  {
    id: 4, slug: 'performance-management-kpi',
    title: 'Performance Management & KPI',
    description: 'Framework performance management, goal setting (SMART, OKR), KPI design, appraisal methods, dan performance improvement.',
    thumbnail: '/thumbnails/course-4.jpg',
    icon: '📌', level: 'Intermediate', minTier: 1, category: 'foundation',
    instructor: 'Dandy', duration: '8-10 jam', rating: 4.8, enrolledCount: 201,
    tags: ['Performance', 'KPI', 'OKR'],
    modules: [
      { id: 'm4-1', title: 'Performance Management Framework', order: 1, isFreePreview: true, lessons: [
        L('PM cycle overview', 13), L('Traditional vs modern PM', 12), L('Continuous feedback culture', 14), L('PM system design', 11),
      ]},
      { id: 'm4-2', title: 'Goal Setting & KPI Design', order: 2, isFreePreview: false, lessons: [
        L('SMART goals framework', 12), L('OKR deep dive', 15), L('KPI development methodology', 14), L('Balanced Scorecard basics', 13), L('Cascading goals', 11),
      ]},
      { id: 'm4-3', title: 'Performance Appraisal', order: 3, isFreePreview: false, lessons: [
        L('Appraisal methods (360, MBO)', 15), L('Calibration session', 12), L('Rating distribution', 10), L('Menghindari bias penilaian', 13),
      ]},
      { id: 'm4-4', title: 'Performance Improvement', order: 4, isFreePreview: false, lessons: [
        L('Performance Improvement Plan (PIP)', 14), L('Coaching for performance', 12), L('Dealing with underperformers', 11),
      ]},
      { id: 'm4-5', title: 'Reward & Recognition', order: 5, isFreePreview: false, lessons: [
        L('Linking performance to compensation', 12), L('Merit increase & bonus', 11), L('Non-monetary recognition', 10),
      ]},
    ],
  },
  {
    id: 5, slug: 'training-development',
    title: 'Training & Development Dasar',
    description: 'TNA, ADDIE model, instructional design, delivery, Kirkpatrick evaluation, career path, dan learning culture.',
    thumbnail: '/thumbnails/course-5.jpg',
    icon: '📌', level: 'Beginner-Intermediate', minTier: 2, category: 'foundation',
    instructor: 'Dandy', duration: '6-8 jam', rating: 4.6, enrolledCount: 145,
    tags: ['Training', 'L&D', 'TNA'],
    modules: [
      { id: 'm5-1', title: 'Training Needs Analysis (TNA)', order: 1, isFreePreview: true, lessons: [
        L('Organizational, task, & person analysis', 14), L('Competency gap analysis', 12), L('Training needs prioritization', 11), L('TNA tools & methods', 13),
      ]},
      { id: 'm5-2', title: 'Training Design & Development', order: 2, isFreePreview: false, lessons: [
        L('ADDIE model', 15), L('Learning objectives (Bloom\'s)', 12), L('Instructional design basics', 14), L('Training material development', 11),
      ]},
      { id: 'm5-3', title: 'Training Delivery', order: 3, isFreePreview: false, lessons: [
        L('Classroom vs online vs blended', 12), L('Facilitation skills', 14), L('Engaging adult learners', 11), L('Training logistics', 10),
      ]},
      { id: 'm5-4', title: 'Training Evaluation', order: 4, isFreePreview: false, lessons: [
        L('Kirkpatrick\'s 4 levels', 15), L('ROI of training', 12), L('Post-training follow-up', 10),
      ]},
      { id: 'm5-5', title: 'Employee Development', order: 5, isFreePreview: false, lessons: [
        L('Career path & succession planning', 14), L('Individual Development Plan', 12), L('Learning culture', 11),
      ]},
    ],
  },
  {
    id: 6, slug: 'industrial-relation',
    title: 'Industrial Relation & Regulasi Kerja',
    description: 'UU Ketenagakerjaan, UU Cipta Kerja, kontrak, PHK, pesangon, K3, dan penyelesaian perselisihan industrial.',
    thumbnail: '/thumbnails/course-6.jpg',
    icon: '📌', level: 'Intermediate', minTier: 2, category: 'foundation',
    instructor: 'Dandy', duration: '8-10 jam', rating: 4.7, enrolledCount: 167,
    tags: ['Hukum Kerja', 'PHK', 'K3'],
    modules: [
      { id: 'm6-1', title: 'Hukum Ketenagakerjaan Indonesia', order: 1, isFreePreview: true, lessons: [
        L('UU No. 13/2003 overview', 15), L('UU Cipta Kerja & PP turunan', 18), L('Peraturan Pemerintah terkait', 12), L('Permenaker wajib HR', 11), L('Update regulasi terbaru', 10),
      ]},
      { id: 'm6-2', title: 'Hubungan Kerja & Kontrak', order: 2, isFreePreview: false, lessons: [
        L('Jenis hubungan kerja', 12), L('PKWT vs PKWTT', 15), L('Outsourcing & alih daya', 13), L('Tenaga kerja asing', 11),
      ]},
      { id: 'm6-3', title: 'Peraturan Perusahaan & PKB', order: 3, isFreePreview: false, lessons: [
        L('Menyusun peraturan perusahaan', 14), L('Perjanjian Kerja Bersama', 12), L('Serikat pekerja & union', 11),
      ]},
      { id: 'm6-4', title: 'Pemutusan Hubungan Kerja (PHK)', order: 4, isFreePreview: false, lessons: [
        L('Prosedur PHK sesuai regulasi', 15), L('Perhitungan pesangon', 18), L('PHK efisiensi, merger, force majeure', 12), L('Penyelesaian perselisihan', 14),
      ]},
      { id: 'm6-5', title: 'K3 - Keselamatan & Kesehatan Kerja', order: 5, isFreePreview: false, lessons: [
        L('Regulasi K3 Indonesia', 13), L('Implementasi SMK3', 12), L('Pelaporan kecelakaan kerja', 10),
      ]},
      { id: 'm6-6', title: 'Penyelesaian Perselisihan', order: 6, isFreePreview: false, lessons: [
        L('Bipartit & mediasi', 12), L('Konsiliasi & arbitrase', 11), L('Pengadilan Hubungan Industrial', 13),
      ]},
    ],
  },

  // ──── EXCLUSIVE COURSES (7–12) — Differentiator ────
  {
    id: 7, slug: 'psikometri-asesmen',
    title: 'Psikometri & Asesmen Psikologi Kerja',
    description: 'Eksklusif dari Dandy — founder biro psikologi. Pelajari psikometri, alat asesmen, interpretasi hasil tes, dan aplikasi di HR.',
    thumbnail: '/thumbnails/course-7.jpg',
    icon: '🧪', level: 'Intermediate-Advanced', minTier: 2, category: 'exclusive',
    instructor: 'Dandy', duration: '6-8 jam', rating: 4.9, enrolledCount: 98,
    tags: ['Psikometri', 'Asesmen', 'Psikologi'],
    modules: [
      { id: 'm7-1', title: 'Dasar Psikometri untuk HR', order: 1, isFreePreview: true, lessons: [
        L('Apa itu psikometri?', 12), L('Reliabilitas & validitas alat ukur', 15), L('Jenis-jenis tes psikologi kerja', 14), L('Etika penggunaan tes psikologi', 10),
      ]},
      { id: 'm7-2', title: 'Alat Asesmen Populer', order: 2, isFreePreview: false, lessons: [
        L('DISC profiling', 15), L('MBTI dalam konteks kerja', 13), L('Big Five Personality', 14), L('Cognitive ability tests', 12), L('Tes situational judgment', 11),
      ]},
      { id: 'm7-3', title: 'Interpretasi & Reporting', order: 3, isFreePreview: false, lessons: [
        L('Membaca hasil tes psikologi', 16), L('Menyusun laporan asesmen', 14), L('Rekomendasi berdasarkan hasil', 12), L('Case study: asesmen rekrutmen', 15),
      ]},
    ],
  },
  {
    id: 8, slug: 'bei-profiling',
    title: 'Behavioral Event Interview & Profiling',
    description: 'Deep dive BEI dari praktisi aktif. Teknik interview berbasis kompetensi, profiling kandidat, dan scoring matrix.',
    thumbnail: '/thumbnails/course-8.jpg',
    icon: '🧠', level: 'Intermediate', minTier: 2, category: 'exclusive',
    instructor: 'Dandy', duration: '5-6 jam', rating: 4.8, enrolledCount: 112,
    tags: ['BEI', 'Interview', 'Profiling'],
    modules: [
      { id: 'm8-1', title: 'Fundamentals of BEI', order: 1, isFreePreview: true, lessons: [
        L('Mengapa BEI efektif?', 12), L('STAR method deep dive', 15), L('Kompetensi vs pengalaman', 11), L('Merancang competency framework', 14),
      ]},
      { id: 'm8-2', title: 'Teknik Interview BEI', order: 2, isFreePreview: false, lessons: [
        L('Probing questions technique', 15), L('Mendeteksi jawaban palsu', 13), L('Follow-up questioning', 12), L('Body language reading', 11),
      ]},
      { id: 'm8-3', title: 'Scoring & Profiling', order: 3, isFreePreview: false, lessons: [
        L('Scoring matrix BEI', 14), L('Candidate profiling template', 12), L('Comparative analysis antar kandidat', 13), L('Reporting ke hiring manager', 10),
      ]},
    ],
  },
  {
    id: 9, slug: 'people-analytics',
    title: 'People Analytics & HR Data-Driven',
    description: 'Ubah data HR jadi insight. Dashboard analytics, predictive HR, turnover analysis, dan data-driven decision making.',
    thumbnail: '/thumbnails/course-9.jpg',
    icon: '📊', level: 'Intermediate', minTier: 3, category: 'exclusive',
    instructor: 'Dandy & Raka', duration: '6-8 jam', rating: 4.7, enrolledCount: 76,
    tags: ['Analytics', 'Data HR', 'Dashboard'],
    modules: [
      { id: 'm9-1', title: 'Introduction to People Analytics', order: 1, isFreePreview: true, lessons: [
        L('Apa itu People Analytics?', 12), L('HR metrics yang penting', 14), L('Data collection & cleaning', 13), L('Tools untuk HR analytics', 11),
      ]},
      { id: 'm9-2', title: 'HR Dashboard & Visualization', order: 2, isFreePreview: false, lessons: [
        L('Membangun HR dashboard', 16), L('Key visualizations untuk HR', 13), L('Turnover analysis', 15), L('Headcount & productivity metrics', 12),
      ]},
      { id: 'm9-3', title: 'Data-Driven Decision Making', order: 3, isFreePreview: false, lessons: [
        L('Predictive analytics in HR', 14), L('Engagement survey analysis', 12), L('ROI calculation L&D', 13), L('Presenting data ke C-level', 11),
      ]},
    ],
  },
  {
    id: 10, slug: 'ai-rekrutmen',
    title: 'AI dalam Rekrutmen & Screening Modern',
    description: 'Zero kompetitor punya ini. Pelajari bagaimana AI mengubah rekrutmen — dari ATS, chatbot screening, hingga bias detection.',
    thumbnail: '/thumbnails/course-10.jpg',
    icon: '🤖', level: 'Intermediate', minTier: 3, category: 'exclusive',
    instructor: 'Raka & Dandy', duration: '5-6 jam', rating: 4.9, enrolledCount: 64,
    tags: ['AI', 'Rekrutmen', 'Automation'],
    modules: [
      { id: 'm10-1', title: 'AI Revolution in HR', order: 1, isFreePreview: true, lessons: [
        L('Landscape AI in HR 2027', 14), L('ATS & AI screening tools', 13), L('Chatbot rekrutmen', 12), L('Ethical AI in hiring', 11),
      ]},
      { id: 'm10-2', title: 'Implementasi AI Rekrutmen', order: 2, isFreePreview: false, lessons: [
        L('Setup AI screening workflow', 16), L('Resume parsing dengan AI', 14), L('Automated candidate scoring', 13), L('Bias detection & mitigation', 15),
      ]},
      { id: 'm10-3', title: 'Future of AI in HR', order: 3, isFreePreview: false, lessons: [
        L('Predictive hiring', 13), L('AI-powered onboarding', 12), L('Generative AI untuk HR', 14), L('Build vs buy AI tools', 11),
      ]},
    ],
  },
  {
    id: 11, slug: 'organizational-development',
    title: 'Organizational Development & Culture',
    description: 'Bangun organisasi yang sehat. OD frameworks, culture assessment, change management, dan employee engagement.',
    thumbnail: '/thumbnails/course-11.jpg',
    icon: '🏢', level: 'Advanced', minTier: 3, category: 'exclusive',
    instructor: 'Dandy', duration: '6-8 jam', rating: 4.8, enrolledCount: 58,
    tags: ['OD', 'Culture', 'Change Mgmt'],
    modules: [
      { id: 'm11-1', title: 'Foundations of OD', order: 1, isFreePreview: true, lessons: [
        L('Apa itu Organization Development?', 13), L('OD vs HR: perbedaan & sinergi', 12), L('Diagnostic models', 14), L('OD practitioner role', 11),
      ]},
      { id: 'm11-2', title: 'Culture Assessment & Design', order: 2, isFreePreview: false, lessons: [
        L('Culture assessment tools', 15), L('Competing Values Framework', 13), L('Designing target culture', 14), L('Culture change roadmap', 12),
      ]},
      { id: 'm11-3', title: 'Change Management', order: 3, isFreePreview: false, lessons: [
        L('Kotter\'s 8-step model', 14), L('ADKAR framework', 12), L('Resistance management', 13), L('Measuring change success', 11),
      ]},
    ],
  },
  {
    id: 12, slug: 'case-clinic',
    title: 'Case Clinic — Konsultasi Kasus HR Nyata',
    description: 'Bukan teori — ini kasus nyata. Setiap bulan Dandy membedah kasus HR real dari peserta dan memberikan solusi langsung.',
    thumbnail: '/thumbnails/course-12.jpg',
    icon: '💬', level: 'All Levels', minTier: 3, category: 'exclusive',
    instructor: 'Dandy', duration: 'Ongoing', rating: 5.0, enrolledCount: 45,
    tags: ['Case Study', 'Konsultasi', 'Live'],
    modules: [
      { id: 'm12-1', title: 'Case Clinic: Rekrutmen', order: 1, isFreePreview: true, lessons: [
        L('Kasus: Hire yang salah — root cause analysis', 18), L('Kasus: Mass hiring dengan budget terbatas', 15), L('Kasus: Ghosting kandidat — bagaimana respons?', 12),
      ]},
      { id: 'm12-2', title: 'Case Clinic: Industrial Relations', order: 2, isFreePreview: false, lessons: [
        L('Kasus: PHK massal & pesangon', 20), L('Kasus: Karyawan toxic — kapan harus cut?', 16), L('Kasus: Serikat pekerja menuntut', 15),
      ]},
      { id: 'm12-3', title: 'Case Clinic: Culture & Performance', order: 3, isFreePreview: false, lessons: [
        L('Kasus: Turnover tinggi di tim tertentu', 17), L('Kasus: KPI tidak realistis — push back ke management', 15), L('Kasus: Budaya kerja toxic — mulai dari mana?', 18),
      ]},
    ],
  },
];

// Helper: get total lessons and duration for a course
export function getCourseStats(course) {
  let totalLessons = 0;
  let totalDuration = 0;
  course.modules.forEach(m => {
    totalLessons += m.lessons.length;
    m.lessons.forEach(l => { totalDuration += l.duration; });
  });
  return { totalLessons, totalDuration, totalModules: course.modules.length };
}

// Helper: check if user can access a course
export function canAccessCourse(userTier, courseMinTier) {
  return userTier >= courseMinTier;
}

// Helper: check if user can access a module
export function canAccessModule(userTier, course, module) {
  if (module.isFreePreview) return true;
  return canAccessCourse(userTier, course.minTier);
}
