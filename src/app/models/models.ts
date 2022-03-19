export interface Friend {
  email: string,
  username?: string,
  isFriend?: boolean
}

export type Game = {
  title: string,
  description: string,
  price: number,
  genre: string
};

export interface User {
  uid: string,
  email: string,
  password: string,
  username?: string,
  age?: number,
  friends?: string[],
  game?: string[]
}
