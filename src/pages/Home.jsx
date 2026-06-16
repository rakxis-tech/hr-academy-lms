import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Play, Users, Star } from 'lucide-react';
import { courses, TIERS } from '../data/courses';
import { testimonials } from '../data/testimonials';

export default function Home() {
  const featuredCourses = courses.slice(0, 3);
  const exclusiveCourses = courses.filter(c => c.category === 'exclusive').slice(0, 3);

  return (
    <div className="home-page">
      {/* ─── HERO SECTION ─── */}
      <section className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div className="animate-float" style={{ fontSize: '74px', marginBottom: '1.5rem' }}>💥</div>
            <p className="label animate-slide-up" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              PROJECT 2027 · HR L&D PLATFORM
            </p>
            <h1 className="text-gradient animate-slide-up" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Obrak-Abrik 2027
            </h1>
            <p className="animate-slide-up" style={{ color: 'var(--text-2)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Platform Learning & Development HR yang menggabungkan psikologi industri praktis, kurikulum terstruktur, dan AI layer. Dari Cirebon untuk Jawa Barat.
            </p>
            
            <div className="flex gap-md justify-center flex-wrap animate-slide-up">
              <Link to="/courses" className="btn btn--primary btn--lg">
                Jelajahi Kurikulum <ArrowRight size={18} />
              </Link>
              <Link to="/pricing" className="btn btn--secondary btn--lg">
                Lihat Paket Belajar
              </Link>
            </div>

            <div className="flex gap-lg justify-center flex-wrap animate-slide-up" style={{ marginTop: '3rem' }}>
              <div className="flex items-center gap-xs text-muted" style={{ fontSize: '0.9rem' }}>
                <CheckCircle2 size={16} className="text-orange" /> 12 Course Eksklusif
              </div>
              <div className="flex items-center gap-xs text-muted" style={{ fontSize: '0.9rem' }}>
                <CheckCircle2 size={16} className="text-teal" /> AI Chatbot Assistant
              </div>
              <div className="flex items-center gap-xs text-muted" style={{ fontSize: '0.9rem' }}>
                <CheckCircle2 size={16} className="text-cream" /> 1-on-1 Mentorship
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEM / WHY US ─── */}
      <section className="section" style={{ background: 'var(--bg-deep)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <p className="label text-orange" style={{ marginBottom: '0.5rem' }}>THE PROBLEM</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>HR di Indonesia <span className="text-orange">Kekurangan Akses</span></h2>
          </div>

          <div className="grid grid-3 gap-lg">
            <div className="card card--orange">
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>😤</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--orange)' }}>Mahal & Tidak Terjangkau</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Kursus HR sertifikasi rata-rata Rp 3–7.5 juta. Zero opsi lokal berkualitas di tier-2.</p>
            </div>
            <div className="card card--teal">
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📚</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--teal)' }}>Kurikulum Usang</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Mayoritas masih modul lama. Belum menyentuh AI rekrutmen atau people analytics.</p>
            </div>
            <div className="card card--cream">
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🤝</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--cream)' }}>Zero Mentorship</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Tidak ada platform dengan konsultasi 1-on-1 riil dari praktisi HR aktif.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HIGHLIGHT COURSES ─── */}
      <section className="section">
        <div className="container">
          <div className="flex justify-between items-end flex-wrap gap-md" style={{ marginBottom: '3rem' }}>
            <div>
              <p className="label text-teal" style={{ marginBottom: '0.5rem' }}>KURIKULUM</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>Materi <span className="text-teal">Foundation</span></h2>
              <p className="text-muted" style={{ marginTop: '0.5rem' }}>Wajib dikuasai oleh setiap praktisi HR.</p>
            </div>
            <Link to="/courses" className="btn btn--ghost">Lihat Semua Course <ArrowRight size={16} /></Link>
          </div>

          <div className="grid grid-3 gap-lg">
            {featuredCourses.map(course => (
              <div key={course.id} className="card flex flex-col">
                <div className="flex justify-between items-start" style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '2.5rem' }}>{course.icon}</div>
                  <span className={`badge badge--tier-${course.minTier}`}>{TIERS[course.minTier].name}</span>
                </div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{course.title}</h4>
                <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '1.5rem', flex: 1 }}>{course.description}</p>
                <div className="flex justify-between items-center" style={{ paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-xs text-muted" style={{ fontSize: '0.8rem' }}>
                    <Play size={14} /> {course.modules.length} Module
                  </div>
                  <Link to={`/courses/${course.slug}`} className="text-teal" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Detail</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Exclusive Section */}
          <div style={{ marginTop: '5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '2rem' }}>Topik <span className="text-orange">Eksklusif</span></h2>
            <div className="grid grid-3 gap-lg">
              {exclusiveCourses.map(course => (
                <div key={course.id} className="card card--orange flex flex-col">
                  <div className="flex justify-between items-start" style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '2.5rem' }}>{course.icon}</div>
                    <span className="badge badge--tier-3">Mastermind</span>
                  </div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{course.title}</h4>
                  <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '1.5rem', flex: 1 }}>{course.description}</p>
                  <div className="flex justify-between items-center" style={{ paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-xs text-muted" style={{ fontSize: '0.8rem' }}>
                      <Play size={14} /> {course.modules.length} Module
                    </div>
                    <Link to={`/courses/${course.slug}`} className="text-orange" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Detail</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING PREVIEW ─── */}
      <section className="section" style={{ background: 'var(--bg-deep)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <p className="label text-cream" style={{ marginBottom: '0.5rem' }}>INVESTASI</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>Pilih Paket <span className="text-cream">Belajarmu</span></h2>
          </div>

          <div className="grid grid-3 gap-lg">
            {Object.values(TIERS).map(tier => (
              <div key={tier.id} className={`card card--tier-${tier.id}`} style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="text-center" style={{ marginBottom: '2rem' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{tier.icon}</div>
                  <h4 className="font-display" style={{ color: `var(--${tier.color})`, fontSize: '1.2rem', marginBottom: '0.5rem' }}>{tier.name}</h4>
                  <div className="font-display" style={{ fontSize: '2rem', color: 'var(--text)' }}>{tier.priceLabel}</div>
                </div>
                
                <ul className="flex flex-col gap-sm" style={{ flex: 1, marginBottom: '2rem' }}>
                  <li className="flex items-start gap-sm text-muted" style={{ fontSize: '0.9rem' }}>
                    <CheckCircle2 size={18} className={`text-${tier.color}`} style={{ flexShrink: 0 }} /> 
                    {tier.courses.length} Courses akses penuh
                  </li>
                  <li className="flex items-start gap-sm text-muted" style={{ fontSize: '0.9rem' }}>
                    <CheckCircle2 size={18} className={`text-${tier.color}`} style={{ flexShrink: 0 }} /> 
                    Video on-demand
                  </li>
                  {tier.id >= 2 && (
                    <li className="flex items-start gap-sm text-muted" style={{ fontSize: '0.9rem' }}>
                      <CheckCircle2 size={18} className={`text-${tier.color}`} style={{ flexShrink: 0 }} /> 
                      Live Zoom Class ({tier.id === 2 ? '2x' : '4x'}/bln)
                    </li>
                  )}
                  {tier.id >= 3 && (
                    <li className="flex items-start gap-sm text-muted" style={{ fontSize: '0.9rem' }}>
                      <CheckCircle2 size={18} className={`text-${tier.color}`} style={{ flexShrink: 0 }} /> 
                      Konsultasi 1-on-1 (60 menit)
                    </li>
                  )}
                  <li className="flex items-start gap-sm text-muted" style={{ fontSize: '0.9rem' }}>
                    <CheckCircle2 size={18} className={`text-${tier.color}`} style={{ flexShrink: 0 }} /> 
                    AI Chatbot Assistant {tier.id >= 2 ? 'Full' : 'Basic'}
                  </li>
                </ul>
                
                <Link to="/auth?mode=register" className={`btn btn--full ${tier.id === 2 ? 'btn--teal' : tier.id === 3 ? 'btn--primary' : 'btn--secondary'}`}>
                  Pilih {tier.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <p className="label text-teal" style={{ marginBottom: '0.5rem' }}>TESTIMONIALS</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>Apa Kata <span className="text-teal">Mereka?</span></h2>
          </div>

          <div className="grid grid-3 gap-md">
            {testimonials.slice(0, 3).map(testi => (
              <div key={testi.id} className="card">
                <div className="flex gap-xs" style={{ marginBottom: '1rem' }}>
                  {[...Array(testi.rating)].map((_, i) => <Star key={i} size={16} fill="var(--orange)" color="var(--orange)" />)}
                </div>
                <p className="text-muted" style={{ fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>"{testi.text}"</p>
                <div className="flex items-center gap-sm">
                  <div className="avatar avatar--md flex items-center justify-center" style={{ background: 'var(--surface-hover)', fontSize: '1.2rem' }}>
                    {testi.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{testi.name}</div>
                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>{testi.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section" style={{ textAlign: 'center', background: 'var(--bg-deep)' }}>
        <div className="container">
          <div className="card card--orange" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', background: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(20,184,166,0.05))' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>Siap Ngobrak-Abrik Karir HR-mu?</h2>
            <p className="text-muted" style={{ marginBottom: '2.5rem', fontSize: '1.1rem' }}>Bergabung dengan ratusan profesional HR lainnya sekarang.</p>
            <Link to="/auth?mode=register" className="btn btn--primary btn--lg">
              Daftar Sekarang <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
