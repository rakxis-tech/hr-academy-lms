import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { ChevronLeft, PlayCircle, CheckCircle2, Lock, Menu, X } from 'lucide-react';
import { courses as mockCourses, TIERS, canAccessModule } from '../data/courses';
import UpgradeModal from '../components/ui/UpgradeModal';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export default function CoursePlayer() {
  const { slug, moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]); // Temporary state for mock progress
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [targetUpgradeTier, setTargetUpgradeTier] = useState(2);

  const { user, profile } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-scroll to active lesson in sidebar on load
  useEffect(() => {
    if (!loading && course) {
      const activeEl = document.getElementById(`lesson-${lessonId}`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [lessonId, loading, course]);

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch Course Data
      const { data: courseData, error: courseError } = await supabase
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
        
      if (!courseError && courseData) {
        courseData.modules.sort((a, b) => a.order - b.order);
        courseData.modules.forEach(m => {
          if (m.lessons) m.lessons.sort((a, b) => a.order - b.order);
        });
        setCourse(courseData);
      }

      // 2. Fetch Progress if logged in
      if (user) {
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('lesson_id, completed')
          .eq('user_id', user.id);
          
        if (progressData) {
          setCompletedLessons(progressData.filter(p => p.completed).map(p => p.lesson_id));
        }
      }
      
      setLoading(false);
    }
    fetchData();
  }, [slug, user]);

  if (loading) {
    return <div className="section container text-center">Loading player...</div>;
  }
  
  if (!course) {
    return <div className="section container text-center">Course tidak ditemukan</div>;
  }

  const module = course?.modules?.find(m => m.id === moduleId);
  const lesson = module?.lessons?.find(l => l.id === lessonId);

  // Check access logic based on user profile tier
  const userTier = profile?.tier || 1;
  
  // Custom canAccessModule since we are using DB data
  const hasAccess = module && (module.is_free_preview || userTier >= course.min_tier);

  const toggleComplete = async (id) => {
    const isCurrentlyCompleted = completedLessons.includes(id);
    const newCompletedState = !isCurrentlyCompleted;

    // Optimistic UI Update
    setCompletedLessons(prev => 
      isCurrentlyCompleted ? prev.filter(l => l !== id) : [...prev, id]
    );

    // Update DB
    if (user) {
      await supabase.from('user_progress').upsert({
        user_id: user.id,
        lesson_id: id,
        completed: newCompletedState,
        completed_at: newCompletedState ? new Date().toISOString() : null
      });
    }
  };

  const navigateToLesson = (targetModuleId, targetLessonId) => {
    navigate(`/learn/${slug}/${targetModuleId}/${targetLessonId}`);
    setSidebarOpen(false);
  };

  const handleLockedClick = (requiredTier) => {
    setTargetUpgradeTier(requiredTier);
    setIsUpgradeModalOpen(true);
  };

  return (
    <div className="course-player-layout" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: 'var(--bg-deep)' }}>
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)} 
        targetTierId={targetUpgradeTier} 
      />
      
      {/* ─── PLAYER TOP BAR ─── */}
      <header style={{ 
        height: '60px', 
        background: 'var(--surface)', 
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
        flexShrink: 0,
        zIndex: 10
      }}>
        <div className="flex items-center gap-md">
          <Link to={`/courses/${slug}`} className="text-muted flex items-center hover:text-white transition-colors" title="Kembali ke Detail Course">
            <ChevronLeft size={24} />
          </Link>
          <div style={{ width: '1px', height: '24px', background: 'var(--border)' }}></div>
          <h1 style={{ fontSize: '1rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {course.icon} <span className="hide-mobile">{course.title}</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-sm">
          <div className="text-muted" style={{ fontSize: '0.85rem' }}>
            <span className="text-orange">{completedLessons.length}</span> / {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Selesai
          </div>
          <button 
            className="btn btn--ghost" 
            style={{ display: 'flex', padding: '0.5rem' }} 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        
        {/* Video Area */}
        <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {hasAccess && lesson ? (
            <>
              {/* Video Wrapper */}
              <div style={{ width: '100%', background: '#000', position: 'relative', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                  <ReactPlayer 
                    url={lesson.videoUrl} 
                    width="100%" 
                    height="100%" 
                    controls={true}
                    playing={false}
                    onEnded={() => toggleComplete(lesson.id)}
                    config={{
                      youtube: { playerVars: { showinfo: 0, rel: 0, modestbranding: 1 } }
                    }}
                  />
                </div>
              </div>

              {/* Lesson Info Below Video */}
              <div className="container" style={{ padding: '2rem', maxWidth: '1000px', margin: '0' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{lesson.title}</h2>
                <div className="flex items-center gap-sm text-muted" style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
                  <span>Modul: {module.title}</span>
                  <span>•</span>
                  <span>Durasi: {lesson.duration} menit</span>
                </div>

                <div className="flex items-center gap-md" style={{ padding: '1rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <button 
                    className={`btn ${completedLessons.includes(lesson.id) ? 'btn--secondary' : 'btn--primary'}`}
                    onClick={() => toggleComplete(lesson.id)}
                  >
                    <CheckCircle2 size={18} /> 
                    {completedLessons.includes(lesson.id) ? 'Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                  <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0 }}>
                    Tandai selesai untuk melacak progress belajar Anda.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}><Lock size={64} className="text-muted" /></div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Materi Terkunci</h2>
              <p className="text-muted" style={{ maxWidth: '400px', marginBottom: '2rem' }}>
                Anda membutuhkan paket langganan {TIERS[course.min_tier]?.name} untuk mengakses modul ini. Upgrade tier Anda sekarang untuk membuka semua materi.
              </p>
              <Link to="/pricing" className="btn btn--orange">Upgrade Tier</Link>
            </div>
          )}
        </main>

        {/* Sidebar (Curriculum) */}
        <aside 
          className="player-sidebar"
          style={{ 
            width: '350px', 
            background: 'var(--surface)', 
            borderLeft: '1px solid var(--border)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.3s ease',
            position: 'relative', // desktop behavior
            '@media (max-width: 1024px)': {
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              transform: sidebarOpen ? 'translateX(0)' : 'translateX(100%)',
              zIndex: 20
            }
          }}
        >
          {/* Overlay for mobile sidebar */}
          <div style={{ padding: '1.5rem 1rem', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, background: 'var(--surface)', zIndex: 2 }}>
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Kurikulum Course</h3>
          </div>

          <div style={{ padding: '0.5rem 0' }}>
            {course.modules.map((mod, mIdx) => {
              const modAccess = mod.is_free_preview || userTier >= course.min_tier;
              const isActiveModule = mod.id === moduleId;

              return (
                <div key={mod.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <div style={{ padding: '1rem', background: isActiveModule ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '0.2rem', color: modAccess ? 'var(--text)' : 'var(--text-muted)' }}>
                      M{mIdx + 1}: {mod.title}
                    </h4>
                    {!modAccess && <span className="badge badge--locked" style={{ fontSize: '0.65rem' }}>Butuh Tier {course.min_tier}</span>}
                    {mod.is_free_preview && <span className="badge badge--beginner" style={{ fontSize: '0.65rem' }}>Free Preview</span>}
                  </div>
                  
                  {/* Lessons in Module */}
                  <ul style={{ paddingBottom: '0.5rem' }}>
                    {mod.lessons.map((les, lIdx) => {
                      const isActiveLesson = les.id === lessonId;
                      const isCompleted = completedLessons.includes(les.id);

                      return (
                        <li key={les.id} id={`lesson-${les.id}`}>
                          <button
                            onClick={() => modAccess ? navigateToLesson(mod.id, les.id) : handleLockedClick(course.min_tier)}
                            style={{ 
                              width: '100%',
                              textAlign: 'left',
                              padding: '0.75rem 1rem 0.75rem 2.5rem',
                              background: isActiveLesson ? 'var(--orange-subtle)' : 'transparent',
                              borderLeft: isActiveLesson ? '3px solid var(--orange)' : '3px solid transparent',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.75rem',
                              cursor: 'pointer',
                              color: isActiveLesson ? 'var(--orange)' : (modAccess ? 'var(--text-2)' : 'var(--text-muted)'),
                              transition: 'background 0.2s ease'
                            }}
                            className={modAccess && !isActiveLesson ? 'hover-bg-glass' : (isActiveLesson ? '' : 'hover-bg-glass')}
                          >
                            <div style={{ marginTop: '2px', color: isCompleted ? 'var(--success)' : (isActiveLesson ? 'var(--orange)' : 'var(--text-muted)') }}>
                              {isCompleted ? <CheckCircle2 size={16} /> : (modAccess ? <PlayCircle size={16} /> : <Lock size={16} />)}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '0.85rem', lineHeight: 1.4, marginBottom: '0.2rem' }}>{les.title}</div>
                              <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{les.duration}m</div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </aside>
        
        {/* CSS for sidebar hover state */}
        <style>{`
          .hover-bg-glass:hover { background: var(--glass) !important; }
          @media (max-width: 1024px) {
            .player-sidebar {
              position: absolute !important;
              right: 0;
              top: 0;
              bottom: 0;
              z-index: 20;
              box-shadow: var(--shadow-lg);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
