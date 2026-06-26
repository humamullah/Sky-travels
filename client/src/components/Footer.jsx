import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">✈️</span>
              <span className="text-xl font-bold text-white">Atiq Travel</span>
            </Link>
            <p className="text-slate-400 max-w-md">
              Your trusted partner for unforgettable travel experiences. We specialize in creating
              personalized journeys that turn your dream vacations into reality.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors text-sm">Services</Link></li>
              <li><Link to="/destinations" className="hover:text-white transition-colors text-sm">Destinations</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>info@atiqtravel.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Travel Street, NYC</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-500">
          &copy; {year} Atiq Travel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
