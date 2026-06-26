import { Link } from 'react-router-dom';
import { Plane, Mail, Phone, MapPin } from 'lucide-react';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Destinations', path: '/destinations' },
  { label: 'Packages', path: '/tours' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 md:py-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
                <Plane className="w-5 h-5 text-white -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-extrabold text-white leading-tight">Star Walkers</span>
                <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase leading-tight">Tours & Travel</span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-md text-sm">
              Your trusted partner for unforgettable travel experiences across Pakistan. We specialize in creating
              personalized journeys that turn your dream vacations into reality.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="font-heading text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="font-heading text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-500" />
                info@starwalkers.pk
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-500" />
                +92 336 9169265
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary-500 mt-0.5" />
                <span>Peshawar, Khyber Pakhtunkhwa, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
          &copy; {year} Star Walkers Tours & Travel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
