export interface Element { id: string; name: string; emoji: string; tier: 1 | 2 | 3; category: 'Base' | 'Nature' | 'Materials' | 'Life' | 'Magic' | 'Advanced'; }

export const initialElements: Element[] = [ /* unchanged from Step 22 */ ];

export const fusionRecipes = new Map<string, string>([ /* unchanged */ ]);

export const getFusionResult = (a: string, b: string): string | null => { /* unchanged */ };

export interface Card {
  id: string; name: string; emoji: string; cost: number; power: number; rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic';
  ability: string; abilityType?: 'onPlay' | 'onReveal' | 'passive'; abilityValue?: number;
}

export const initialCards: Card[] = [
  { id: 'wizard', name: 'Wizard', emoji: '🧙', cost: 3, power: 4, rarity: 'Uncommon', ability: 'Adjacent +1', abilityType: 'passive', abilityValue: 1 },
  { id: 'firebolt', name: 'Firebolt', emoji: '🔥', cost: 2, power: 5, rarity: 'Common', ability: '2 dmg lane', abilityType: 'onReveal', abilityValue: 2 },
  { id: 'golem', name: 'Golem', emoji: '🪨', cost: 4, power: 3, rarity: 'Uncommon', ability: 'Min 3', abilityType: 'passive', abilityValue: 3 },
  { id: 'thunderhawk', name: 'Thunder Hawk', emoji: '🦅', cost: 2, power: 4, rarity: 'Uncommon', ability: '1 dmg all', abilityType: 'onReveal', abilityValue: 1 },
  { id: 'forestguardian', name: 'Forest Guardian', emoji: '🌲', cost: 2, power: 3, rarity: 'Common', ability: '+2 Nature', abilityType: 'passive', abilityValue: 2 },
  { id: 'seaserpent', name: 'Sea Serpent', emoji: '🐉', cost: 4, power: 5, rarity: 'Rare', ability: '-1 enemy', abilityType: 'onReveal', abilityValue: 1 },
  { id: 'phoenix', name: 'Phoenix', emoji: '🔥', cost: 5, power: 4, rarity: 'Rare', ability: 'Return if defeated', abilityType: 'onReveal', abilityValue: 1 },
  { id: 'crystalmage', name: 'Crystal Mage', emoji: '💎', cost: 3, power: 5, rarity: 'Rare', ability: '+1 per Magic', abilityType: 'passive', abilityValue: 1 },
  { id: 'irongolem', name: 'Iron Golem', emoji: '⚒️', cost: 4, power: 7, rarity: 'Epic', ability: '+2 but +1 cost', abilityType: 'passive', abilityValue: 2 },
];