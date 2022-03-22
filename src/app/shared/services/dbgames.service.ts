import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { Game } from '../../models/game.model';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DbgamesService {

  loggedUserId: string | null;
  constructor(private db: AngularFireDatabase) {
    this.loggedUserId = localStorage.getItem('id');
  }

  getAllGames(){
    let dbgames = this.db.list('/games');
    return dbgames.snapshotChanges().pipe(
      map( changes =>
        changes.map(c => {
          return {
            key: c.payload.key,
            ...c.payload.val() as Game
          }
        }))
    );
  }
  getGame(gamekey: string){
    return this.db.object('/games/' + gamekey).valueChanges();
  }

  addGameToUserGames(gamekey: string){
    console.log("add game to user: ", gamekey);
    let dbgames = this.db.list('/users/'+ this.loggedUserId + '/games');
    return dbgames.push(gamekey);
  }

  getAllUserGameKeys(){
    return this.db.list('/users/'+ this.loggedUserId + '/games').valueChanges();
  }
}
