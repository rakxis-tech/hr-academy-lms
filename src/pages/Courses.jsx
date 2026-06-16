import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Play, Clock, Star, ArrowRight } from 'lucide-react';
import { courses, TIERS } from '../data/courses';

export default function Courses() {
  const [filter, setFilter] = useState('all'); // 'all', 'foundation', 'exclusive'
  const [search, setSearch] = useState('');

  const filteredCourses = courses.filter(course => {
    const matchFilter = filter === 'all' || course.category === filter;
    const matchSearch = course.title.toLowerCase().includes(search.toLowerCase()) || 
                        course.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  return (
    <div className="courses-page">
      {/* ─── HEADER ─── */}
      <section className="section" style={{ paddingBottom: '2rem', background: 'var(--bg-deep)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>Kurikulum Lengkap</h1>
          <p className="text-muted" style={{ maxWidth: '600px', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Eksplorasi 12 course komprehensif mulai dari dasar HR operasional hingga People Analytics dan integrasi AI.
          </p>

          {/* Search & Filter Bar */}
          <div className="flex flex-wrap gap-md justify-between items-center card" style={{ padding: '1rem' }}>
            <div className="flex items-center gap-sm" style={{ flex: 1, minWidth: '250px' }}>
              <Search size={20} className="text-muted" />
              <input 
                type="text" 
                placeholder="Cari materi (ex: Rekrutmen, Payroll, AI)..." 
                className="input"
                style={{ border: 'none', background: 'transparent', padding: 0 }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex gap-sm items-center">
              <Filter size={18} className="text-muted" />
              <select 
                className="input" 
                style={{ width: 'auto', cursor: 'pointer', padding: '0.4rem 1rem' }}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Semua Kategori</option>
                <option value="foundation">Foundation (Tier 1+)</option>
                <option value="exclusive">Exclusive (Tier 2+)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COURSE GRID ─── */}
      <section className="section">
        <div className="container">
          {filteredCourses.length === 0 ? (
            <div className="text-center text-muted" style={{ padding: '4rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <p>Materi tidak ditemukan. Coba kata kunci lain.</p>
            </div>
          ) : (
            <div className="grid grid-3 gap-lg">
              {filteredCourses.map((course, idx) => (
                <div key={course.id} className={`card animate-slide-up flex flex-col ${course.category === 'exclusive' ? 'card--orange' : ''}`} style={{ animationDelay: `${(idx % 6) * 0.1}s`, padding: 0, overflow: 'hidden' }}>
                  {/* Thumbnail Placeholder */}
                  <div style={{ height: '160px', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <div style={{ fontSize: '4rem', opacity: 0.5 }}>{course.icon}</div>
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                      <span className={`badge badge--tier-${course.minTier}`}>{TIERS[course.minTier].name}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div className="flex gap-xs flex-wrap" style={{ marginBottom: '0.8rem' }}>
                      {course.tags.slice(0,2).map(tag => (
                        <span key={tag} className="tag" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', background: 'var(--surface-hover)', border: 'none', color: 'var(--text-muted)' }}>{tag}</span>
                      ))}
                    </div>
                    
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', lineHeight: 1.4 }}>{course.title}</h3>
                    <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '1.5rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {course.description}
                    </p>
                    
                    {/* Meta */}
                    <div className="flex items-center gap-md text-muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>
                      <div className="flex items-center gap-xs"><Play size={14} /> {course.modules.length} Modul</div>
                      <div className="flex items-center gap-xs"><Clock size={14} /> {course.duration}</div>
                    </div>
                    
                    <div className="divider" style={{ margin: '0 0 1rem 0' }}></div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-xs text-orange" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                        <Star size={14} fill="var(--orange)" /> {course.rating}
                      </div>
                      <Link to={`/courses/${course.slug}`} className="btn btn--ghost btn--sm" style={{ padding: 0, color: 'var(--teal)' }}>
                        Lihat Detail <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
