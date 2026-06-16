import './index.css'

function App() {
  return (
    <>
      {/* Mesh Background — Gradient Blobs */}
      <div className="mesh-bg">
        <div className="blob blob--orange"></div>
        <div className="blob blob--teal"></div>
        <div className="blob blob--cream"></div>
      </div>

      {/* Noise Texture Overlay */}
      <div className="noise-overlay"></div>

      {/* App Content */}
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <div className="animate-float" style={{ fontSize: '74px', marginBottom: '1rem' }}>💥</div>
        
        <p className="label animate-slide-up" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          PROJECT 2027 · HR L&D PLATFORM
        </p>
        
        <h1 className="text-gradient animate-slide-up" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', marginBottom: '0.8rem' }}>
          Obrak-Abrik 2027
        </h1>
        
        <p className="animate-slide-up" style={{ color: 'var(--text-2)', fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)', maxWidth: '580px', marginBottom: '1.5rem' }}>
          Platform Learning & Development HR yang Ngobrak-abrik Pasar Cirebon → Jawa Barat
        </p>
        
        <div className="flex gap-sm flex-wrap justify-center animate-slide-up" style={{ marginBottom: '2rem' }}>
          <span className="tag tag--orange">🎓 HR Courses</span>
          <span className="tag tag--teal">🤖 AI-Powered</span>
          <span className="tag tag--cream">📍 Cirebon → Jabar</span>
        </div>

        {/* Tier Cards Preview */}
        <div className="grid grid-3 gap-md" style={{ maxWidth: '800px', width: '100%', marginBottom: '2rem' }}>
          <div className="card card--tier-1 animate-slide-up" style={{ textAlign: 'center' }}>
            <p className="font-display text-orange" style={{ fontSize: '0.85rem', marginBottom: '0.3rem' }}>🔰 Tier 1 · Foundation</p>
            <p className="text-muted" style={{ fontSize: '0.77rem', marginBottom: '0.5rem' }}>Rekrutmen, Admin HR, Payroll Dasar</p>
            <p className="text-orange font-display" style={{ fontSize: '1.1rem' }}>Rp 299k</p>
          </div>
          <div className="card card--tier-2 animate-slide-up" style={{ textAlign: 'center' }}>
            <p className="font-display text-teal" style={{ fontSize: '0.85rem', marginBottom: '0.3rem' }}>⭐ Tier 2 · Advanced</p>
            <p className="text-muted" style={{ fontSize: '0.77rem', marginBottom: '0.5rem' }}>Psikometri, BEI, People Analytics</p>
            <p className="text-teal font-display" style={{ fontSize: '1.1rem' }}>Rp 599k</p>
          </div>
          <div className="card card--tier-3 animate-slide-up" style={{ textAlign: 'center' }}>
            <p className="font-display text-cream" style={{ fontSize: '0.85rem', marginBottom: '0.3rem' }}>👑 Tier 3 · Mastermind</p>
            <p className="text-muted" style={{ fontSize: '0.77rem', marginBottom: '0.5rem' }}>Semua + AI + 1-on-1 Konsul</p>
            <p className="text-cream font-display" style={{ fontSize: '1.1rem' }}>Rp 1.499k</p>
          </div>
        </div>

        {/* Button Preview */}
        <div className="flex gap-md flex-wrap justify-center animate-slide-up">
          <button className="btn btn--primary btn--lg">Mulai Belajar</button>
          <button className="btn btn--secondary btn--lg">Lihat Kurikulum</button>
        </div>

        {/* Progress Bar Preview */}
        <div style={{ maxWidth: '400px', width: '100%', marginTop: '2rem' }} className="animate-slide-up">
          <div className="flex justify-between" style={{ marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-2)' }}>Progress Belajar</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--orange)' }}>65%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '65%' }}></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
