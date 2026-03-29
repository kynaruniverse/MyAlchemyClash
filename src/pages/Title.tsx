import { Link } from 'wouter';
import { useGame } from '../contexts/GameContext';

export default function Title() {
  const { essence, level, claimDaily, lastDaily, quests, claimQuest, battlesWon } = useGame();
  const today = new Date().toISOString().split('T')[0];
  const canClaim = lastDaily !== today;
  const streak = Math.floor(battlesWon / 3);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 relative bg-[#fff7e8]">
      {/* Settings gear */}
      <Link href="/settings" className="absolute top-6 right-6 text-3xl neu">⚙️</Link>

      <h1 className="text-6xl font-bold text-[#6bc4b0]">Alchemy Clash</h1>
      <p className="mt-4 text-xl">Discover • Build • Battle</p>

      {/* Stats row */}
      <div className="mt-8 flex gap-8 text-center">
        <div className="bg-white rounded-3xl px-8 py-4 neu">
          <div className="text-3xl font-bold text-[#f5b642]">{level}</div>
          <div className="text-xs tracking-widest">LEVEL</div>
        </div>
        <div className="bg-white rounded-3xl px-8 py-4 neu">
          <div className="text-3xl font-bold text-[#6bc4b0]">{essence}</div>
          <div className="text-xs tracking-widest">ESSENCE</div>
        </div>
        <div className="bg-white rounded-3xl px-8 py-4 neu">
          <div className="text-3xl font-bold text-[#a57cde]">{streak}</div>
          <div className="text-xs tracking-widest">STREAK</div>
        </div>
      </div>

      {/* Daily reward */}
      <button
        onClick={() => { if (claimDaily()) alert('Daily reward claimed! +10 essence'); }}
        className={`mt-8 px-8 py-3 rounded-3xl text-lg neu ${canClaim ? 'bg-[#f5b642] text-white' : 'bg-gray-300 text-gray-600'}`}
      >
        {canClaim ? 'Claim Daily +10' : 'Claimed Today'}
      </button>

      {/* Daily Quests */}
      <div className="mt-8 w-full max-w-xs">
        <h3 className="text-sm mb-3">Daily Quests</h3>
        {quests.map(q => (
          <div key={q.id} className="bg-white rounded-3xl p-4 mb-3 neu flex justify-between items-center">
            <div className="text-sm">{q.type} {q.progress}/{q.target}</div>
            <button
              onClick={() => claimQuest(q.id)}
              disabled={!q.completed}
              className="text-xs bg-[#6bc4b0] text-white px-5 py-1 rounded-2xl disabled:opacity-40"
            >
              +{q.reward}
            </button>
          </div>
        ))}
      </div>

      {/* Play Now */}
      <Link
        href="/fusion"
        className="mt-8 bg-[#6bc4b0] text-white px-10 py-5 rounded-3xl text-2xl neu"
      >
        Play Now
      </Link>
    </div>
  );
}