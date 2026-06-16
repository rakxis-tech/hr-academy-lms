export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-deep)',
      borderTop: '1px solid var(--border)',
      padding: '4rem 0 2rem',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div className="grid grid-4 gap-xl" style={{ marginBottom: '3rem' }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <span className="font-display" style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'block' }}>
              <span className="text-orange">Obrak</span>-<span className="text-teal">Abrik</span> <span className="text-cream">2027</span>
            </span>
            <p className="text-muted" style={{ maxWidth: '400px', fontSize: '0.9rem', lineHeight: 1.8 }}>
              Platform Learning & Development HR yang menggabungkan psikologi industri praktis, kurikulum terstruktur, dan AI layer. Dari Cirebon untuk Jawa Barat dan Indonesia.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display" style={{ fontSize: '1rem', marginBottom: '1rem' }}>Platform</h4>
            <ul className="flex flex-col gap-sm">
              <li><a href="/courses" className="text-muted" style={{ fontSize: '0.9rem' }}>Semua Course</a></li>
              <li><a href="/pricing" className="text-muted" style={{ fontSize: '0.9rem' }}>Pricing & Tier</a></li>
              <li><a href="#" className="text-muted" style={{ fontSize: '0.9rem' }}>Konsultasi 1-on-1</a></li>
              <li><a href="#" className="text-muted" style={{ fontSize: '0.9rem' }}>Live Zoom Schedule</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display" style={{ fontSize: '1rem', marginBottom: '1rem' }}>Legal</h4>
            <ul className="flex flex-col gap-sm">
              <li><a href="#" className="text-muted" style={{ fontSize: '0.9rem' }}>Syarat & Ketentuan</a></li>
              <li><a href="#" className="text-muted" style={{ fontSize: '0.9rem' }}>Kebijakan Privasi</a></li>
              <li><a href="#" className="text-muted" style={{ fontSize: '0.9rem' }}>Hubungi Kami</a></li>
            </ul>
          </div>
        </div>

        <div className="divider"></div>

        <div className="flex items-center justify-between text-muted" style={{ fontSize: '0.8rem' }}>
          <p>&copy; 2026 Obrak-Abrik 2027. All rights reserved.</p>
          <div className="flex gap-sm">
            <span>Built by Raka</span>
            <span>•</span>
            <span>Content by Dandy</span>
            <span>•</span>
            <span>Growth by Ardi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
