import { Link, useLocation } from 'wouter';

const navItems = [
  { path: '/', label: 'Home', emoji: '🏠' },
  { path: '/fusion', label: 'Fuse', emoji: '🧪' },
  { path: '/deck', label: 'Deck', emoji: '🃏' },
  { path: '/battle', label: 'Battle', emoji: '⚔️' },
  { path: '/book', label: 'Book', emoji: '📖' },
];

export default function BottomNav() {
  const [location] = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#fff7e8] border-t border-[#3a2e28]/10 shadow-[0_-4px_12px_-2px_rgba(0,0,0,0.1)] neu py-1 z-50">
      <div className="flex justify-around items-center">
        {navItems.map(({ path, label, emoji }) => {
          const isActive = location === path;
          return (
            <Link
              key={path}
              href={path}
              className={`flex flex-col items-center py-2 px-4 rounded-3xl transition-all duration-200 flex-1 ${
                isActive
                  ? 'text-[#6bc4b0] bg-white neu-inset scale-105'
                  : 'text-[#3a2e28] hover:text-[#6bc4b0]'
              }`}
            >
              <span className={`text-3xl mb-1 transition-transform ${isActive ? 'scale-110' : ''}`}>
                {emoji}
              </span>
              <span className={`text-[10px] font-medium tracking-wider ${isActive ? 'font-semibold' : ''}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}