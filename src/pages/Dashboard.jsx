import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Clock, Award, MessageCircle, Calendar, ArrowUpRight, CheckCircle2, Lock } from 'lucide-react';
import { courses, TIERS } from '../data/courses';
import { mockUser } from '../data/testimonials';

export default function Dashboard() {
  // Allow toggling tier for demo purposes
  const [currentTier, setCurrentTier] = useState(mockUser.tier);
  const tierInfo = TIERS[currentTier];

  const inProgressCourses = [
    { ...courses[0], progress: 65, lastLesson: 'M2: Menyusun job description efektif' },
    { ...courses[2], progress: 20, lastLesson: 'M1: Total rewards concept' }
  ];

  return (
    <div className="dashboard-page">
      {/* ─── DASHBOARD HEADER ─── */}
      <section className="section" style={{ background: 'var(--surface)', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="flex flex-wrap gap-lg justify-between items-end">
            <div className="flex items-center gap-md">
              <div className="avatar avatar--xl flex items-center justify-center" style={{ background: 'var(--orange-subtle)', color: 'var(--orange)', fontSize: '2.5rem' }}>
                {mockUser.avatar}
              </div>
              <div>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>Halo, {mockUser.name}! 👋</h1>
                <p className="text-muted" style={{ fontSize: '1rem' }}>Selamat datang kembali di ruang belajar Anda.</p>
              </div>
            </div>

            {/* Current Tier Card */}
            <div className="card" style={{ padding: '1rem 1.5rem', background: 'var(--bg-deep)', minWidth: '280px' }}>
              <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>PAKET SAAT INI</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <span style={{ fontSize: '1.5rem' }}>{tierInfo.icon}</span>
                  <strong style={{ fontSize: '1.2rem', color: `var(--${tierInfo.color})` }}>{tierInfo.name}</strong>
                </div>
                {currentTier < 3 && (
                  <Link to="/pricing" className="btn btn--sm btn--orange">Upgrade</Link>
                )}
              </div>
            </div>
          </div>

          {/* DEMO TOOL: Tier Switcher */}
          <div style={{ marginTop: '1.5rem', padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
            <span className="text-muted" style={{ fontSize: '0.8rem', marginRight: '0.5rem' }}>Demo Tier Switcher:</span>
            {[1, 2, 3].map(t => (
              <button 
                key={t}
                onClick={() => setCurrentTier(t)}
                className={`btn btn--sm ${currentTier === t ? 'btn--primary' : 'btn--ghost'}`}
                style={{ padding: '0.2rem 0.8rem', fontSize: '0.8rem' }}
              >
                Tier {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="section">
        <div className="container grid gap-xl" style={{ gridTemplateColumns: '2fr 1fr' }}>
          
          {/* Left Column: Learning Progress */}
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem' }}>Lanjutkan Belajar</h2>
              <Link to="/courses" className="text-orange flex items-center gap-xs" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                Eksplor Materi <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="flex flex-col gap-md">
              {inProgressCourses.map(course => (
                <div key={course.id} className="card flex gap-md" style={{ padding: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '120px', height: '80px', background: 'var(--surface-hover)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                    {course.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{course.title}</h3>
                    <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.8rem' }}>Selanjutnya: {course.lastLesson}</p>
                    
                    {/* Progress Bar */}
                    <div className="flex items-center gap-sm">
                      <div style={{ flex: 1, height: '6px', background: 'var(--surface-hover)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${course.progress}%`, background: 'var(--orange)', borderRadius: '3px' }}></div>
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{course.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <Link to={`/learn/${course.slug}/${course.modules[0].id}/${course.modules[0].lessons[0].id}`} className="btn btn--primary" style={{ padding: '0.75rem' }}>
                      <PlayCircle size={20} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: '1.5rem', marginTop: '3rem', marginBottom: '1.5rem' }}>Sertifikat Saya</h2>
            <div className="card text-center text-muted" style={{ padding: '3rem 1rem' }}>
              <Award size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
              <p>Anda belum menyelesaikan course apapun. Selesaikan 100% course untuk mendapatkan sertifikat kelulusan.</p>
            </div>
          </div>

          {/* Right Column: Exclusive Features / Sidebar */}
          <div className="flex flex-col gap-md">
            
            {/* Live Zoom / Consultation (Tier 2 & 3) */}
            {currentTier >= 2 ? (
              <div className="card card--teal">
                <h3 className="flex items-center gap-sm" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                  <Calendar size={18} /> Jadwal Mentorship
                </h3>
                
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                  <div className="label text-teal" style={{ marginBottom: '0.2rem' }}>LIVE ZOOM CLASS</div>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.2rem' }}>Bedah Kasus: Rekrutmen Massal</h4>
                  <p className="text-muted flex items-center gap-xs" style={{ fontSize: '0.85rem' }}>
                    <Clock size={14} /> Sabtu, 28 Okt 2027 • 10:00 WIB
                  </p>
                  <button className="btn btn--sm btn--teal btn--full" style={{ marginTop: '0.8rem' }}>Daftar Sesi</button>
                </div>

                {currentTier >= 3 && (
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    <div className="label text-orange" style={{ marginBottom: '0.2rem' }}>1-ON-1 KONSULTASI</div>
                    <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.8rem' }}>
                      Anda memiliki 1 kuota konsultasi privat 60 menit bersama Dandy.
                    </p>
                    <button className="btn btn--sm btn--primary btn--full">Booking Jadwal</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="card text-center" style={{ border: '1px dashed var(--border)' }}>
                <Lock size={32} className="text-muted" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Mentorship Eksklusif</h3>
                <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
                  Upgrade ke tier Advanced/Mastermind untuk akses Live Zoom Class dan Konsultasi 1-on-1.
                </p>
                <Link to="/pricing" className="btn btn--sm btn--secondary btn--full">Lihat Paket</Link>
              </div>
            )}

            {/* Community Access */}
            <div className="card">
              <h3 className="flex items-center gap-sm" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                <MessageCircle size={18} /> Komunitas HR
              </h3>
              <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
                Bergabung dengan grup Telegram eksklusif untuk berjejaring dan tanya jawab.
              </p>
              
              <ul className="flex flex-col gap-xs" style={{ marginBottom: '1.5rem' }}>
                <li className={`flex items-center gap-sm ${currentTier >= 1 ? 'text-text' : 'text-muted'}`}>
                  <CheckCircle2 size={16} className={currentTier >= 1 ? 'text-success' : 'text-muted'} /> Basic Channel (Info/Update)
                </li>
                <li className={`flex items-center gap-sm ${currentTier >= 2 ? 'text-text' : 'text-muted'}`}>
                  <CheckCircle2 size={16} className={currentTier >= 2 ? 'text-teal' : 'text-muted'} /> Advanced Discussion Group
                </li>
                <li className={`flex items-center gap-sm ${currentTier >= 3 ? 'text-text' : 'text-muted'}`}>
                  <CheckCircle2 size={16} className={currentTier >= 3 ? 'text-orange' : 'text-muted'} /> Mastermind Priority Network
                </li>
              </ul>

              <button className="btn btn--secondary btn--full">Join Telegram</button>
            </div>

            {/* AI Assistant */}
            <div className="card flex items-start gap-md" style={{ background: 'var(--surface-hover)' }}>
              <div style={{ fontSize: '2rem' }}>🤖</div>
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>AI HR Assistant</h4>
                <p className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '0.8rem' }}>
                  {currentTier >= 2 ? 'Tanya seputar template kebijakan, draft email HR, atau summary regulasi.' : 'Akses basic Q&A seputar HR.'}
                </p>
                <button className="btn btn--sm btn--ghost" style={{ padding: 0, color: 'var(--teal)' }}>Mulai Chat</button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
