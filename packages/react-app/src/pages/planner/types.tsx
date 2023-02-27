export interface StatsDataOptions {
  stat: string;
  value: string;
}

export interface PokemonStat {
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
  movement_speed?:number;
}
