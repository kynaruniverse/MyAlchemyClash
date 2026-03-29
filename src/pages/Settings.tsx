import { useGame } from '../contexts/GameContext';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export default function Settings() {
  const { saveGame, essence, addEssence } = useGame();

  const triggerHaptic = async () => {
    await Haptics.impact({ style: ImpactStyle.Light });
  };

  const resetProgress = () => {
    if (confirm('Reset all progress? This cannot be undone.')) {
      localStorage.removeItem('alchemyClashSave');
      window.location.reload();
    }
  };

  const exportSave = () => {
    const data = localStorage.getItem('alchemyClashSave');
    if (data) {
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'alchemy-save.json';
      a.click();
    }
  };

  const importSave = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          localStorage.setItem('alchemyClashSave', ev.target?.result as string);
          window.location.reload();
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="flex-1 p-4 bg-[#fff7e8]">
      <h2 className="text-3xl font-bold text-center mb-8">Settings</h2>
      <div className="space-y-6">
        {/* Sound toggle */}
        <div className="bg-white rounded-3xl p-6 neu flex justify-between items-center">
          <span className="text-xl">Sound (Master)</span>
          <input type="checkbox" defaultChecked className="toggle" />
        </div>

        {/* Music slider */}
        <div className="bg-white rounded-3xl p-6 neu">
          <div className="flex justify-between text-xl mb-2">
            <span>Music</span>
            <span className="text-[#6bc4b0]">75%</span>
          </div>
          <input type="range" min="0" max="100" defaultValue="75" className="w-full accent-[#6bc4b0]" />
        </div>

        {/* SFX slider */}
        <div className="bg-white rounded-3xl p-6 neu">
          <div className="flex justify-between text-xl mb-2">
            <span>SFX</span>
            <span className="text-[#6bc4b0]">100%</span>
          </div>
          <input type="range" min="0" max="100" defaultValue="100" className="w-full accent-[#6bc4b0]" />
        </div>

        {/* Haptics toggle */}
        <div className="bg-white rounded-3xl p-6 neu flex justify-between items-center">
          <span className="text-xl">Haptics</span>
          <input type="checkbox" defaultChecked onChange={triggerHaptic} className="toggle" />
        </div>

        {/* Reset */}
        <button onClick={resetProgress} className="w-full bg-red-500 text-white py-4 rounded-3xl text-xl neu">
          Reset Progress
        </button>

        {/* Save controls */}
        <div className="flex gap-4">
          <button onClick={exportSave} className="flex-1 bg-[#6bc4b0] text-white py-4 rounded-3xl neu">Export Save</button>
          <button onClick={importSave} className="flex-1 bg-[#a57cde] text-white py-4 rounded-3xl neu">Import Save</button>
        </div>

        {/* Debug */}
        <div className="text-center text-xs text-[#3a2e28]/50">
          Essence: {essence} (debug) 
          <button onClick={() => addEssence(100)} className="ml-4 text-[#6bc4b0]">+100</button>
        </div>
      </div>
    </div>
  );
}