import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, CheckCircle2, Lock } from 'lucide-react';
import { TIERS } from '../../data/courses';

export default function UpgradeModal({ isOpen, onClose, targetTierId }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !targetTierId) return null;

  const tier = TIERS[targetTierId];

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.2s ease-out forwards'
      }}
      onClick={onClose}
    >
      <div 
        className="card animate-slide-up"
        style={{
          maxWidth: '500px',
          width: '100%',
          position: 'relative',
          padding: '2.5rem',
          border: `1px solid var(--${tier.color})`,
          boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(var(--${tier.color}-rgb), 0.1)`
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-full)',
            transition: 'background 0.2s ease'
          }}
          className="hover-bg-glass"
        >
          <X size={20} />
        </button>

        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <div style={{ width: '64px', height: '64px', background: 'var(--surface-hover)', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2rem' }}>
            <Lock className="text-muted" size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Materi Terkunci</h2>
          <p className="text-muted" style={{ fontSize: '0.95rem' }}>
            Konten ini eksklusif untuk member paket <strong>{tier.name}</strong>. Upgrade sekarang untuk membuka akses.
          </p>
        </div>

        <div style={{ background: 'var(--bg-deep)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
            <div className="flex items-center gap-sm">
              <span style={{ fontSize: '1.5rem' }}>{tier.icon}</span>
              <strong style={{ fontSize: '1.2rem', color: `var(--${tier.color})` }}>{tier.name}</strong>
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{tier.priceLabel}</div>
          </div>
          
          <ul className="flex flex-col gap-sm">
            <li className="flex items-start gap-sm text-muted" style={{ fontSize: '0.9rem' }}>
              <CheckCircle2 size={16} className={`text-${tier.color}`} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Akses ke <strong>{tier.courses.length} Courses</strong></span>
            </li>
            {targetTierId >= 2 && (
              <li className="flex items-start gap-sm text-muted" style={{ fontSize: '0.9rem' }}>
                <CheckCircle2 size={16} className={`text-${tier.color}`} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Live Zoom Class interaktif</span>
              </li>
            )}
            {targetTierId >= 3 && (
              <li className="flex items-start gap-sm text-muted" style={{ fontSize: '0.9rem' }}>
                <CheckCircle2 size={16} className={`text-${tier.color}`} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Konsultasi privat 1-on-1 (60 menit)</span>
              </li>
            )}
            <li className="flex items-start gap-sm text-muted" style={{ fontSize: '0.9rem' }}>
              <CheckCircle2 size={16} className={`text-${tier.color}`} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>AI HR Assistant (Full Akses)</span>
            </li>
          </ul>
        </div>

        <Link 
          to="/pricing" 
          className={`btn btn--full btn--lg ${targetTierId === 2 ? 'btn--teal' : targetTierId === 3 ? 'btn--primary' : 'btn--secondary'}`}
        >
          Lihat Detail & Upgrade
        </Link>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .hover-bg-glass:hover { background: var(--surface-hover) !important; }
      `}</style>
    </div>
  );
}
