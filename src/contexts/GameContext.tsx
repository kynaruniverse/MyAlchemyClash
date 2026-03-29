import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { initialElements, Element, initialCards, Card } from '../lib/gameData';

interface Quest { id: string; type: string; target: number; progress: number; reward: number; completed: boolean; }
interface GameContextType {
  elements: Element[];
  discovered: Set<string>;
  addDiscovery: (id: string) => void;
  cards: Card[];
  unlockedCards: Set<string>;
  decks: string[][];
  currentDeckIndex: number;
  currentDeck: string[];
  switchDeck: (index: number) => void;
  addToDeck: (cardId: string) => void;
  removeFromDeck: (cardId: string) => void;
  essence: number;
  level: number;
  addEssence: (amount: number) => void;
  upgrades: Record<string, number>;
  upgradeCard: (cardId: string) => boolean;
  lastDaily: string;
  claimDaily: () => boolean;
  battlesWon: number;
  addBattleWin: () => void;
  quests: Quest[];
  updateQuestProgress: (type: string, amount: number) => void;
  claimQuest: (id: string) => boolean;
  saveGame: () => void;
  loadGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState(initialElements);
  const [discovered, setDiscovered] = useState(new Set(initialElements.map(e => e.id)));
  const [cards] = useState(initialCards);
  const [unlockedCards, setUnlockedCards] = useState(new Set(['wizard','firebolt','golem','thunderhawk','forestguardian','seaserpent','phoenix','crystalmage','irongolem']));
  const [decks, setDecks] = useState<string[][]>(Array(5).fill(0).map(() => []));
  const [currentDeckIndex, setCurrentDeckIndex] = useState(0);
  const [essence, setEssence] = useState(50);
  const [level, setLevel] = useState(1);
  const [upgrades, setUpgrades] = useState<Record<string, number>>({});
  const [lastDaily, setLastDaily] = useState('');
  const [battlesWon, setBattlesWon] = useState(0);
  const [quests, setQuests] = useState<Quest[]>([]);

  const currentDeck = decks[currentDeckIndex];

  const addDiscovery = (id: string) => {
    const wasNew = !discovered.has(id);
    if (wasNew) {
      setDiscovered(prev => new Set(prev).add(id));
      setEssence(prev => prev + 5);
      if (['wizard','seaserpent','phoenix','life','crystalmage','irongolem'].includes(id)) setUnlockedCards(prev => new Set([...prev, id]));
      updateQuestProgress('discover', 1);
    } else setEssence(prev => prev + 1);
    if (wasNew && discovered.size % 5 === 4) setLevel(prev => prev + 1);
  };

  const switchDeck = (index: number) => { if (index >= 0 && index < 5) setCurrentDeckIndex(index); };

  const addToDeck = (cardId: string) => {
    if (currentDeck.length < 14 && currentDeck.filter(id => id === cardId).length < 3 && unlockedCards.has(cardId)) {
      setDecks(prev => { const newDecks = [...prev]; newDecks[currentDeckIndex] = [...newDecks[currentDeckIndex], cardId]; return newDecks; });
    }
  };

  const removeFromDeck = (cardId: string) => {
    setDecks(prev => { const newDecks = [...prev]; newDecks[currentDeckIndex] = newDecks[currentDeckIndex].filter(id => id !== cardId); return newDecks; });
  };

  const addEssence = (amount: number) => setEssence(prev => prev + amount);

  const upgradeCard = (cardId: string): boolean => {
    const currentLevel = upgrades[cardId] || 0;
    if (currentLevel >= 7) return false;
    const costs = [50,50,50,100,100,100,200];
    const cost = costs[currentLevel];
    if (essence < cost) return false;
    setEssence(prev => prev - cost);
    setUpgrades(prev => ({ ...prev, [cardId]: currentLevel + 1 }));
    updateQuestProgress('upgrade', 1);
    return true;
  };

  const claimDaily = (): boolean => {
    const today = new Date().toISOString().split('T')[0];
    if (lastDaily === today) return false;
    setLastDaily(today);
    setEssence(prev => prev + 10);
    return true;
  };

  const addBattleWin = () => {
    setBattlesWon(prev => {
      const newWins = prev + 1;
      if (newWins % 3 === 0) setLevel(l => Math.max(l, l + 1));
      updateQuestProgress('winBattle', 1);
      return newWins;
    });
  };

  const updateQuestProgress = (type: string, amount: number) => {
    setQuests(prev => prev.map(q => q.type === type ? { ...q, progress: Math.min(q.target, q.progress + amount) } : q));
  };

  const claimQuest = (id: string): boolean => {
    const quest = quests.find(q => q.id === id);
    if (!quest || !quest.completed) return false;
    setEssence(prev => prev + quest.reward);
    setQuests(prev => prev.filter(q => q.id !== id));
    return true;
  };

  const generateDailyQuests = () => {
    const today = new Date().toISOString().split('T')[0];
    setQuests([
      { id: 'q1', type: 'fuse', target: 5, progress: 0, reward: 20, completed: false },
      { id: 'q2', type: 'winBattle', target: 3, progress: 0, reward: 30, completed: false },
      { id: 'q3', type: 'upgrade', target: 2, progress: 0, reward: 25, completed: false }
    ]);
  };

  const saveGame = () => {
    const saveData = { version: 5, discovered: Array.from(discovered), decks, currentDeckIndex, essence, level, unlockedCards: Array.from(unlockedCards), upgrades, lastDaily, battlesWon, quests };
    localStorage.setItem('alchemyClashSave', JSON.stringify(saveData));
  };

  const loadGame = () => {
    const saved = localStorage.getItem('alchemyClashSave');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.version >= 1) {
        setDiscovered(new Set(data.discovered));
        setDecks(data.decks || Array(5).fill(0).map(() => []));
        setCurrentDeckIndex(data.currentDeckIndex || 0);
        setEssence(data.essence || 50);
        setLevel(data.level || 1);
        setUnlockedCards(new Set(data.unlockedCards || []));
        setUpgrades(data.upgrades || {});
        setLastDaily(data.lastDaily || '');
        setBattlesWon(data.battlesWon || 0);
        setQuests(data.quests || []);
      }
    } else generateDailyQuests();
  };

  useEffect(() => {
    loadGame();
    const interval = setInterval(saveGame, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GameContext.Provider value={{ elements, discovered, addDiscovery, cards, unlockedCards, decks, currentDeckIndex, currentDeck, switchDeck, addToDeck, removeFromDeck, essence, level, addEssence, upgrades, upgradeCard, lastDaily, claimDaily, battlesWon, addBattleWin, quests, updateQuestProgress, claimQuest, saveGame, loadGame }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};