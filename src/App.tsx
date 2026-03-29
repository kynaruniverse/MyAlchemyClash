import { useState } from 'react';

export default function App() {
  const [page, setPage] = useState<'title' | 'fusion'>('title');
  return (
    <div className="min-h-screen bg-[#fff7e8] text-[#3a2e28] p-4">
      <h1 className="text-4xl font-bold text-center">Alchemy Clash</h1>
      {page === 'title' && (
        <button
          onClick={() => setPage('fusion')}
          className="mt-8 block mx-auto bg-[#6bc4b0] text-white px-8 py-4 rounded-2xl text-xl"
        >
          Start Game
        </button>
      )}
      {page === 'fusion' && <p className="text-center mt-12">Fusion Screen Coming...</p>}
    </div>
  );
}