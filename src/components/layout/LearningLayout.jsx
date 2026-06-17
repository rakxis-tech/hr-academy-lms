import { useState, useEffect } from 'react';
import { Link, useParams, useLocation, Outlet } from 'react-router-dom';
import { BookOpen, ChevronLeft, ChevronRight, PlayCircle, CheckCircle2, Lock, X, Menu, LayoutDashboard } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import Breadcrumbs from '../ui/Breadcrumbs';

/**
 * LearningLayout — Persistent wrapper for all /courses/:slug and /learn/:slug routes.
 * Provides:
 *   1. Collapsible course-tree sidebar
 *   2. Dynamic breadcrumbs bar
 *   3. No footer (focus mode)
 */
export default function LearningLayout({ children }) {
  const { slug, moduleId, lessonId } = useParams();
  const location = useLocation();
  const { user, profile } = useAuth();
  const userTier = profile?.tier || 0;

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);

  const isPlayerRoute = !!moduleId && !!lessonId;

  // Fetch course data once when slug changes
  useEffect(() => {
    async function fetchCourse() {
      if (!slug) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('courses')
        .select(`*, modules (*, lessons (*))`)
        .eq('slug', slug)
        .single();

      if (!error && data) {
        data.modules.sort((a, b) => a.order - b.order);
        data.modules.forEach(m => {
          if (m.lessons) m.lessons.sort((a, b) => a.order - b.order);
        });
        setCourse(data);
      }
      setLoading(false);
    }
    fetchCourse();
  }, [slug]);

  // Fetch progress
  useEffect(() => {
    async function fetchProgress() {
      if (!user) return;
      const { data } = await supabase
        .from('user_progress')
        .select('lesson_id, completed')
        .eq('user_id', user.id);
      if (data) {
        setCompletedLessons(data.filter(p => p.completed).map(p => p.lesson_id));
      }
    }
    fetchProgress();
  }, [user]);

  // Build breadcrumbs
  const breadcrumbItems = [];
  breadcrumbItems.push({ label: 'Kurikulum', to: '/courses' });
  if (course) {
    breadcrumbItems.push({ label: course.title, to: `/courses/${slug}` });
  }
  if (isPlayerRoute && course) {
    const mod = course.modules?.find(m => m.id === moduleId);
    if (mod) {
      breadcrumbItems.push({ label: mod.title, to: `/learn/${slug}/${moduleId}/${mod.lessons?.[0]?.id || ''}` });
    }
    const les = mod?.lessons?.find(l => l.id === lessonId);
    if (les) {
      breadcrumbItems.push({ label: les.title });
    }
  }

  // Calculate total and completed
  const totalLessons = course?.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;
  const completedCount = completedLessons.length;
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg-deep)' }}>
        <div className="text-muted" style={{ fontSize: '1.1rem' }}>Memuat materi...</div>
      </div>
    );
  }

  return (
    <div className="learning-layout">
      {/* ─── BREADCRUMBS BAR ─── */}
      <div className="learning-layout__topbar">
        <div className="flex items-center gap-md" style={{ flex: 1, minWidth: 0 }}>
          <Link to="/dashboard" className="learning-layout__back-btn" title="Dashboard">
            <LayoutDashboard size={18} />
          </Link>
          <div className="learning-layout__divider-v" />
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="flex items-center gap-sm">
          {/* Progress Pill */}
          {user && (
            <div className="learning-layout__progress-pill">
              <div className="learning-layout__progress-track">
                <div className="learning-layout__progress-fill" style={{ width: `${progressPct}%` }} />
              </div>
              <span>{progressPct}%</span>
            </div>
          )}
          <button
            className="learning-layout__sidebar-toggle"
            onClick={() => {
              // Desktop toggle
              if (window.innerWidth > 1024) {
                setSidebarOpen(!sidebarOpen);
              } else {
                setMobileSidebarOpen(!mobileSidebarOpen);
              }
            }}
            aria-label="Toggle sidebar"
          >
            {(sidebarOpen || mobileSidebarOpen) ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ─── BODY: SIDEBAR + CONTENT ─── */}
      <div className="learning-layout__body">
        {/* Sidebar */}
        <aside className={`learning-sidebar ${sidebarOpen ? 'learning-sidebar--open' : 'learning-sidebar--closed'} ${mobileSidebarOpen ? 'learning-sidebar--mobile-open' : ''}`}>
          {/* Course Header */}
          {course && (
            <div className="learning-sidebar__header">
              <div className="flex items-center gap-sm" style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{course.icon}</span>
                <h3 className="learning-sidebar__title">{course.title}</h3>
              </div>
              {/* Mini progress */}
              <div className="learning-sidebar__progress">
                <div className="learning-sidebar__progress-track">
                  <div className="learning-sidebar__progress-fill" style={{ width: `${progressPct}%` }} />
                </div>
                <span className="learning-sidebar__progress-text">{completedCount}/{totalLessons} Selesai</span>
              </div>
            </div>
          )}

          {/* Module Tree */}
          <nav className="learning-sidebar__nav">
            {course?.modules?.map((mod, mIdx) => {
              const modAccess = mod.is_free_preview || userTier >= course.min_tier;
              const isActiveModule = mod.id === moduleId;
              const moduleCompleted = mod.lessons?.every(l => completedLessons.includes(l.id));
              const moduleLessonsDone = mod.lessons?.filter(l => completedLessons.includes(l.id)).length || 0;

              return (
                <div key={mod.id} className={`learning-sidebar__module ${isActiveModule ? 'learning-sidebar__module--active' : ''}`}>
                  <div className="learning-sidebar__module-header">
                    <div className="flex items-center gap-sm" style={{ flex: 1, minWidth: 0 }}>
                      <div className={`learning-sidebar__module-badge ${moduleCompleted ? 'learning-sidebar__module-badge--done' : ''}`}>
                        {moduleCompleted ? <CheckCircle2 size={12} /> : `${mIdx + 1}`}
                      </div>
                      <span className="learning-sidebar__module-title">{mod.title}</span>
                    </div>
                    <span className="learning-sidebar__module-count">
                      {modAccess ? `${moduleLessonsDone}/${mod.lessons?.length || 0}` : <Lock size={12} />}
                    </span>
                  </div>

                  {/* Lessons */}
                  <ul className="learning-sidebar__lessons">
                    {mod.lessons?.map(les => {
                      const isActive = les.id === lessonId;
                      const isDone = completedLessons.includes(les.id);

                      return (
                        <li key={les.id} id={`lesson-${les.id}`}>
                          {modAccess ? (
                            <Link
                              to={`/learn/${slug}/${mod.id}/${les.id}`}
                              className={`learning-sidebar__lesson ${isActive ? 'learning-sidebar__lesson--active' : ''} ${isDone ? 'learning-sidebar__lesson--done' : ''}`}
                              onClick={() => setMobileSidebarOpen(false)}
                            >
                              <span className="learning-sidebar__lesson-icon">
                                {isDone ? <CheckCircle2 size={14} /> : <PlayCircle size={14} />}
                              </span>
                              <span className="learning-sidebar__lesson-label">{les.title}</span>
                              <span className="learning-sidebar__lesson-dur">{les.duration}m</span>
                            </Link>
                          ) : (
                            <div className="learning-sidebar__lesson learning-sidebar__lesson--locked">
                              <span className="learning-sidebar__lesson-icon"><Lock size={14} /></span>
                              <span className="learning-sidebar__lesson-label">{les.title}</span>
                              <span className="learning-sidebar__lesson-dur">{les.duration}m</span>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Overlay */}
        {mobileSidebarOpen && (
          <div className="learning-sidebar__overlay" onClick={() => setMobileSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="learning-layout__content">
          {/* Pass course data + utilities down via children-as-function or direct prop injection */}
          {typeof children === 'function'
            ? children({ course, completedLessons, setCompletedLessons, loading })
            : children
          }
        </main>
      </div>
    </div>
  );
}
