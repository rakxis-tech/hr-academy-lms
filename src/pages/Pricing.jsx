import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { TIERS } from '../data/courses';

const FAQ = [
  {
    q: "Apakah ini langganan bulanan?",
    a: "Tidak. Ini adalah pembayaran sekali bayar (one-time payment) untuk satu batch pembelajaran. Anda akan mendapatkan akses ke modul sesuai tier yang dipilih selama masa aktif batch (biasanya 6-12 bulan)."
  },
  {
    q: "Saya masih fresh graduate, cocok pilih tier yang mana?",
    a: "Tier 1 (Foundation) sangat cocok untuk fresh graduate karena mencakup dasar-dasar HR operasional seperti rekrutmen, payroll, dan administrasi."
  },
  {
    q: "Apakah bisa upgrade ke tier lebih tinggi nanti?",
    a: "Bisa. Anda bisa upgrade dari Tier 1 ke Tier 2 atau Tier 3 dengan hanya membayar selisih harganya saja. Progress belajar Anda akan tetap tersimpan."
  },
  {
    q: "Live Zoom-nya diadakan kapan?",
    a: "Live Zoom Class diadakan setiap akhir pekan (Sabtu/Minggu). Jadwal spesifik akan diinformasikan di grup Telegram masing-masing batch."
  },
  {
    q: "Bagaimana sistem Konsultasi 1-on-1?",
    a: "Untuk member Tier 3 (Mastermind), Anda berhak mendapatkan 1 sesi konsultasi privat (60 menit) dengan Dandy via Zoom. Jadwal bisa dibooking sesuai ketersediaan."
  }
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="pricing-page">
      {/* ─── HEADER ─── */}
      <section className="section text-center" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <p className="label text-cream animate-slide-up" style={{ marginBottom: '0.5rem' }}>INVESTASI</p>
          <h1 className="text-gradient animate-slide-up" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>Pilih Paket Belajarmu</h1>
          <p className="text-muted animate-slide-up" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Harga transparan. Tanpa biaya tersembunyi. Akses langsung ke kurikulum HR paling relevan saat ini.
          </p>
        </div>
      </section>

      {/* ─── PRICING CARDS ─── */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="grid grid-3 gap-lg">
            {Object.values(TIERS).map((tier, idx) => (
              <div key={tier.id} className={`card card--tier-${tier.id} animate-slide-up flex flex-col`} style={{ animationDelay: `${idx * 0.1}s`, position: 'relative' }}>
                {tier.id === 2 && (
                  <div style={{
                    position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--teal)', color: '#fff', padding: '0.2rem 1rem', borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem', fontWeight: 'bold', boxShadow: 'var(--shadow-glow-teal)'
                  }}>
                    PALING POPULER
                  </div>
                )}
                
                <div className="text-center" style={{ marginBottom: '2rem', marginTop: tier.id === 2 ? '1rem' : '0' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{tier.icon}</div>
                  <h3 className="font-display" style={{ color: `var(--${tier.color})`, fontSize: '1.5rem', marginBottom: '0.5rem' }}>{tier.name}</h3>
                  <div className="font-display" style={{ fontSize: '2.5rem', color: 'var(--text)' }}>
                    {tier.priceLabel}
                  </div>
                  <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Sekali bayar per batch</p>
                </div>
                
                <ul className="flex flex-col gap-sm" style={{ flex: 1, marginBottom: '2.5rem' }}>
                  <li style={{ fontWeight: 600, borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                    Akses Materi:
                  </li>
                  <li className="flex items-start gap-sm text-muted">
                    <CheckCircle2 size={18} className={`text-${tier.color}`} style={{ flexShrink: 0, marginTop: '2px' }} /> 
                    <span><strong>{tier.courses.length} Courses</strong> akses penuh</span>
                  </li>
                  <li className="flex items-start gap-sm text-muted">
                    <CheckCircle2 size={18} className={`text-${tier.color}`} style={{ flexShrink: 0, marginTop: '2px' }} /> 
                    <span>Video on-demand & quiz</span>
                  </li>
                  
                  <li style={{ fontWeight: 600, borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '0.5rem', marginTop: '1rem' }}>
                    Interaksi & Mentorship:
                  </li>
                  <li className={`flex items-start gap-sm ${tier.id < 2 ? 'text-muted opacity-50' : 'text-muted'}`}>
                    <CheckCircle2 size={18} className={tier.id < 2 ? 'text-muted' : `text-${tier.color}`} style={{ flexShrink: 0, marginTop: '2px' }} /> 
                    <span>Live Zoom Class {tier.id >= 2 ? (tier.id === 2 ? '(2x/bln)' : '(4x/bln)') : '(Tidak Ada)'}</span>
                  </li>
                  <li className={`flex items-start gap-sm ${tier.id < 3 ? 'text-muted opacity-50' : 'text-muted'}`}>
                    <CheckCircle2 size={18} className={tier.id < 3 ? 'text-muted' : `text-${tier.color}`} style={{ flexShrink: 0, marginTop: '2px' }} /> 
                    <span>Konsultasi 1-on-1 {tier.id >= 3 ? '(1x Sesi 60m)' : '(Tidak Ada)'}</span>
                  </li>

                  <li style={{ fontWeight: 600, borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '0.5rem', marginTop: '1rem' }}>
                    AI & Komunitas:
                  </li>
                  <li className="flex items-start gap-sm text-muted">
                    <CheckCircle2 size={18} className={`text-${tier.color}`} style={{ flexShrink: 0, marginTop: '2px' }} /> 
                    <span>AI Chatbot Assistant {tier.id >= 2 ? 'Full Akses' : '(Basic Q&A)'}</span>
                  </li>
                  <li className="flex items-start gap-sm text-muted">
                    <CheckCircle2 size={18} className={`text-${tier.color}`} style={{ flexShrink: 0, marginTop: '2px' }} /> 
                    <span>Sertifikat Digital {tier.id >= 3 ? '+ Fisik' : ''}</span>
                  </li>
                  <li className="flex items-start gap-sm text-muted">
                    <CheckCircle2 size={18} className={`text-${tier.color}`} style={{ flexShrink: 0, marginTop: '2px' }} /> 
                    <span>Telegram Community {tier.id >= 3 ? '(Priority)' : ''}</span>
                  </li>
                </ul>
                
                <Link to="/auth?mode=register" className={`btn btn--lg btn--full ${tier.id === 2 ? 'btn--teal' : tier.id === 3 ? 'btn--primary' : 'btn--secondary'}`}>
                  Daftar {tier.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section" style={{ background: 'var(--bg-deep)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem' }}>Frequently Asked <span className="text-orange">Questions</span></h2>
          </div>

          <div className="flex flex-col gap-md">
            {FAQ.map((item, idx) => (
              <div 
                key={idx} 
                className="card" 
                style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
              >
                <div className="flex justify-between items-center">
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{item.q}</h4>
                  <div style={{ color: 'var(--orange)', transform: openFaq === idx ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.3s ease', fontSize: '1.5rem' }}>+</div>
                </div>
                {openFaq === idx && (
                  <p className="text-muted animate-fade-in" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', lineHeight: 1.6 }}>
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ENTERPRISE BANNER ─── */}
      <section className="section text-center">
        <div className="container">
          <div className="card card--cream" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏢</div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Butuh untuk Tim / Perusahaan?</h3>
            <p className="text-muted" style={{ marginBottom: '2rem' }}>Kami menyediakan paket B2B In-House Training dengan dashboard analytics khusus untuk memantau progress belajar karyawan Anda.</p>
            <a href="mailto:hello@obrakabrik.id" className="btn btn--secondary btn--lg">
              Hubungi Kami untuk B2B
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
