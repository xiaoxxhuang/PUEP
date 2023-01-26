export interface StatsDataOptions {
  stat: string;
  value: string;
}

export interface EmblemStats {
  HP?: string;
  Attack?: string;
  "Sp. Atk"?: string;
  Defense?: string;
  "Sp. Def"?: string;
  "Cooldown Rate"?: string;
  "Crit. Hit Rate"?: string;
}

export interface PkmStats {
  HP: string;
  Attack: string;
  "Sp. Atk": string;
  "Attack Speed": string;
  Defense: string;
  "Sp. Def": string;
  "Cooldown Rate": string;
  "Crit. Hit Rate": string;
  Lifesteal: string;
}
