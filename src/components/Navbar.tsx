import { Menu, X, BookOpen, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import type { User } from '../App';

type NavbarProps = {
  currentPage: string;
  onNavigate: (page: 'home' | 'admin' | 'book' | 'contact') => void;
  user: User | null;
  onLogout: () => void;
};

export function Navbar({ currentPage, onNavigate, user, onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', page: 'home' as const },
    { name: 'Upload Essay', page: 'admin' as const },
    { name: 'My Book', page: 'book' as const },
    { name: 'Contact', page: 'contact' as const },
  ];

  const handleNavigate = (page: 'home' | 'admin' | 'book' | 'contact') => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50 border-b border-yellow-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <BookOpen className="w-6 h-6 text-yellow-500" />
            <span className="text-xl text-white">Colin Stanley</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`transition-colors hover:text-yellow-500 ${
                  currentPage === item.page ? 'text-yellow-500' : 'text-white'
                }`}
              >
                {item.name}
              </button>
            ))}
            
            {user && (
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="border-yellow-600 text-yellow-500 hover:bg-yellow-600 hover:text-black"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-yellow-500 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-yellow-600">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`block w-full text-left py-3 px-4 transition-colors hover:bg-yellow-600 hover:text-black ${
                  currentPage === item.page ? 'text-yellow-500' : 'text-white'
                }`}
              >
                {item.name}
              </button>
            ))}
            
            {user && (
              <button
                onClick={onLogout}
                className="block w-full text-left py-3 px-4 text-yellow-500 hover:bg-yellow-600 hover:text-black transition-colors"
              >
                <LogOut className="w-4 h-4 inline mr-2" />
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
