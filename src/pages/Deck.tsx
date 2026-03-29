import { useGame } from '../contexts/GameContext';

export default function Deck() {
  const { cards, unlockedCards, currentDeck, addToDeck, removeFromDeck, decks, currentDeckIndex, switchDeck, upgrades, upgradeCard, essence } = useGame();

  const collection = cards.filter(c => unlockedCards.has(c.id));

  const getCardStats = (card: any) => {
    const level = upgrades[card.id] || 0;
    let power = card.power + level;
    let cost = card.cost;
    if (level >= 3) cost = Math.max(1, cost - 1);
    if (level >= 6) cost = Math.max(1, cost - 1);
    return { power, cost, level };
  };

  const deckStats = {
    size: currentDeck.length,
    avgCost: currentDeck.length 
      ? (currentDeck.reduce((sum, id) => {
          const card = cards.find(c => c.id === id)!;
          const stats = getCardStats(card);
          return sum + stats.cost;
        }, 0) / currentDeck.length).toFixed(1) 
      : '0.0',
    totalPower: currentDeck.reduce((sum, id) => {
      const card = cards.find(c => c.id === id)!;
      const stats = getCardStats(card);
      return sum + stats.power;
    }, 0)
  };

  return (
    <div className="flex-1 p-4 flex flex-col bg-[#fff7e8]">
      <h2 className="text-3xl font-bold text-center mb-4">Deck Builder</h2>

      {/* Deck selector */}
      <div className="flex gap-1 mb-6 bg-white rounded-3xl p-1 neu">
        {decks.map((_, i) => (
          <button
            key={i}
            onClick={() => switchDeck(i)}
            className={`flex-1 py-3 text-sm font-medium rounded-3xl transition-all ${
              currentDeckIndex === i 
                ? 'bg-[#6bc4b0] text-white neu-inset' 
                : 'bg-transparent'
            }`}
          >
            Deck {i + 1}
          </button>
        ))}
      </div>

      {/* Stats bar - exactly as GDD requires */}
      <div className="flex gap-2 text-sm mb-4">
        <div className="flex-1 bg-white rounded-3xl p-3 text-center neu">Cards: {deckStats.size}/14</div>
        <div className="flex-1 bg-white rounded-3xl p-3 text-center neu">Avg {deckStats.avgCost}🔥</div>
        <div className="flex-1 bg-white rounded-3xl p-3 text-center neu">Total {deckStats.totalPower}⚔️</div>
        <div className="flex-1 bg-white rounded-3xl p-3 text-center neu">Essence: {essence}</div>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Collection */}
        <div className="flex-1 border-r border-[#3a2e28]/10 pr-4 overflow-auto">
          <h3 className="text-sm mb-3">Collection</h3>
          {collection.map(card => {
            const stats = getCardStats(card);
            return (
              <div
                key={card.id}
                className="flex justify-between items-center bg-white rounded-3xl shadow p-4 mb-3 neu cursor-pointer active:scale-95"
                onClick={() => addToDeck(card.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{card.emoji}</span>
                  <div>
                    <div className="font-medium">{card.name}</div>
                    <div className="text-xs text-[#6bc4b0]">{card.rarity} • Lv.{stats.level}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">{stats.cost}🔥</div>
                  <div className="text-xl">{stats.power}⚔️</div>
                  <button
                    onClick={e => { e.stopPropagation(); upgradeCard(card.id); }}
                    className="text-xs mt-1 bg-[#f5b642] text-white px-3 py-1 rounded-2xl"
                  >
                    Upgrade
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Current Deck */}
        <div className="flex-1 overflow-auto">
          <h3 className="text-sm mb-3">Deck {currentDeckIndex + 1}</h3>
          {currentDeck.map((id, i) => {
            const card = cards.find(c => c.id === id)!;
            const stats = getCardStats(card);
            return (
              <div
                key={i}
                onClick={() => removeFromDeck(id)}
                className="flex justify-between items-center bg-white rounded-3xl shadow p-4 mb-3 neu cursor-pointer active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{card.emoji}</span>
                  <span className="font-medium">{card.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">{stats.cost}🔥</div>
                  <div className="text-xl">{stats.power}⚔️</div>
                </div>
              </div>
            );
          })}
          {currentDeck.length === 0 && (
            <div className="text-center text-[#3a2e28]/40 py-12">Tap cards from left to add</div>
          )}
        </div>
      </div>
    </div>
  );
}