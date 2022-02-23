export interface Filter {
  title: string;
  price: Price;
  genres: Genres;
}

export interface Genres {
  [key: string]: boolean;
  indie: boolean;
  action: boolean;
  adventure: boolean;
}

export interface Price {
  min: number;
  max: number;
}