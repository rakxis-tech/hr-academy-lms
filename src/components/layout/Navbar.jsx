import { Link } from 'react-router-dom';
import { LogIn, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 'var(--nav-height)',
      background: 'var(--glass)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--glass-border)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-sm">
          <span className="font-display" style={{ fontSize: '1.25rem' }}>
            <span className="text-orange">Obrak</span>-<span className="text-teal">Abrik</span> <span className="text-cream">2027</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="flex items-center gap-lg hide-mobile">
          <Link to="/courses" style={{ color: 'var(--text-2)', fontSize: '0.9rem', fontWeight: 500 }}>Kurikulum</Link>
          <Link to="/pricing" style={{ color: 'var(--text-2)', fontSize: '0.9rem', fontWeight: 500 }}>Pricing</Link>
          <div style={{ width: '1px', height: '24px', background: 'var(--border)' }}></div>
          <Link to="/auth" className="btn btn--secondary btn--sm">
            <LogIn size={16} /> Masuk
          </Link>
          <Link to="/auth?mode=register" className="btn btn--primary btn--sm">
            Daftar Sekarang
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="btn btn--ghost flex items-center justify-center" style={{ display: 'none' /* handled by media query in a real app, keeping simple for now */ }}>
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
}
