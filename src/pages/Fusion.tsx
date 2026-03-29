import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { Element, getFusionResult } from '../lib/gameData';

const categories = ['Base', 'Nature', 'Materials', 'Life', 'Magic', 'Advanced'] as const;

export default function Fusion() {
  const { elements, discovered, addDiscovery, level, updateQuestProgress } = useGame();
  const [leftCat, setLeftCat] = useState('Base');
  const [rightCat, setRightCat] = useState('Base');
  const [slot, setSlot] = useState<Element | null>(null);
  const [message, setMessage] = useState('');
  const [recent, setRecent] = useState<Element[]>([]);

  // GDD: only show unlocked categories based on player level
  const leftElements = elements.filter(e => 
    e.category === leftCat && 
    discovered.has(e.id) && 
    (leftCat !== 'Magic' || level >= 5) && 
    (leftCat !== 'Advanced' || level >= 10)
  );
  const rightElements = elements.filter(e => 
    e.category === rightCat && 
    discovered.has(e.id) && 
    (rightCat !== 'Magic' || level >= 5) && 
    (rightCat !== 'Advanced' || level >= 10)
  );

  const handleDropFirst = (el: Element) => setSlot(el);

  const handleDropSecond = (el: Element) => {
    if (!slot) return;
    const resultId = getFusionResult(slot.id, el.id);
    if (resultId) {
      const wasNew = !discovered.has(resultId);
      addDiscovery(resultId);
      updateQuestProgress('fuse', 1);
      const newEl = elements.find(e => e.id === resultId);
      if (newEl) setRecent(prev => [newEl, ...prev.slice(0, 7)]);
      setMessage(wasNew ? `🎉 NEW! ${newEl?.name}` : `✅ ${newEl?.name}`);
    } else {
      setMessage('❌ No recipe');
    }
    setSlot(null);
    setTimeout(() => setMessage(''), 2200);
  };

  return (
    <div className="flex-1 p-4 flex flex-col bg-[#fff7e8]">
      <h2 className="text-3xl font-bold text-center mb-4">Fusion Lab</h2>

      <div className="flex gap-4 mb-4">
        <select 
          value={leftCat} 
          onChange={e => setLeftCat(e.target.value)} 
          className="flex-1 p-3 rounded-2xl border bg-white text-[#3a2e28] neu"
        >
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select 
          value={rightCat} 
          onChange={e => setRightCat(e.target.value)} 
          className="flex-1 p-3 rounded-2xl border bg-white text-[#3a2e28] neu"
        >
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4 overflow-auto">
        {/* Left column */}
        <div>
          {leftElements.map(el => (
            <div
              key={el.id}
              onClick={() => handleDropFirst(el)}
              className="p-4 bg-white rounded-3xl shadow flex items-center gap-3 mb-3 cursor-grab active:scale-95 neu"
            >
              <span className="text-4xl">{el.emoji}</span>
              <span className="font-medium">{el.name}</span>
            </div>
          ))}
        </div>

        {/* Central slot – exact GDD layout */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            className={`w-32 h-32 rounded-3xl border-4 border-dashed flex items-center justify-center text-7xl transition-all neu-inset ${
              slot ? 'bg-[#6bc4b0]/10 border-[#6bc4b0] shadow-inner' : 'bg-white'
            }`}
            animate={slot ? { scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] } : {}}
            onClick={() => setSlot(null)}
          >
            {slot ? slot.emoji : '🧪'}
          </motion.div>
          <p className="text-xs mt-3 text-center">Drag first element here</p>
        </div>

        {/* Right column */}
        <div>
          {rightElements.map(el => (
            <div
              key={el.id}
              onClick={() => slot && handleDropSecond(el)}
              className="p-4 bg-white rounded-3xl shadow flex items-center gap-3 mb-3 cursor-grab active:scale-95 neu"
            >
              <span className="text-4xl">{el.emoji}</span>
              <span className="font-medium">{el.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent fusions – GDD exact */}
      <div className="mt-6">
        <h3 className="text-sm mb-2">Recent</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {recent.map(el => (
            <div key={el.id} className="flex-shrink-0 text-center">
              <span className="text-4xl block">{el.emoji}</span>
              <span className="text-xs">{el.name}</span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white px-8 py-4 rounded-3xl shadow-2xl text-2xl neu"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}