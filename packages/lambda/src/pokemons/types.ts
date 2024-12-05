interface IDBPokemonEvolution {
  level: number;
  name: string;
  url: string;
}

interface IDBPokemonStat {
  attack: number;
  attack_speed: number;
  cooldown_rate: number;
  critical_rate: number;
  defense: number;
  heal: number;
  hp: number;
  lifesteal: number;
  movement_speed: number;
  special_attack: number;
  special_defense: number;
  tenacity: number;
}

export interface IDBPokemon {
  pk: string;
  damageType: string;
  difficulty: string;
  evolution?: IDBPokemonEvolution[];
  name: string;
  range: string;
  role: string;
  url: string;
  stats: IDBPokemonStat[];
}

export interface IDBPokemonNamesAndUrls {
  pk: string;
  name: string;
  url: string;
}
