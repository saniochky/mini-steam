import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { Game } from '../../models/game.model';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DbgamesService {


  constructor(private db: AngularFireDatabase) {

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
    let dbgames = this.db.list('/users/'+ localStorage.getItem('id') + '/games');
    return dbgames.push(gamekey);
  }

  getAllUserGameKeys(){
    return this.db.list('/users/'+ localStorage.getItem('id') + '/games').valueChanges();
  }
  
}
