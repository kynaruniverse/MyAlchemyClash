import { useGame } from '../contexts/GameContext';
import { Element } from '../lib/gameData';

export default function Book() {
  const { elements, discovered, level } = useGame();

  const grouped = elements.reduce((acc: { [key: string]: Element[] }, el) => {
    if (!acc[el.category]) acc[el.category] = [];
    acc[el.category].push(el);
    return acc;
  }, {});

  return (
    <div className="flex-1 p-4 overflow-auto bg-[#fff7e8]">
      <h2 className="text-3xl font-bold text-center mb-6">Alchemy Book</h2>
      <div className="text-center text-sm mb-6 neu-inset bg-white rounded-3xl py-3 px-6">
        Level {level} • Categories unlocked
      </div>

      {Object.entries(grouped).map(([cat, els]) => {
        const isLocked = (cat === 'Magic' && level < 5) || (cat === 'Advanced' && level < 10);
        return (
          <div key={cat} className="mb-8">
            <h3 className="text-xl font-medium mb-3 border-b pb-2 flex items-center gap-2">
              {cat}
              <span className="text-lg">
                {isLocked ? '🔒' : '✅'}
              </span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {els.map(el => {
                const isDiscovered = discovered.has(el.id);
                return (
                  <div
                    key={el.id}
                    className={`p-4 rounded-3xl flex items-center gap-4 neu ${
                      isDiscovered ? 'bg-white shadow' : 'bg-white/50 opacity-40'
                    }`}
                  >
                    <span className="text-5xl">{el.emoji}</span>
                    <div className="flex-1">
                      <div className="font-medium">{el.name}</div>
                      <div className="text-xs">Tier {el.tier}</div>
                    </div>
                    {isDiscovered && <span className="text-2xl">✅</span>}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}