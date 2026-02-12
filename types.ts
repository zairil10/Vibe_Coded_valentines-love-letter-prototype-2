
export type Vibe = 'ROMANTIC' | 'FUNNY' | 'NERDY' | 'POETIC';
export type Gift = 'FLOWERS' | 'KITTEN' | 'PIZZA' | 'MUSIC';
export type Language = 'EN' | 'FR';

export type AppState = 'IDLE' | 'QUIZ' | 'CHOOSING_VIBE' | 'CHOOSING_GIFT' | 'ASKING' | 'SUCCESS';

export interface ValentineConfig {
  targetName: string;
  vibe: Vibe;
  gift: Gift;
  language: Language;
}
