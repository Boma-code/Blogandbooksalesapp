import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AdminDashboard } from './components/AdminDashboard';
import { BookPage } from './components/BookPage';
import { ContactPage } from './components/ContactPage';
import { EssayDetail } from './components/EssayDetail';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotFound } from './components/NotFound';
import { Toaster } from './components/ui/sonner';
import { essayApi, authApi } from './utils/api';
import { toast } from 'sonner@2.0.3';

export type Essay = {
  id: string;
  title: string;
  content: string;
  description: string;
  thumbnail?: string;
  file_url?: string;
  tags: string[];
  views: number;
  created_at: string;
  updated_at: string;
  published: boolean;
};

export type User = {
  id: string;
  email: string;
  isAdmin: boolean;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'admin' | 'book' | 'contact' | 'essay'>('home');
  const [selectedEssayId, setSelectedEssayId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [essays, setEssays] = useState<Essay[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  // Load essays from Supabase on mount
  useEffect(() => {
    loadEssays();
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('access_token');
    const userEmail = localStorage.getItem('user_email');
    const userId = localStorage.getItem('user_id');

    if (token && userEmail && userId) {
      setUser({
        id: userId,
        email: userEmail,
        isAdmin: true,
      });
    }
  };

  const loadEssays = async () => {
    try {
      setLoading(true);
      const data = await essayApi.getAll();
      setEssays(data.essays || []);
    } catch (error) {
      console.error('Error loading essays:', error);
      toast.error('Failed to load essays');
    } finally {
      setLoading(false);
    }
  };

  const navigateTo = (page: 'home' | 'admin' | 'book' | 'contact' | 'essay', essayId?: string) => {
    setCurrentPage(page);
    if (essayId) {
      setSelectedEssayId(essayId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await authApi.login(email, password);
      
      localStorage.setItem('access_token', data.session.access_token);
      localStorage.setItem('user_email', data.user.email);
      localStorage.setItem('user_id', data.user.id);
      
      setUser({
        id: data.user.id,
        email: data.user.email,
        isAdmin: true,
      });
      
      setShowSignup(false);
      navigateTo('admin');
      toast.success('Successfully logged in!');
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
      return false;
    }
  };

  const handleSignup = async (email: string, password: string) => {
    // Signup is handled in SignupPage component
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_id');
    setUser(null);
    navigateTo('home');
    toast.success('Logged out successfully');
  };

  const handleEssayClick = async (essayId: string) => {
    try {
      // Fetch essay to increment view count
      const data = await essayApi.getById(essayId);
      
      // Update local state
      setEssays(prev => prev.map(essay => 
        essay.id === essayId ? data.essay : essay
      ));
      
      navigateTo('essay', essayId);
    } catch (error) {
      console.error('Error loading essay:', error);
      toast.error('Failed to load essay');
    }
  };

  const addOrUpdateEssay = async (essay: Essay) => {
    try {
      const existingEssay = essays.find(e => e.id === essay.id);
      
      if (existingEssay) {
        await essayApi.update(essay.id, essay);
      } else {
        await essayApi.create(essay);
      }
      
      // Reload essays from server
      await loadEssays();
      toast.success('Essay saved successfully!');
    } catch (error: any) {
      console.error('Error saving essay:', error);
      toast.error(error.message || 'Failed to save essay');
    }
  };

  const deleteEssay = async (essayId: string) => {
    try {
      await essayApi.delete(essayId);
      setEssays(prev => prev.filter(e => e.id !== essayId));
      toast.success('Essay deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting essay:', error);
      toast.error(error.message || 'Failed to delete essay');
    }
  };

  const selectedEssay = essays.find(e => e.id === selectedEssayId);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar 
          currentPage={currentPage} 
          onNavigate={navigateTo}
          user={user}
          onLogout={handleLogout}
        />
        
        <main className="flex-1">
          {currentPage === 'home' && (
            <HomePage 
              essays={essays.filter(e => e.published)} 
              onEssayClick={handleEssayClick}
            />
          )}
          
          {currentPage === 'admin' && user?.isAdmin && (
            <AdminDashboard 
              essays={essays}
              onAddOrUpdateEssay={addOrUpdateEssay}
              onDeleteEssay={deleteEssay}
              onEssayClick={handleEssayClick}
            />
          )}
          
          {currentPage === 'admin' && !user?.isAdmin && !showSignup && (
            <LoginPage 
              onLogin={handleLogin} 
              onSwitchToSignup={() => setShowSignup(true)}
            />
          )}
          
          {currentPage === 'admin' && !user?.isAdmin && showSignup && (
            <SignupPage 
              onSignup={handleSignup}
              onSwitchToLogin={() => setShowSignup(false)}
            />
          )}
          
          {currentPage === 'book' && (
            <BookPage />
          )}
          
          {currentPage === 'contact' && (
            <ContactPage />
          )}
          
          {currentPage === 'essay' && selectedEssay && (
            <EssayDetail 
              essay={selectedEssay}
              onBack={() => navigateTo('home')}
            />
          )}
          
          {currentPage === 'essay' && !selectedEssay && (
            <NotFound onGoHome={() => navigateTo('home')} />
          )}
        </main>
        
        <Footer />
        <Toaster />
      </div>
    </ErrorBoundary>
  );
}
