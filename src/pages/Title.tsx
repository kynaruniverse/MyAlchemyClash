import { Link } from 'wouter';
import { useGame } from '../contexts/GameContext';

export default function Title() {
  const { essence, level, claimDaily, lastDaily, quests, claimQuest } = useGame();
  const today = new Date().toISOString().split('T')[0];
  const canClaim = lastDaily !== today;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
      <Link href="/settings" className="absolute top-6 right-6 text-3xl">⚙️</Link>
      <h1 className="text-6xl font-bold text-[#6bc4b0]">Alchemy Clash</h1>
      <p className="mt-4 text-xl">Discover • Build • Battle</p>
      
      <div className="mt-8 flex gap-8 text-center">
        <div><div className="text-2xl font-bold text-[#f5b642]">{level}</div><div className="text-xs tracking-widest">LEVEL</div></div>
        <div><div className="text-2xl font-bold text-[#6bc4b0]">{essence}</div><div className="text-xs tracking-widest">ESSENCE</div></div>
      </div>

      <button onClick={() => { if (claimDaily()) alert('Daily +10 essence!'); }} className={`mt-8 px-8 py-3 rounded-3xl text-lg ${canClaim ? 'bg-[#f5b642] text-white' : 'bg-gray-300 text-gray-600'}`}>{canClaim ? 'Claim Daily +10' : 'Claimed Today'}</button>

      <div className="mt-6 w-full max-w-xs">
        <h3 className="text-sm mb-2">Daily Quests</h3>
        {quests.map(q => (
          <div key={q.id} className="bg-white rounded-3xl p-3 mb-2 flex justify-between items-center">
            <div>{q.type} {q.progress}/{q.target}</div>
            <button onClick={() => claimQuest(q.id)} disabled={!q.completed} className="text-xs bg-[#6bc4b0] text-white px-4 py-1 rounded-2xl">+{q.reward}</button>
          </div>
        ))}
      </div>

      <Link href="/fusion" className="mt-6 bg-[#6bc4b0] text-white px-10 py-5 rounded-3xl text-2xl">Play Now</Link>
    </div>
  );
}