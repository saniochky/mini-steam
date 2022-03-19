export interface User {
  username?: string;
  email: string;
  password: string;
  usergames?: Array<string>; 
  friends?: Array<string>;
  games?: Array<string>;
}