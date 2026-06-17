import { useParams, Link } from 'react-router-dom';
import { Play, Clock, Star, CheckCircle2, ArrowRight } from 'lucide-react';
import { TIERS, getCourseStats } from '../data/courses';
import { instructors } from '../data/testimonials';
import { useAuth } from '../context/AuthContext';
import LearningLayout from '../components/layout/LearningLayout';

/**
 * CourseDetail — Now rendered INSIDE LearningLayout.
 * Shows course overview, instructor, and CTA to jump into the first lesson.
 * The sidebar (provided by LearningLayout) shows the full curriculum tree.
 * 
 * Click path: Kurikulum → Card → CourseDetail (with sidebar) → Click lesson = 2 clicks
 */
function CourseDetailContent() {
  // LearningLayout fetches the course; we read it from the DOM context.
  // But since we can't pass props through <Route element>, we fetch independently.
  // The LearningLayout sidebar still provides navigation.

  const { slug } = useParams();
  const { user, profile } = useAuth();
  const userTier = profile?.tier || 0;

  // We rely on LearningLayout's sidebar for curriculum.
  // This page just renders the "hero" overview content.
  // LearningLayout already fetched and cached the course, but this component
  // needs its own reference for the hero section.

  const [course, setCourse] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetch() {
      const { data, error } = await (await import('../lib/supabase')).supabase
        .from('courses')
        .select(`*, modules (*, lessons (*))`)
        .eq('slug', slug)
        .single();
      if (!error && data) {
        data.modules.sort((a, b) => a.order - b.order);
        data.modules.forEach(m => { if (m.lessons) m.lessons.sort((a, b) => a.order - b.order); });
        setCourse(data);
      }
      setLoading(false);
    }
    fetch();
  }, [slug]);

  if (loading) {
    return <div className="course-overview" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>Memuat...</div>;
  }

  if (!course) {
    return (
      <div className="course-overview" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>😢</h2>
        <h2>Course Tidak Ditemukan</h2>
        <p className="text-muted" style={{ marginBottom: '2rem' }}>Materi yang Anda cari mungkin telah dipindahkan atau dihapus.</p>
        <Link to="/courses" className="btn btn--secondary">Kembali ke Kurikulum</Link>
      </div>
    );
  }

  const stats = getCourseStats(course);
  const tierInfo = TIERS[course.min_tier];
  const instructor = instructors.find(i => i.name === course.instructor) || instructors[0];
  const firstLesson = course.modules?.[0]?.lessons?.[0];
  const firstModule = course.modules?.[0];
  const canAccess = userTier >= course.min_tier;

  return (
    <div className="course-overview">
      {/* Hero */}
      <div className="course-overview__hero">
        <div className="course-overview__badges">
          <span className={`badge badge--tier-${course.min_tier}`}>{tierInfo.name}</span>
          <span className="text-muted" style={{ fontSize: '0.85rem' }}>•</span>
          <span className="text-muted" style={{ fontSize: '0.85rem' }}>{course.level}</span>
        </div>

        <h1 className="course-overview__title text-gradient">{course.title}</h1>
        <p className="course-overview__desc">{course.description}</p>

        <div className="course-overview__meta">
          <div className="flex items-center gap-xs"><Clock size={16} /> {course.duration}</div>
          <div className="flex items-center gap-xs"><Play size={16} /> {stats.totalLessons} Video</div>
          <div className="flex items-center gap-xs text-orange"><Star size={16} fill="var(--orange)" /> {course.rating} ({course.enrolled_count} murid)</div>
        </div>

        <div className="course-overview__cta">
          {firstLesson && firstModule ? (
            <Link to={`/learn/${course.slug}/${firstModule.id}/${firstLesson.id}`} className="btn btn--primary btn--lg">
              {canAccess ? 'Mulai Belajar Sekarang' : 'Preview Materi Gratis'} <ArrowRight size={18} />
            </Link>
          ) : (
            <button className="btn btn--secondary btn--lg" disabled>Belum Ada Materi</button>
          )}
        </div>
      </div>

      {/* Instructor Card */}
      <div className="course-overview__section">
        <h2 className="course-overview__section-title">Instruktur</h2>
        <div className="card flex items-start gap-md" style={{ padding: '1.5rem' }}>
          <div className="avatar avatar--lg flex items-center justify-center" style={{ background: 'var(--surface-hover)', fontSize: '1.8rem', flexShrink: 0 }}>
            {instructor.avatar}
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{instructor.name}</h4>
            <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>{instructor.role}</p>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-2)' }}>{instructor.bio}</p>
          </div>
        </div>
      </div>

      {/* Tier / Pricing Card */}
      <div className="course-overview__section">
        <h2 className="course-overview__section-title">Termasuk Dalam Paket</h2>
        <div className={`card card--tier-${course.min_tier}`} style={{ padding: '1.5rem' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '1rem' }}>
            <div className="flex items-center gap-sm">
              <span style={{ fontSize: '1.5rem' }}>{tierInfo.icon}</span>
              <strong style={{ fontSize: '1.2rem', color: `var(--${tierInfo.color})` }}>{tierInfo.name}</strong>
            </div>
            <div className="font-display" style={{ fontSize: '1.5rem' }}>{tierInfo.priceLabel}</div>
          </div>
          <ul className="flex flex-col gap-sm" style={{ marginBottom: '1.5rem' }}>
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
      </div>
    </div>
  );
}

// Need React import for useState/useEffect inside CourseDetailContent
import React from 'react';

export default function CourseDetail() {
  return (
    <LearningLayout>
      <CourseDetailContent />
    </LearningLayout>
  );
}
