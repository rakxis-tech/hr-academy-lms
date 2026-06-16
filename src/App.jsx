import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';

// Placeholder pages for routing
const PlaceholderPage = ({ title }) => (
  <div className="section container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className="text-center">
      <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>{title}</h1>
      <p className="text-muted">Sedang dalam pengembangan...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Mesh Background — Gradient Blobs */}
        <div className="mesh-bg">
          <div className="blob blob--orange"></div>
          <div className="blob blob--teal"></div>
          <div className="blob blob--cream"></div>
        </div>

        {/* Noise Texture Overlay */}
        <div className="noise-overlay"></div>

        <Navbar />

        {/* Main Content Area */}
        <main style={{ flex: 1, marginTop: 'var(--nav-height)', position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/auth" element={<PlaceholderPage title="Login / Register" />} />
            <Route path="/dashboard" element={<PlaceholderPage title="User Dashboard" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
