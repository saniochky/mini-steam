
export interface User {
  uid: string,
  email: string,
  password: string,
  age?: string,
  nickname?: string,
   friends? : User [],
   gamesInLibrary?: [],
}
