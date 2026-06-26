import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, ChevronDown, Check } from 'lucide-react';

const destinations = [
  { value: 'swat', label: 'Swat' },
  { value: 'kumrat', label: 'Kumrat' },
  { value: 'naran', label: 'Naran' },
  { value: 'chitral', label: 'Chitral' },
  { value: 'malam-jabba', label: 'Malam Jabba' },
  { value: 'skardu', label: 'Skardu' },
  { value: 'hunza', label: 'Hunza' },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = destinations.find((d) => d.value === selectedDestination)?.label || 'Select Destination';

  const handleFindTours = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedDestination) params.set('destination', selectedDestination);
    if (selectedDate) params.set('date', selectedDate);
    if (searchQuery) params.set('search', searchQuery);
    navigate(`/tours?${params.toString()}`);
  };

  return (
    <section className="relative h-[100vh] flex items-end overflow-hidden pb-4 md:pb-12">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="horse-in-meadow.png"
          alt="KPK Mountain Landscape"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 flex flex-col items-center text-center">
        <div className="max-w-3xl mb-8">
          <p className="text-white/60 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Explore Pakistan
          </p>
          <h1 className="font-heading text-[2rem] sm:text-4xl md:text-7xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-3">
            EXPLORE<br />BEAUTIFUL PAKISTAN!
          </h1>
          <h2 className="font-heading text-lg sm:text-xl md:text-2xl font-extrabold text-primary-400 mb-2">
            BOOK YOUR LOCAL TOURS TODAY.
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Discover the breathtaking beauty of Pakistan with our curated tour packages.
          </p>
        </div>

        {/* Search & Filter Widget */}
        <form onSubmit={handleFindTours} className="w-full max-w-3xl">
          <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 p-2 flex flex-col sm:flex-row gap-2">
            {/* Destination Dropdown */}
            <div className="relative flex-1" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors text-left"
              >
                <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Destination</p>
                  <p className={`text-sm font-semibold truncate ${selectedDestination ? 'text-slate-900' : 'text-slate-400'}`}>
                    {selectedLabel}
                  </p>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 max-h-72 overflow-y-auto">
                  <div className="px-3 py-1.5">
                    <input
                      type="text"
                      placeholder="Search destinations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      autoFocus
                    />
                  </div>
                  {destinations
                    .filter((d) => d.label.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((dest) => (
                      <button
                        key={dest.value}
                        type="button"
                        onClick={() => {
                          setSelectedDestination(dest.value);
                          setDropdownOpen(false);
                          setSearchQuery('');
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-primary-50 transition-colors ${
                          selectedDestination === dest.value ? 'bg-primary-50 text-primary-700' : 'text-slate-700'
                        }`}
                      >
                        <MapPin className="w-4 h-4 text-primary-500" />
                        <span className="font-medium">{dest.label}</span>
                        {selectedDestination === dest.value && (
                          <Check className="w-4 h-4 text-primary-600 ml-auto" />
                        )}
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* Date Picker */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 sm:bg-transparent border border-slate-200 sm:border-0">
              <Calendar className="w-5 h-5 text-primary-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</p>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full text-sm font-semibold text-slate-900 bg-transparent border-0 p-0 focus:outline-none focus:ring-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60"
                />
              </div>
            </div>

            {/* Find Tours Button */}
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-200 shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50 text-sm sm:text-base whitespace-nowrap"
            >
              Find Tours
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
