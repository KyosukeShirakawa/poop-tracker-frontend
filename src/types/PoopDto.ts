type Size = "VERY_SMALL" | "SMALL" | "NORMAL" |"BIG" |"GINORMOUS";

type Color = "LIGHT_BROWN" | "BROWN" | "DARK_BROWN" | "PITCH_BLACK" | "RED";

type Softness = "WATERY" | "SOFT" | "NORMAL" | "HARD" | "ROCK";

export type PoopDTO = {
  size:  Size;
  color: Color;
  softness: Softness;
}