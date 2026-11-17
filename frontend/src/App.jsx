import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/useAuth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Dashboard from './pages/Dashboard';
import ListingForm from './pages/ListingForm';
import Auth from './pages/Auth';

function ProtectedRoute({ children, requireRole }) {
  const { user, profile, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center p-6 text-soft">Loading…</div>;
  if (!user) return <Navigate to="/" replace />;
  if (requireRole && profile?.role !== requireRole) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar onLogin={() => setShowAuthModal(true)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route
            path="/auth"
            element={
              <div className="min-h-screen flex items-center justify-center bg-sand-5">
                <Auth onClose={() => setShowAuthModal(false)} />
              </div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sell"
            element={
              <ProtectedRoute requireRole="senior">
                <ListingForm />
              </ProtectedRoute>
            }
          />
        </Routes>

        {showAuthModal && (
          <Auth onClose={() => setShowAuthModal(false)} />
        )}

        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
