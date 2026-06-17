import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import CoursePlayer from './pages/CoursePlayer';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Route Protection Wrappers
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/dashboard" replace />;
  return children;
};

// Layout for public/marketing pages (with Navbar + Footer)
function PublicLayout() {
  return (
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
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

// Main App Layout Router
function AppLayout() {
  const location = useLocation();
  
  // Learning routes use their own LearningLayout (no Navbar/Footer)
  const isLearningRoute = location.pathname.startsWith('/learn/') || 
    (location.pathname.startsWith('/courses/') && location.pathname.split('/').length > 2);

  if (isLearningRoute) {
    return (
      <Routes>
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/learn/:slug/:moduleId/:lessonId" element={<CoursePlayer />} />
      </Routes>
    );
  }

  return <PublicLayout />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
