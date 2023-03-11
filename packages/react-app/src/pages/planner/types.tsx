export interface EmblemsStat {
  hp?: number;
  attack?: number;
  special_attack?: number;
  attack_speed?: number;
  defense?: number;
  special_defense?: number;
  cooldown_rate?: number;
  critical_rate?: number;
  movement_speed?: number;
}

export interface PokemonStat {
  hp: number;
  heal: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  cooldown_rate: number;
  critical_rate: number;
  movement_speed: number;
  lifesteal: number;
  attack_speed: number;
  tenacity: number;
}

export interface EmblemsData {
  pk: string;
  type: string;
  color: string;
  url: string;
  hp?: number;
  attack?: number;
  special_attack?: number;
  attack_speed?: number;
  defense?: number;
  special_defense?: number;
  cooldown_rate?: number;
  critical_rate?: number;
  lifesteal?: number;
  movement_speed?: number;
}

export interface StatData {
  hp?: string;
  heal?: string;
  attack?: string;
  defense?: string;
  special_attack?: string;
  special_defense?: string;
  cooldown_rate?: string;
  critical_rate?: string;
  movement_speed?: string;
  lifesteal?: string;
  attack_speed?: string;
  tenacity?: string;
}

export interface StatDataOptions {
  stat: string;
  value: string;
  original_value?: string;
}

export interface PokemonOptions {
  pk: string;
  name: string;
  url: string;
}

export const pokemonInitialStat: PokemonStat = {
  hp: 0,
  heal: 0,
  attack: 0,
  defense: 0,
  special_attack: 0,
  special_defense: 0,
  cooldown_rate: 0,
  critical_rate: 0,
  movement_speed: 0,
  lifesteal: 0,
  attack_speed: 0,
  tenacity: 0,
};
