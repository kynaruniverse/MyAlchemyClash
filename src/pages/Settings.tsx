import { useGame } from '../contexts/GameContext';

export default function Settings() {
  const { saveGame, essence, addEssence } = useGame(); // addEssence for testing

  const resetProgress = () => {
    if (confirm('Reset all progress?')) {
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
    <div className="flex-1 p-4">
      <h2 className="text-3xl font-bold text-center mb-8">Settings</h2>
      
      <div className="space-y-6">
        <div className="bg-white rounded-3xl p-6">
          <div className="flex justify-between items-center">
            <span className="text-xl">Sound</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6bc4b0] rounded-full peer peer-checked:bg-[#6bc4b0]"></div>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6">
          <div className="flex justify-between items-center">
            <span className="text-xl">Haptics</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6bc4b0] rounded-full peer peer-checked:bg-[#6bc4b0]"></div>
            </label>
          </div>
        </div>

        <button onClick={resetProgress} className="w-full bg-red-500 text-white py-4 rounded-3xl text-xl">Reset Progress</button>
        
        <div className="flex gap-4">
          <button onClick={exportSave} className="flex-1 bg-[#6bc4b0] text-white py-4 rounded-3xl">Export Save</button>
          <button onClick={importSave} className="flex-1 bg-[#a57cde] text-white py-4 rounded-3xl">Import Save</button>
        </div>

        <div className="text-center text-xs text-[#3a2e28]/50">
          Essence: {essence} (debug)
          <button onClick={() => addEssence(100)} className="ml-4 text-[#6bc4b0]">+100</button>
        </div>
      </div>
    </div>
  );
}