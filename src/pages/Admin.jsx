import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Settings, Plus, Edit2, Trash2, ChevronDown, ChevronRight, Video, FileText, Loader } from 'lucide-react';

export default function Admin() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);

  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'course', 'module', 'lesson'
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('courses')
      .select(`
        *,
        modules (
          *,
          lessons (*)
        )
      `)
      .order('id', { ascending: true });

    if (data) {
      data.forEach(c => {
        c.modules.sort((a, b) => a.order - b.order);
        c.modules.forEach(m => m.lessons.sort((a, b) => a.order - b.order));
      });
      setCourses(data);
    }
    setLoading(false);
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Yakin ingin menghapus ${type} ini?`)) return;
    
    let table = '';
    if (type === 'course') table = 'courses';
    if (type === 'module') table = 'modules';
    if (type === 'lesson') table = 'lessons';

    await supabase.from(table).delete().eq('id', id);
    fetchData();
  };

  const openModal = (type, parentId = null, item = null) => {
    setModalType(type);
    setEditingItem(item);
    
    if (item) {
      setFormData(item);
    } else {
      // Default new form data
      if (type === 'course') {
        setFormData({ title: '', slug: '', description: '', category: 'foundation', level: 'Beginner', min_tier: 1, duration: '1 Jam' });
      } else if (type === 'module') {
        setFormData({ course_id: parentId, title: '', order: 1, is_free_preview: false });
      } else if (type === 'lesson') {
        setFormData({ module_id: parentId, title: '', video_url: '', duration: 10, order: 1 });
      }
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    let table = '';
    if (modalType === 'course') table = 'courses';
    if (modalType === 'module') table = 'modules';
    if (modalType === 'lesson') table = 'lessons';

    if (editingItem) {
      await supabase.from(table).update(formData).eq('id', editingItem.id);
    } else {
      await supabase.from(table).insert([formData]);
    }

    setIsModalOpen(false);
    fetchData();
  };

  return (
    <div className="section" style={{ background: 'var(--bg-deep)', minHeight: '100vh', paddingTop: 'calc(var(--nav-height) + 2rem)' }}>
      <div className="container">
        
        <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Settings className="text-teal" /> Content Management
            </h1>
            <p className="text-muted">Kelola kurikulum, modul, dan materi video.</p>
          </div>
          <button onClick={() => openModal('course')} className="btn btn--primary">
            <Plus size={18} /> Tambah Course
          </button>
        </div>

        {loading ? (
          <div className="text-center text-muted" style={{ padding: '4rem' }}><Loader className="spin" size={32} /></div>
        ) : (
          <div className="flex flex-col gap-md">
            {courses.map(course => (
              <div key={course.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                
                {/* Course Header */}
                <div 
                  className="flex justify-between items-center" 
                  style={{ padding: '1.5rem', background: 'var(--surface-hover)', cursor: 'pointer' }}
                  onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                >
                  <div className="flex items-center gap-md">
                    {expandedCourse === course.id ? <ChevronDown size={20} className="text-muted" /> : <ChevronRight size={20} className="text-muted" />}
                    <div>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{course.title} <span className="badge badge--sm" style={{ marginLeft: '0.5rem' }}>Tier {course.min_tier}</span></h3>
                      <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0 }}>{course.modules?.length || 0} Modul</p>
                    </div>
                  </div>
                  <div className="flex gap-sm" onClick={e => e.stopPropagation()}>
                    <button onClick={() => openModal('course', null, course)} className="btn btn--ghost text-muted" style={{ padding: '0.5rem' }}><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete('course', course.id)} className="btn btn--ghost text-error" style={{ padding: '0.5rem' }}><Trash2 size={16} /></button>
                  </div>
                </div>

                {/* Modules List */}
                {expandedCourse === course.id && (
                  <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <button onClick={() => openModal('module', course.id)} className="btn btn--sm btn--secondary"><Plus size={14} /> Tambah Modul</button>
                    </div>
                    
                    <div className="flex flex-col gap-sm">
                      {course.modules?.map(mod => (
                        <div key={mod.id} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                          
                          {/* Module Header */}
                          <div 
                            className="flex justify-between items-center" 
                            style={{ padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.2)', cursor: 'pointer' }}
                            onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                          >
                            <div className="flex items-center gap-sm">
                              <FileText size={16} className="text-teal" />
                              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{mod.order}. {mod.title}</span>
                              {mod.is_free_preview && <span className="badge badge--beginner" style={{ fontSize: '0.6rem', padding: '0.1rem 0.3rem' }}>Preview</span>}
                            </div>
                            <div className="flex gap-sm" onClick={e => e.stopPropagation()}>
                              <button onClick={() => openModal('module', course.id, mod)} className="btn btn--ghost text-muted" style={{ padding: '0.25rem' }}><Edit2 size={14} /></button>
                              <button onClick={() => handleDelete('module', mod.id)} className="btn btn--ghost text-error" style={{ padding: '0.25rem' }}><Trash2 size={14} /></button>
                            </div>
                          </div>

                          {/* Lessons List */}
                          {expandedModule === mod.id && (
                            <div style={{ padding: '1rem', background: 'var(--surface)' }}>
                              <div style={{ marginBottom: '1rem' }}>
                                <button onClick={() => openModal('lesson', mod.id)} className="btn btn--sm btn--ghost text-teal" style={{ padding: '0.2rem 0.5rem' }}><Plus size={14} /> Tambah Lesson Video</button>
                              </div>
                              <ul className="flex flex-col gap-xs">
                                {mod.lessons?.map(lesson => (
                                  <li key={lesson.id} className="flex justify-between items-center" style={{ padding: '0.5rem', background: 'var(--bg-deep)', borderRadius: 'var(--radius-sm)' }}>
                                    <div className="flex items-center gap-sm text-muted" style={{ fontSize: '0.85rem' }}>
                                      <Video size={14} className="text-orange" />
                                      {lesson.order}. {lesson.title} ({lesson.duration}m)
                                    </div>
                                    <div className="flex gap-sm">
                                      <button onClick={() => openModal('lesson', mod.id, lesson)} className="btn btn--ghost text-muted" style={{ padding: '0.25rem' }}><Edit2 size={14} /></button>
                                      <button onClick={() => handleDelete('lesson', lesson.id)} className="btn btn--ghost text-error" style={{ padding: '0.25rem' }}><Trash2 size={14} /></button>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card animate-slide-up" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              {editingItem ? 'Edit' : 'Tambah'} {modalType === 'course' ? 'Course' : modalType === 'module' ? 'Modul' : 'Lesson'}
            </h2>
            
            <form onSubmit={handleSave} className="flex flex-col gap-md">
              {modalType === 'course' && (
                <>
                  <div className="form-group">
                    <label className="label">Judul Course</label>
                    <input type="text" className="input" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label className="label">Slug (URL)</label>
                    <input type="text" className="input" value={formData.slug || ''} onChange={e => setFormData({...formData, slug: e.target.value})} required placeholder="contoh-slug-course" />
                  </div>
                  <div className="form-group">
                    <label className="label">Deskripsi Singkat</label>
                    <textarea className="input" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} required rows={3}></textarea>
                  </div>
                  <div className="flex gap-md">
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="label">Minimal Tier (1-3)</label>
                      <input type="number" min="1" max="3" className="input" value={formData.min_tier || 1} onChange={e => setFormData({...formData, min_tier: parseInt(e.target.value)})} required />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="label">Kategori</label>
                      <select className="input" value={formData.category || 'foundation'} onChange={e => setFormData({...formData, category: e.target.value})}>
                        <option value="foundation">Foundation</option>
                        <option value="exclusive">Exclusive</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {modalType === 'module' && (
                <>
                  <div className="form-group">
                    <label className="label">Judul Modul</label>
                    <input type="text" className="input" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} required />
                  </div>
                  <div className="flex gap-md">
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="label">Urutan (Order)</label>
                      <input type="number" min="1" className="input" value={formData.order || 1} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} required />
                    </div>
                    <div className="form-group flex items-center gap-sm" style={{ flex: 1, marginTop: '2rem' }}>
                      <input type="checkbox" checked={formData.is_free_preview || false} onChange={e => setFormData({...formData, is_free_preview: e.target.checked})} id="is_free" />
                      <label htmlFor="is_free" style={{ margin: 0, cursor: 'pointer' }}>Free Preview</label>
                    </div>
                  </div>
                </>
              )}

              {modalType === 'lesson' && (
                <>
                  <div className="form-group">
                    <label className="label">Judul Video Lesson</label>
                    <input type="text" className="input" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label className="label">URL Video (Youtube/Vimeo)</label>
                    <input type="url" className="input" value={formData.video_url || ''} onChange={e => setFormData({...formData, video_url: e.target.value})} required />
                  </div>
                  <div className="flex gap-md">
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="label">Durasi (Menit)</label>
                      <input type="number" min="1" className="input" value={formData.duration || 10} onChange={e => setFormData({...formData, duration: parseInt(e.target.value)})} required />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="label">Urutan (Order)</label>
                      <input type="number" min="1" className="input" value={formData.order || 1} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} required />
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-sm justify-end" style={{ marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn--ghost">Batal</button>
                <button type="submit" className="btn btn--teal">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
