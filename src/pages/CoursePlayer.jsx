import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { CheckCircle2, Lock } from 'lucide-react';
import { TIERS } from '../data/courses';
import UpgradeModal from '../components/ui/UpgradeModal';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import LearningLayout from '../components/layout/LearningLayout';

/**
 * CoursePlayer — Now rendered INSIDE LearningLayout.
 * LearningLayout provides the sidebar, breadcrumbs, and progress tracking.
 * This component only handles the video player and lesson-specific UI.
 */
function CoursePlayerContent() {
  const { slug, moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const userTier = profile?.tier || 0;

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [targetUpgradeTier, setTargetUpgradeTier] = useState(2);

  // Fetch course data
  useEffect(() => {
    async function fetchData() {
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select(`*, modules (*, lessons (*))`)
        .eq('slug', slug)
        .single();

      if (!courseError && courseData) {
        courseData.modules.sort((a, b) => a.order - b.order);
        courseData.modules.forEach(m => {
          if (m.lessons) m.lessons.sort((a, b) => a.order - b.order);
        });
        setCourse(courseData);
      }

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

  // Auto-scroll to active lesson
  useEffect(() => {
    if (!loading && course) {
      const el = document.getElementById(`lesson-${lessonId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [lessonId, loading, course]);

  if (loading) {
    return <div className="lesson-player__locked"><div className="text-muted">Memuat player...</div></div>;
  }

  if (!course) {
    return (
      <div className="lesson-player__locked">
        <h2 style={{ marginBottom: '1rem' }}>Course tidak ditemukan</h2>
        <Link to="/courses" className="btn btn--secondary">Kembali ke Kurikulum</Link>
      </div>
    );
  }

  const module = course.modules?.find(m => m.id === moduleId);
  const lesson = module?.lessons?.find(l => l.id === lessonId);
  const hasAccess = module && (module.is_free_preview || userTier >= course.min_tier);

  const toggleComplete = async (id) => {
    const isCurrentlyCompleted = completedLessons.includes(id);
    const newState = !isCurrentlyCompleted;

    setCompletedLessons(prev =>
      isCurrentlyCompleted ? prev.filter(l => l !== id) : [...prev, id]
    );

    if (user) {
      await supabase.from('user_progress').upsert({
        user_id: user.id,
        lesson_id: id,
        completed: newState,
        completed_at: newState ? new Date().toISOString() : null
      });
    }
  };

  return (
    <div className="lesson-player">
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        targetTierId={targetUpgradeTier}
      />

      {hasAccess && lesson ? (
        <>
          {/* Video */}
          <div className="lesson-player__video-wrap">
            <div className="lesson-player__video-inner">
              <ReactPlayer
                url={lesson.video_url}
                width="100%"
                height="100%"
                controls
                playing={false}
                onEnded={() => toggleComplete(lesson.id)}
                config={{
                  youtube: { playerVars: { showinfo: 0, rel: 0, modestbranding: 1 } }
                }}
              />
            </div>
          </div>

          {/* Lesson Info */}
          <div className="lesson-player__info">
            <h2 className="lesson-player__title">{lesson.title}</h2>
            <div className="lesson-player__meta">
              <span>Modul: {module.title}</span>
              <span>•</span>
              <span>Durasi: {lesson.duration} menit</span>
            </div>

            <div className="lesson-player__actions">
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
        <div className="lesson-player__locked">
          <Lock size={64} className="text-muted" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Materi Terkunci</h2>
          <p className="text-muted" style={{ maxWidth: '400px', marginBottom: '2rem' }}>
            Anda membutuhkan paket {TIERS[course.min_tier]?.name} untuk mengakses modul ini.
          </p>
          <Link to="/pricing" className="btn btn--orange">Upgrade Tier</Link>
        </div>
      )}
    </div>
  );
}

export default function CoursePlayer() {
  return (
    <LearningLayout>
      <CoursePlayerContent />
    </LearningLayout>
  );
}
