export interface Ability {
  id: string;
  type: 'onPlay' | 'onReveal' | 'passive';
  description: string;
  value?: number;
}

export const abilities: Record<string, Ability> = {
  wizard: { id: 'adjacent', type: 'passive', description: 'Adjacent lanes +1', value: 1 },
  firebolt: { id: 'damage', type: 'onReveal', description: '2 dmg lane', value: 2 },
  golem: { id: 'minPower', type: 'passive', description: 'Min 3', value: 3 },
  thunderhawk: { id: 'aoe', type: 'onReveal', description: '1 dmg all', value: 1 },
  forestguardian: { id: 'natureBonus', type: 'passive', description: '+2 Nature', value: 2 },
  seaserpent: { id: 'weaken', type: 'onReveal', description: '-1 enemy', value: 1 },
  phoenix: { id: 'return', type: 'onReveal', description: 'Return if defeated', value: 1 },
  crystalmage: { id: 'magicBonus', type: 'passive', description: '+1 per Magic', value: 1 },
  irongolem: { id: 'buffCost', type: 'passive', description: '+2 but +1 cost', value: 2 },
};