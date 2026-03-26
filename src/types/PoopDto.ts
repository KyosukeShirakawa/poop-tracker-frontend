export const SizeEnum = {
  VARY_SMALL : "Very small",
  SMALL:  "Small",
  NORMAL: "Normal",
  BIG:"Big" ,
  GINORMOUS: "Ginormous"
} as const;
export type Size = keyof typeof SizeEnum;


export const ColorEnum = {
  LIGHT_BROWN: "Light brown",
  BROWN: "Brown",
  DARK_BROWN: "Dark brown",
  PITCH_BLACK: "Pitch black",
  RED: "Red"
} as const;
export type Color = keyof typeof ColorEnum

export const SoftnessEnum = {
  WATERY: "Watery",
  SOFT: "Soft",
  NORMAL: "Normal",
  HARD: "Hard",
  ROCK: "Rock"
} as const;
export type Softness = keyof typeof SoftnessEnum

export type PoopDTO = {
  size:  Size;
  color: Color;
  softness: Softness;
}