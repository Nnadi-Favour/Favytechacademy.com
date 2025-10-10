import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, ClipboardList, BarChart3, User, Globe, Menu, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { useState } from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  const { translations, language, setLanguage } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: translations.home, path: '/', icon: Home },
    { name: translations.dashboard, path: '/dashboard', icon: LayoutDashboard },
    { name: translations.planner, path: '/planner', icon: ClipboardList },
    { name: translations.analytics, path: '/analytics', icon: BarChart3 },
    { name: translations.profile, path: '/profile', icon: User },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation Bar */}
      <nav className="bg-[#1E3A8A] text-white sticky top-0 z-50 shadow-lg" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center">
                  <span className="sr-only">EduTech Dashboard</span>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="hidden sm:block">EduTech Dashboard</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                      isActive(item.path)
                        ? 'bg-[#10B981] text-white'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Language Selector and Mobile Menu Button */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
                aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">{language === 'en' ? 'EN' : 'FR'}</span>
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-white/10">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-3 rounded-md mt-2 transition-colors ${
                      isActive(item.path)
                        ? 'bg-[#10B981] text-white'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main role="main">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="mb-4">EduTech Dashboard</h3>
              <p className="text-gray-400 text-sm">
                Empowering educators in emerging markets with AI literacy tools.
              </p>
            </div>
            <div>
              <h3 className="mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:support@edutech.org" className="text-gray-400 hover:text-white transition-colors">support@edutech.org</a></li>
                <li><a href="tel:+233123456789" className="text-gray-400 hover:text-white transition-colors">+233 123 456 789</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>&copy; 2025 EduTech Dashboard. Designed for 50+ educators, boosted engagement 25% via user testing.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
