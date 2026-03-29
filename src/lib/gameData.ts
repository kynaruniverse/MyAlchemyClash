export interface Element {
  id: string;
  name: string;
  emoji: string;
  tier: 1 | 2 | 3;
  category: 'Base' | 'Nature' | 'Materials' | 'Life' | 'Magic' | 'Advanced';
}

export const initialElements: Element[] = [
  { id: 'fire', name: 'Fire', emoji: '🔥', tier: 1, category: 'Base' },
  { id: 'water', name: 'Water', emoji: '💧', tier: 1, category: 'Base' },
  { id: 'earth', name: 'Earth', emoji: '🌍', tier: 1, category: 'Base' },
  { id: 'air', name: 'Air', emoji: '💨', tier: 1, category: 'Base' },
  { id: 'steam', name: 'Steam', emoji: '☁️', tier: 2, category: 'Nature' },
  { id: 'lava', name: 'Lava', emoji: '🌋', tier: 2, category: 'Materials' },
  { id: 'mud', name: 'Mud', emoji: '🪨', tier: 2, category: 'Materials' },
  { id: 'smoke', name: 'Smoke', emoji: '🌫️', tier: 2, category: 'Nature' },
  { id: 'obsidian', name: 'Obsidian', emoji: '🪨', tier: 3, category: 'Materials' },
  { id: 'plant', name: 'Plant', emoji: '🌱', tier: 2, category: 'Nature' },
  { id: 'life', name: 'Life', emoji: '🌿', tier: 3, category: 'Life' },
  { id: 'dust', name: 'Dust', emoji: '🌬️', tier: 2, category: 'Nature' },
  { id: 'wizard', name: 'Wizard', emoji: '🧙', tier: 3, category: 'Magic' },
];

export const fusionRecipes = new Map<string, string>([
  ['fire_water', 'steam'],
  ['fire_earth', 'lava'],
  ['water_earth', 'mud'],
  ['air_fire', 'smoke'],
  ['steam_lava', 'obsidian'],
  ['water_fire', 'steam'],
  ['earth_water', 'mud'],
  ['air_earth', 'dust'],
  ['fire_plant', 'life'],
  ['mud_plant', 'life'],
  ['life_fire', 'wizard'],
  // More recipes for progression
  ['air_water', 'rain'],
  ['rain_earth', 'plant'],
  ['plant_life', 'forestguardian'],
  ['lava_air', 'smoke'],
]);

export const getFusionResult = (a: string, b: string): string | null => {
  const key = [a, b].sort().join('_');
  return fusionRecipes.get(key) || null;
};

export interface Card {
  id: string;
  name: string;
  emoji: string;
  cost: number;
  power: number;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic';
  ability: string;
  abilityType?: 'onPlay' | 'onReveal' | 'passive';
  abilityValue?: number;
}

export const initialCards: Card[] = [
  // Exact match to GDD Appendix C + abilityType/abilityValue for battle system
  { id: 'wizard', name: 'Wizard', emoji: '🧙', cost: 3, power: 4, rarity: 'Uncommon', ability: 'Adjacent lanes gain +1 power', abilityType: 'passive', abilityValue: 1 },
  { id: 'firebolt', name: 'Firebolt', emoji: '🔥', cost: 2, power: 5, rarity: 'Common', ability: 'Deal 2 damage to opponent in same lane', abilityType: 'onReveal', abilityValue: 2 },
  { id: 'golem', name: 'Golem', emoji: '🪨', cost: 4, power: 3, rarity: 'Uncommon', ability: 'Cannot be reduced below 3 power', abilityType: 'passive', abilityValue: 3 },
  { id: 'thunderhawk', name: 'Thunder Hawk', emoji: '🦅', cost: 2, power: 4, rarity: 'Uncommon', ability: 'Deal 1 damage to all enemy lanes', abilityType: 'onReveal', abilityValue: 1 },
  { id: 'forestguardian', name: 'Forest Guardian', emoji: '🌲', cost: 2, power: 3, rarity: 'Common', ability: 'If you have a Nature card in another lane, gain +2 power', abilityType: 'passive', abilityValue: 2 },
  { id: 'seaserpent', name: 'Sea Serpent', emoji: '🐉', cost: 4, power: 5, rarity: 'Rare', ability: 'All enemy cards lose -1 power', abilityType: 'onReveal', abilityValue: 1 },
  { id: 'phoenix', name: 'Phoenix', emoji: '🔥', cost: 5, power: 4, rarity: 'Rare', ability: 'If defeated, returns to hand (once per battle)', abilityType: 'onReveal', abilityValue: 1 },
  { id: 'crystalmage', name: 'Crystal Mage', emoji: '💎', cost: 3, power: 5, rarity: 'Rare', ability: 'Gain +1 power for each Magic card in your deck', abilityType: 'passive', abilityValue: 1 },
  { id: 'irongolem', name: 'Iron Golem', emoji: '⚒️', cost: 4, power: 7, rarity: 'Epic', ability: 'Cost increased by 1, but gains +2 power', abilityType: 'passive', abilityValue: 2 },
  { id: 'stormknight', name: 'Storm Knight', emoji: '⚡', cost: 3, power: 6, rarity: 'Epic', ability: 'Gains +2 power if you have played a card in the same lane this battle', abilityType: 'passive', abilityValue: 2 },
  { id: 'spirithealer', name: 'Spirit Healer', emoji: '👻', cost: 2, power: 2, rarity: 'Common', ability: 'Heal adjacent allies for 1 power', abilityType: 'onReveal', abilityValue: 1 },
  { id: 'runeweaver', name: 'Rune Weaver', emoji: '✨', cost: 1, power: 1, rarity: 'Common', ability: 'Draw a card', abilityType: 'onReveal', abilityValue: 1 },
];