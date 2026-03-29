import { Link } from 'wouter';
import { useGame } from '../contexts/GameContext';

export default function Title() {
  const { essence, level, claimDaily, lastDaily, quests, claimQuest, battlesWon } = useGame();
  const today = new Date().toISOString().split('T')[0];
  const canClaim = lastDaily !== today;
  const streak = Math.floor(battlesWon / 3);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 relative bg-[#fff7e8] overflow-hidden">
      {/* Settings gear - premium placement */}
      <Link href="/settings" className="absolute top-8 right-8 text-4xl neu active:scale-90 transition-all">⚙️</Link>

      {/* Hero title - bigger, bouncier, with soft shadow */}
      <h1 className="text-7xl font-bold text-[#6bc4b0] tracking-tighter drop-shadow-[0_4px_8px_rgba(107,196,176,0.3)]">
        Alchemy Clash
      </h1>
      <p className="mt-3 text-2xl text-[#3a2e28]/80 font-medium">Discover • Build • Battle</p>

      {/* Stats row - premium neumorphic cards with icons */}
      <div className="mt-10 flex gap-6 text-center w-full max-w-md">
        <div className="flex-1 bg-white neu rounded-3xl px-6 py-5">
          <div className="text-5xl font-bold text-[#f5b642]">1</div>
          <div className="text-xs tracking-[2px] font-medium text-[#3a2e28]/70 mt-1">LEVEL</div>
        </div>
        <div className="flex-1 bg-white neu rounded-3xl px-6 py-5">
          <div className="text-5xl font-bold text-[#6bc4b0]">{essence}</div>
          <div className="text-xs tracking-[2px] font-medium text-[#3a2e28]/70 mt-1">ESSENCE</div>
        </div>
        <div className="flex-1 bg-white neu rounded-3xl px-6 py-5">
          <div className="text-5xl font-bold text-[#a57cde]">{streak}</div>
          <div className="text-xs tracking-[2px] font-medium text-[#3a2e28]/70 mt-1">STREAK</div>
        </div>
      </div>

      {/* Daily reward - large, glowing button */}
      <button
        onClick={() => { if (claimDaily()) alert('Daily reward claimed! +10 essence'); }}
        className={`mt-8 w-full max-w-xs py-5 text-xl font-semibold rounded-3xl neu transition-all active:scale-95 ${
          canClaim
            ? 'bg-[#f5b642] text-white shadow-[0_0_20px_#f5b642]'
            : 'bg-gray-300 text-gray-600'
        }`}
      >
        {canClaim ? 'Claim Daily +10' : 'Claimed Today'}
      </button>

      {/* Daily Quests - premium card style with progress feel */}
      <div className="mt-10 w-full max-w-xs">
        <h3 className="text-sm font-medium mb-4 text-[#3a2e28]/70">Daily Quests</h3>
        {quests.map(q => (
          <div
            key={q.id}
            className="bg-white neu rounded-3xl p-5 mb-3 flex justify-between items-center"
          >
            <div className="text-base">
              {q.type} <span className="text-[#3a2e28]/50">{q.progress}/{q.target}</span>
            </div>
            <button
              onClick={() => claimQuest(q.id)}
              disabled={!q.completed}
              className="px-6 py-2 text-sm font-medium rounded-2xl bg-[#6bc4b0] text-white disabled:bg-gray-300 disabled:text-gray-500 transition-all"
            >
              +{q.reward}
            </button>
          </div>
        ))}
      </div>

      {/* Play Now - big, juicy CTA */}
      <Link
        href="/fusion"
        className="mt-12 w-full max-w-xs bg-[#6bc4b0] text-white py-6 text-3xl font-semibold rounded-3xl neu text-center active:scale-95 transition-all shadow-[0_10px_30px_-10px_#6bc4b0]"
      >
        Play Now
      </Link>
    </div>
  );
}