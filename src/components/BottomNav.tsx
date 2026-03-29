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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#3a2e28]/20 flex justify-around py-2 shadow-lg">
      {navItems.map(({ path, label, emoji }) => (
        <Link
          key={path}
          href={path}
          className={`flex flex-col items-center text-xs ${location === path ? 'text-[#6bc4b0]' : 'text-[#3a2e28]'}`}
        >
          <span className="text-2xl">{emoji}</span>
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );
}