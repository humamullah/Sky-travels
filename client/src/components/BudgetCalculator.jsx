import { useState } from 'react';
import { Wallet, Bed, UtensilsCrossed, Car, Target, Package } from 'lucide-react';

const defaultPrices = {
  accommodation: 50,
  food: 25,
  transport: 40,
  activities: 30,
  misc: 20,
};

export default function BudgetCalculator({ budgetRange }) {
  const [days, setDays] = useState(5);
  const [prices, setPrices] = useState(defaultPrices);

  const updatePrice = (key, value) => {
    setPrices((prev) => ({ ...prev, [key]: Math.max(0, value) }));
  };

  const totalPerDay = Object.values(prices).reduce((a, b) => a + Number(b), 0);
  const totalTrip = totalPerDay * days;

  const suggestedMin = budgetRange?.min || 200;
  const suggestedMax = budgetRange?.max || 600;

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
        <h3 className="text-white font-bold flex items-center gap-2">
          <Wallet className="w-5 h-5" /> Budget Calculator
        </h3>
        <p className="text-primary-100 text-sm mt-0.5">
          Estimate your trip cost for this destination
        </p>
      </div>

      <div className="p-6 space-y-5">
        <div>
          <label className="flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            <span>Duration</span>
            <span className="text-primary-600 dark:text-primary-400 font-bold">{days} days</span>
          </label>
          <input
            type="range"
            min={1}
            max={30}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>1 day</span>
            <span>30 days</span>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { key: 'accommodation', label: 'Accommodation', icon: Bed, def: 50 },
            { key: 'food', label: 'Food & Drinks', icon: UtensilsCrossed, def: 25 },
            { key: 'transport', label: 'Local Transport', icon: Car, def: 40 },
            { key: 'activities', label: 'Activities', icon: Target, def: 30 },
            { key: 'misc', label: 'Miscellaneous', icon: Package, def: 20 },
          ].map((item) => (
            <div key={item.key}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-slate-600 dark:text-slate-400 inline-flex items-center gap-1.5">{item.icon && <item.icon className="w-4 h-4" />}{item.label}</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  ${Number(prices[item.key]).toLocaleString()}/day
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={200}
                value={prices[item.key]}
                onChange={(e) => updatePrice(item.key, Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Per day cost</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              ${totalPerDay.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-base">
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              Total for {days} days
            </span>
            <span className="font-extrabold text-primary-600 dark:text-primary-400 text-lg">
              ${totalTrip.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-xs text-slate-400 pt-1">
            <span>Suggested budget: ${suggestedMin} - ${suggestedMax}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
