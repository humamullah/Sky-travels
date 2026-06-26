import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Plane, MessageCircle } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/destinations', label: 'Destinations' },
  { path: '/tours', label: 'Packages' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-primary-600 shadow-xl shadow-primary-600/20'
          : 'bg-primary-600/95 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Plane className="w-5 h-5 md:w-6 md:h-6 text-white -rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg md:text-xl font-extrabold text-white leading-none tracking-tight">
                Star Walkers
              </span>
              <span className="text-[9px] md:text-[10px] font-medium text-white/70 tracking-[0.12em] uppercase leading-none mt-0.5">
                Tours & Travel
              </span>
            </div>
          </Link>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-1.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-white text-primary-600 shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right CTA */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/923369169265"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-2.5 px-5 rounded-lg transition-all duration-200 shadow-lg shadow-[#25D366]/30 text-sm"
            >
              <MessageCircle className="w-5 h-5" />
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-semibold opacity-90">Book Now</span>
                <span className="text-xs font-bold">+92 336 9169265</span>
              </div>
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center text-white hover:bg-white/25 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-white/10 bg-primary-700 px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href="https://wa.me/923369169265"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-3 px-4 rounded-xl mt-3 text-sm"
          >
            <MessageCircle className="w-5 h-5" />
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-semibold opacity-90">Book Now</span>
              <span className="text-xs font-bold">+92 336 9169265</span>
            </div>
          </a>
        </div>
      </div>
    </nav>
  );
}
