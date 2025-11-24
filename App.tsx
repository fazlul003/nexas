import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MockDB } from './services/mockDb';
import { SiteSettings, User, CartItem, Product, UserRole } from './types';

// Pages - Public
import Home from './pages/public/Home';
import ProductDetail from './pages/public/ProductDetail';
import Cart from './pages/public/Cart';
import Checkout from './pages/public/Checkout';
import Blog from './pages/public/Blog';

// Pages - Admin
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminSettings from './pages/admin/Settings';
import AdminChangePassword from './pages/admin/ChangePassword';

// Layouts
import PublicLayout from './components/PublicLayout';
import AdminLayout from './components/AdminLayout';

// --- Global Context ---
interface AppContextType {
  settings: SiteSettings;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  refreshSettings: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

// --- Main App Component ---
const App: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(MockDB.getSettings());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for logged in user session
    const storedUser = localStorage.getItem('ams_session');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Dynamic Theme Application
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', settings.primaryColor);
    document.title = settings.siteName;
  }, [settings]);

  const refreshSettings = () => {
    setSettings(MockDB.getSettings());
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const login = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('ams_session', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ams_session');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <AppContext.Provider value={{ settings, cart, addToCart, removeFromCart, clearCart, user, login, logout, refreshSettings }}>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/product/:slug" element={<PublicLayout><ProductDetail /></PublicLayout>} />
          <Route path="/cart" element={<PublicLayout><Cart /></PublicLayout>} />
          <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/admin/change-password" element={
            user && user.requiresPasswordChange ? <AdminChangePassword /> : <Navigate to="/admin/login" />
          } />

          <Route path="/admin/*" element={
            <ProtectedRoute user={user}>
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </HashRouter>
    </AppContext.Provider>
  );
};

// Route Guard
const ProtectedRoute = ({ user, children }: { user: User | null, children: React.ReactNode }) => {
  const location = useLocation();
  
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (user.requiresPasswordChange) {
    return <Navigate to="/admin/change-password" replace />;
  }

  return <>{children}</>;
};

export default App;