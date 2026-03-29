import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { Card } from '../lib/gameData';

export default function Battle() {
  const { currentDeck, cards, addEssence, upgrades, addBattleWin } = useGame();
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [lanes, setLanes] = useState<any[]>(Array(4).fill({ player: null, opponent: null, playerPower: 0, opponentPower: 0 }));
  const [energy, setEnergy] = useState(6);
  const [phase, setPhase] = useState<'placement' | 'reveal' | 'resolved'>('placement');
  const [result, setResult] = useState<'win' | 'lose' | null>(null);
  const [message, setMessage] = useState('');
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (currentDeck.length < 3) return;
    const shuffled = [...currentDeck].sort(() => Math.random() - 0.5);
    const handCards = shuffled.slice(0, 6).map(id => {
      const base = cards.find(c => c.id === id)!;
      const level = upgrades[id] || 0;
      let power = base.power + level; let cost = base.cost;
      if (level >= 3) cost = Math.max(1, cost - 1); if (level >= 6) cost = Math.max(1, cost - 1);
      return { ...base, power, cost } as Card;
    });
    setPlayerHand(handCards);
    setLanes(Array(4).fill({ player: null, opponent: null, playerPower: 0, opponentPower: 0 }));
    setEnergy(6); setPhase('placement'); setResult(null); setMessage(''); setConfetti(false);
  }, [currentDeck, cards, upgrades]);

  const playCard = (card: Card, laneIndex: number) => {
    if (phase !== 'placement' || energy < card.cost || lanes[laneIndex].player) return;
    const newLanes = [...lanes]; newLanes[laneIndex].player = card;
    setLanes(newLanes); setPlayerHand(prev => prev.filter(c => c.id !== card.id));
    setEnergy(prev => prev - card.cost);
  };

  const endTurn = () => {
    if (phase !== 'placement') return;
    const aiLanes = [...lanes]; let aiEnergy = 6;
    const aiCards = [
      { id: 'golem', name: 'Golem', emoji: '🪨', cost: 4, power: 3 },
      { id: 'firebolt', name: 'Firebolt', emoji: '🔥', cost: 2, power: 5 },
      { id: 'thunderhawk', name: 'Thunder Hawk', emoji: '🦅', cost: 2, power: 4 }
    ] as Card[];
    aiCards.sort((a, b) => b.power - a.power);
    aiCards.forEach(card => {
      for (let i = 0; i < 4; i++) {
        if (!aiLanes[i].opponent && aiEnergy >= card.cost) {
          aiLanes[i].opponent = card; aiEnergy -= card.cost; break;
        }
      }
    });
    setLanes(aiLanes); setPhase('reveal'); setTimeout(() => revealPhase(aiLanes), 800);
  };

  const revealPhase = (finalLanes: any[]) => {
    setPhase('resolved');
    let playerWins = 0;
    const processed = finalLanes.map(lane => {
      let p = lane.player ? lane.player.power : 0; let o = lane.opponent ? lane.opponent.power : 0;
      if (lane.player?.abilityType === 'onReveal') {
        if (lane.player.id === 'firebolt' || lane.player.id === 'seaserpent') o -= lane.player.abilityValue!;
        if (lane.player.id === 'thunderhawk') o -= lane.player.abilityValue!;
      }
      if (lane.player?.abilityType === 'passive') {
        if (lane.player.id === 'golem') p = Math.max(p, lane.player.abilityValue!);
        if (lane.player.id === 'forestguardian') p += lane.player.abilityValue!;
      }
      if (p > o) playerWins++;
      return { ...lane, playerPower: p, opponentPower: o };
    });
    setLanes(processed);
    const isWin = playerWins >= 3;
    setResult(isWin ? 'win' : 'lose');
    setMessage(isWin ? '🎉 Victory +10' : 'Defeat +2');
    addEssence(isWin ? 10 : 2);
    if (isWin) { addBattleWin(); setConfetti(true); }
  };

  const resetBattle = () => { setPhase('placement'); setResult(null); setMessage(''); setConfetti(false); };

  return (
    <div className="flex-1 p-4 flex flex-col bg-[#fff7e8]">
      <h2 className="text-3xl font-bold text-center mb-4">Battle</h2>
      <div className="flex justify-between mb-4"><div className="flex items-center gap-3"><span className="text-5xl">🤖</span><div>AI</div></div></div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {lanes.map((lane, i) => (
          <motion.div key={i} className={`aspect-square border-2 border-[#6bc4b0]/30 rounded-3xl bg-white flex flex-col items-center justify-center relative ${phase === 'resolved' && lane.playerPower > lane.opponentPower ? 'shadow-[0_0_20px_#f5b642]' : ''}`} animate={phase === 'reveal' ? { rotateY: 180 } : {}} transition={{ duration: 0.6 }}>
            {lane.opponent && <div className="text-6xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{lane.opponent.emoji}</div>}
            {lane.player && <div className="text-6xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{lane.player.emoji}</div>}
            <div className="absolute top-2 text-xs font-bold">{i+1}</div>
            {phase === 'resolved' && (
              <div className="absolute bottom-1 flex gap-2 text-xs">
                <span className={lane.playerPower > lane.opponentPower ? 'text-green-500 font-bold' : ''}>{lane.playerPower}</span>
                <span className={lane.playerPower < lane.opponentPower ? 'text-red-500 font-bold' : ''}>{lane.opponentPower}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <div className="text-center text-sm mb-4">{phase === 'placement' && `Energy: ${energy}`}{phase === 'reveal' && 'Revealing...'}{phase === 'resolved' && (result === 'win' ? 'WIN' : 'LOSE')}</div>
      <div className="flex-1 overflow-x-auto flex gap-3 pb-4">
        {playerHand.map(card => (
          <motion.div key={card.id} onClick={() => { const idx = lanes.findIndex(l => !l.player); if (idx !== -1) playCard(card, idx); }} className="flex-shrink-0 w-20 bg-white rounded-3xl shadow p-2 flex flex-col items-center cursor-pointer active:scale-95">
            <span className="text-5xl mb-1">{card.emoji}</span><div className="text-xs">{card.cost}🔥</div><div className="text-xl">{card.power}</div>
          </motion.div>
        ))}
      </div>
      {phase === 'placement' && <button onClick={endTurn} className="w-full bg-[#6bc4b0] text-white py-4 rounded-3xl text-xl">End Turn</button>}
      {phase === 'resolved' && <button onClick={resetBattle} className="w-full bg-[#a57cde] text-white py-4 rounded-3xl text-xl">Play Again</button>}
      <AnimatePresence>{message && <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white px-8 py-4 rounded-3xl shadow-2xl text-2xl">{message}</motion.div>}</AnimatePresence>
      {confetti && (
        <motion.div className="fixed inset-0 pointer-events-none" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 3 }}>
          {Array.from({ length: 80 }).map((_, i) => (
            <motion.div key={i} className="absolute text-3xl" initial={{ y: -100, x: Math.random() * window.innerWidth }} animate={{ y: window.innerHeight + 100, rotate: Math.random() * 720 }} transition={{ duration: Math.random() * 3 + 2, ease: "easeOut" }} style={{ left: `${Math.random() * 100}%` }}>🎉</motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}