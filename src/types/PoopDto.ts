enum Size {
  Very_small = "VERY_SMALL",
  Small = "SMALL",
  Normal = "NORMAL",
  Big = "BIG",
  Ginormous = "GINORMOUS"
}

enum Color {
  Light_brown = "LIGHT_BROWN",
  Brown = "BROWN",
  Dark_brown = "DARK_BROWN",
  Pitch_black = "PITCH_BLACK",
  Red = "RED"
}

enum Softness {
  Watery = "WATERY",
  Soft = "SOFT",
  Normal = "NORMAL",
  Hard = "HARD",
  Rock = "ROCK"
}

export type Poop = {
  size:  Size;
  color: Color;
  softness: Softness;
}