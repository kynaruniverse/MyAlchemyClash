import { useGame } from '../contexts/GameContext';
import { Element } from '../lib/gameData';

export default function Book() {
  const { elements, discovered } = useGame();

  const grouped = elements.reduce((acc: { [key: string]: Element[] }, el) => {
    if (!acc[el.category]) acc[el.category] = [];
    acc[el.category].push(el);
    return acc;
  }, {});

  return (
    <div className="flex-1 p-4 overflow-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Alchemy Book</h2>
      {Object.entries(grouped).map(([cat, els]) => (
        <div key={cat} className="mb-8">
          <h3 className="text-xl font-medium mb-3 border-b pb-2">{cat}</h3>
          <div className="grid grid-cols-2 gap-4">
            {els.map(el => (
              <div key={el.id} className={`p-4 rounded-3xl flex items-center gap-4 ${discovered.has(el.id) ? 'bg-white shadow' : 'bg-white/50 opacity-40'}`}>
                <span className="text-5xl">{el.emoji}</span>
                <div>
                  <div className="font-medium">{el.name}</div>
                  <div className="text-xs">Tier {el.tier}</div>
                </div>
                {discovered.has(el.id) && <span className="ml-auto text-2xl">✅</span>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}