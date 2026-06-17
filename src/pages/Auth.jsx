import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ArrowRight, User } from 'lucide-react';
import { TIERS } from '../data/courses';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const defaultMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  
  const [mode, setMode] = useState(defaultMode); // 'login' or 'register'
  const [step, setStep] = useState(1); // 1 = Basic Info, 2 = Select Tier (for register)
  const [selectedTier, setSelectedTier] = useState(2); // Default Advanced
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setErrorMsg('');
      setLoading(true);
      const { error } = await signUp(email, password, fullName, selectedTier);
      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
      } else {
        // Automatically sign in or redirect
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="auth-page" style={{ 
      minHeight: 'calc(100vh - var(--nav-height))', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative'
    }}>
      
      {/* Container */}
      <div className="card grid gap-none overflow-hidden" style={{ 
        maxWidth: '1000px', 
        width: '100%', 
        padding: 0, 
        gridTemplateColumns: '1fr 1.2fr',
        minHeight: '600px'
      }}>
        
        {/* Left Side: Branding / Testimonial */}
        <div style={{ 
          background: 'linear-gradient(135deg, var(--bg-deep) 0%, #1c1917 100%)', 
          padding: '3rem', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          borderRight: '1px solid var(--border)',
          position: 'relative'
        }}>
          {/* Abstract blobs for auth background */}
          <div className="blob blob--orange" style={{ width: '300px', height: '300px', opacity: 0.2, top: '-10%', left: '-10%' }}></div>
          <div className="blob blob--teal" style={{ width: '200px', height: '200px', opacity: 0.15, bottom: '-10%', right: '-10%' }}></div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
              Obrak<span className="text-orange">-Abrik</span> 2027
            </Link>
            <p className="text-muted" style={{ marginTop: '1rem', fontSize: '1.1rem', lineHeight: 1.5 }}>
              Platform L&D HR pertama di Indonesia yang menggabungkan psikometri, analytics, dan integrasi AI.
            </p>
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="flex gap-sm items-center" style={{ marginBottom: '1rem' }}>
              <div className="flex gap-xs text-orange">
                {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
              </div>
              <span className="text-muted text-sm">4.9/5 dari 500+ HR Professionals</span>
            </div>
            <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-2)', marginBottom: '1rem' }}>
              "Materi yang diajarkan sangat praktikal. Case clinic-nya benar-benar membantu memecahkan masalah HR di kantor."
            </p>
            <div className="flex items-center gap-sm">
              <div className="avatar avatar--sm flex justify-center items-center" style={{ background: 'var(--teal)', fontSize: '1rem' }}>🧑‍💼</div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Rizky Aditya</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>HR Manager, Startup Tech</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div style={{ padding: '4rem 3rem', background: 'var(--surface)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              {mode === 'login' ? 'Selamat Datang Kembali!' : (step === 1 ? 'Mulai Perjalanan Anda' : 'Pilih Paket Belajar')}
            </h2>
            <p className="text-muted">
              {mode === 'login' 
                ? 'Silakan masuk ke akun Anda untuk melanjutkan belajar.' 
                : (step === 1 ? 'Daftar sekarang untuk akses kurikulum HR terbaik.' : 'Langkah terakhir sebelum Anda mulai belajar.')}
            </p>
            {errorMsg && <div style={{ color: 'var(--error)', marginTop: '1rem', padding: '0.75rem', background: 'rgba(255,0,0,0.1)', borderRadius: 'var(--radius-sm)' }}>{errorMsg}</div>}
          </div>

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="flex flex-col gap-md animate-fade-in">
              <div className="form-group">
                <label className="label">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input" placeholder="contoh@email.com" required />
              </div>
              <div className="form-group">
                <div className="flex justify-between items-center">
                  <label className="label" style={{ marginBottom: 0 }}>Password</label>
                  <a href="#" className="text-teal" style={{ fontSize: '0.8rem' }}>Lupa password?</a>
                </div>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input" placeholder="••••••••" required />
              </div>
              
              <button type="submit" disabled={loading} className="btn btn--primary btn--full btn--lg" style={{ marginTop: '1rem' }}>
                {loading ? 'Memproses...' : 'Masuk ke Dashboard'}
              </button>
              
              <p className="text-center text-muted" style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
                Belum punya akun? <button type="button" onClick={() => setMode('register')} className="text-orange" style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, padding: 0 }}>Daftar Sekarang</button>
              </p>
            </form>
          )}

          {/* REGISTER FORM (Step 1) */}
          {mode === 'register' && step === 1 && (
            <form onSubmit={handleRegister} className="flex flex-col gap-md animate-fade-in">
              <div className="form-group">
                <label className="label">Nama Lengkap</label>
                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="input" placeholder="Budi Santoso" required />
              </div>
              <div className="form-group">
                <label className="label">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input" placeholder="contoh@email.com" required />
              </div>
              <div className="form-group">
                <label className="label">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input" placeholder="Minimal 8 karakter" required />
              </div>
              
              <button type="submit" className="btn btn--orange btn--full btn--lg" style={{ marginTop: '1rem' }}>
                Lanjut Pilih Paket <ArrowRight size={18} />
              </button>
              
              <p className="text-center text-muted" style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
                Sudah punya akun? <button type="button" onClick={() => setMode('login')} className="text-teal" style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, padding: 0 }}>Masuk</button>
              </p>
            </form>
          )}

          {/* REGISTER FORM (Step 2 - Tier Selection) */}
          {mode === 'register' && step === 2 && (
            <form onSubmit={handleRegister} className="flex flex-col gap-md animate-fade-in">
              <div className="flex flex-col gap-sm">
                {[1, 2, 3].map(tierId => {
                  const tier = TIERS[tierId];
                  const isSelected = selectedTier === tierId;
                  
                  return (
                    <div 
                      key={tierId}
                      onClick={() => setSelectedTier(tierId)}
                      className="card flex items-center justify-between"
                      style={{ 
                        padding: '1rem 1.5rem', 
                        cursor: 'pointer',
                        border: isSelected ? `2px solid var(--${tier.color})` : '2px solid transparent',
                        background: isSelected ? `rgba(var(--${tier.color}-rgb), 0.05)` : 'var(--bg-deep)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div className="flex items-center gap-md">
                        <div style={{ fontSize: '1.5rem' }}>{tier.icon}</div>
                        <div>
                          <div style={{ fontWeight: 600, color: isSelected ? `var(--${tier.color})` : 'var(--text)' }}>{tier.name}</div>
                          <div className="text-muted" style={{ fontSize: '0.8rem' }}>{tier.courses.length} Course {tierId >= 2 ? '+ Mentorship' : ''}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{tier.priceLabel}</div>
                        {isSelected && <CheckCircle2 size={16} color={`var(--${tier.color})`} style={{ display: 'inline-block', marginTop: '0.2rem' }} />}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex gap-sm" style={{ marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setStep(1)} className="btn btn--ghost text-muted">
                  Kembali
                </button>
                <button type="submit" disabled={loading} className={`btn btn--full btn--lg ${selectedTier === 2 ? 'btn--teal' : selectedTier === 3 ? 'btn--primary' : 'btn--secondary'}`} style={{ flex: 1 }}>
                  {loading ? 'Memproses...' : 'Selesaikan Pembayaran'}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
      
      {/* Mobile specific styles */}
      <style>{`
        @media (max-width: 768px) {
          .auth-page .card {
            grid-template-columns: 1fr !important;
          }
          .auth-page .card > div:first-child {
            display: none !important; /* Hide branding on mobile to save space */
          }
        }
      `}</style>
    </div>
  );
}
