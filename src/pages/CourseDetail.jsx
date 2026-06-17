import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Play, Clock, Star, CheckCircle2, Lock, Unlock, ArrowRight } from 'lucide-react';
import { TIERS, getCourseStats } from '../data/courses';
import { instructors } from '../data/testimonials';
import { supabase } from '../lib/supabase';

export default function CourseDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          modules (
            *,
            lessons (*)
          )
        `)
        .eq('slug', slug)
        .single();
        
      if (!error && data) {
        // Sort modules and lessons by order
        data.modules.sort((a, b) => a.order - b.order);
        data.modules.forEach(m => {
          if(m.lessons) m.lessons.sort((a, b) => a.order - b.order);
        });
        setCourse(data);
      }
      setLoading(false);
    }
    fetchCourse();
  }, [slug]);
  
  if (loading) {
    return <div className="section container text-center" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  if (!course) {
    return (
      <div className="section container text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>😢</h1>
        <h2>Course Tidak Ditemukan</h2>
        <p className="text-muted" style={{ marginBottom: '2rem' }}>Materi yang Anda cari mungkin telah dipindahkan atau dihapus.</p>
        <Link to="/courses" className="btn btn--secondary">Kembali ke Kurikulum</Link>
      </div>
    );
  }

  const stats = getCourseStats(course);
  const tierInfo = TIERS[course.min_tier];
  const instructor = instructors.find(i => i.name === course.instructor) || instructors[0];

  return (
    <div className="course-detail-page">
      {/* ─── HERO HEADER ─── */}
      <section className="section" style={{ background: 'var(--bg-deep)', borderBottom: '1px solid var(--border)', paddingBottom: '4rem' }}>
        <div className="container grid gap-xl" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
          
          {/* Main Info */}
          <div>
            <div className="flex gap-sm items-center" style={{ marginBottom: '1.5rem' }}>
              <span className={`badge badge--tier-${course.min_tier}`}>{tierInfo.name}</span>
              <span className="text-muted" style={{ fontSize: '0.9rem' }}>•</span>
              <span className="text-muted" style={{ fontSize: '0.9rem' }}>{course.level}</span>
            </div>
            
            <h1 className="text-gradient animate-slide-up" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1rem', lineHeight: 1.2 }}>
              {course.title}
            </h1>
            
            <p className="text-muted animate-slide-up" style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6, animationDelay: '0.1s' }}>
              {course.description}
            </p>
            
            <div className="flex gap-lg flex-wrap text-muted animate-slide-up" style={{ fontSize: '0.9rem', marginBottom: '2rem', animationDelay: '0.2s' }}>
              <div className="flex items-center gap-xs"><Clock size={16} /> {course.duration}</div>
              <div className="flex items-center gap-xs"><Play size={16} /> {stats.totalLessons} Video Lesson</div>
              <div className="flex items-center gap-xs text-orange"><Star size={16} fill="var(--orange)" /> {course.rating} ({course.enrolledCount} murid)</div>
            </div>

            <div className="flex gap-md items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link to={`/learn/${course.slug}/${course.modules[0].id}/${course.modules[0].lessons[0].id}`} className="btn btn--primary btn--lg">
                Mulai Belajar Sekarang <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Sidebar / Instructor & Pricing Preview */}
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className={`card card--tier-${course.min_tier}`} style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <p className="label" style={{ marginBottom: '0.5rem', color: `var(--${tierInfo.color})` }}>TERMASUK DALAM PAKET</p>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{tierInfo.name}</h3>
              <div className="font-display" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{tierInfo.priceLabel}</div>
              <ul className="flex flex-col gap-sm" style={{ marginBottom: '2rem' }}>
                <li className="flex items-start gap-sm text-muted" style={{ fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} className={`text-${tierInfo.color}`} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Akses seumur hidup (per batch)</span>
                </li>
                <li className="flex items-start gap-sm text-muted" style={{ fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} className={`text-${tierInfo.color}`} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Sertifikat kelulusan digital</span>
                </li>
                <li className="flex items-start gap-sm text-muted" style={{ fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} className={`text-${tierInfo.color}`} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>AI Chatbot Assistant</span>
                </li>
              </ul>
              <Link to="/pricing" className={`btn btn--full ${course.min_tier === 1 ? 'btn--secondary' : course.min_tier === 2 ? 'btn--teal' : 'btn--primary'}`}>
                Lihat Semua Paket
              </Link>
            </div>

            <div className="card">
              <p className="label text-muted" style={{ marginBottom: '1rem' }}>INSTRUKTUR</p>
              <div className="flex items-start gap-md">
                <div className="avatar avatar--lg flex items-center justify-center" style={{ background: 'var(--surface-hover)', fontSize: '1.8rem', flexShrink: 0 }}>
                  {instructor.avatar}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{instructor.name}</h4>
                  <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>{instructor.role}</p>
                  <p style={{ fontSize: '0.8rem', lineHeight: 1.5, color: 'var(--text-2)' }}>{instructor.bio}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── CURRICULUM ─── */}
      <section className="section">
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '0.5rem' }}>Kurikulum <span className="text-orange">Materi</span></h2>
            <p className="text-muted">{stats.totalModules} Modul • {stats.totalLessons} Video • Total durasi {stats.totalDuration} menit</p>
          </div>

          <div className="flex flex-col gap-md">
            {course.modules.map((mod, modIdx) => (
              <div key={mod.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                {/* Module Header */}
                <div className="flex justify-between items-center" style={{ padding: '1.5rem', background: 'var(--surface)' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                      Modul {modIdx + 1}: {mod.title}
                    </h4>
                    <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                      {mod.lessons?.length || 0} Lesson
                    </div>
                  </div>
                  <div>
                    {mod.is_free_preview ? (
                      <span className="badge badge--beginner">Free Preview</span>
                    ) : (
                      <span className="badge badge--locked flex items-center gap-xs">
                        <Lock size={12} /> Terkunci (Butuh Tier {course.minTier}+)
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Lesson List */}
                <ul style={{ padding: '0.5rem 0' }}>
                  {mod.lessons && mod.lessons.map((lesson, lesIdx) => (
                    <li key={lesson.id} className="flex justify-between items-center" style={{ padding: '0.75rem 1.5rem', borderBottom: lesIdx < mod.lessons.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <div className="flex items-center gap-sm">
                        <div style={{ color: mod.is_free_preview ? 'var(--teal)' : 'var(--text-muted)' }}>
                          {mod.is_free_preview ? <Play size={16} /> : <Lock size={16} />}
                        </div>
                        <span style={{ color: mod.is_free_preview ? 'var(--text)' : 'var(--text-muted)' }}>{lesson.title}</span>
                      </div>
                      <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                        {lesson.duration}m
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
