import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { FirebaseOperation } from '@angular/fire/compat/database/interfaces';
import { map } from 'rxjs/operators';
import { Game } from '../../models/game.model';
import { Gamekey } from '../../models/gamekey.model'
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
    return this.db.object('/games/' + gamekey).snapshotChanges().pipe(
      map(changes => {
        const data = changes.payload.val() as Game;
        const key = changes.payload.key;
        return { key, ...data };
      })
    );
  }

  addGameToUserGames(gamekey: string){
    let dbgames = this.db.list('/users/'+ localStorage.getItem('id') + '/games');
    return dbgames.push({gamekey: gamekey});
  }
  
  getAllUserGameKeysWithId(){
    return this.getUserGames()
    .snapshotChanges()
    .pipe(
      map(changes => changes.map(c => {
        return { 
          id: c.payload.key as FirebaseOperation,
          ...c.payload.val() as Gamekey
        };   
      }))
    )
  }

  getAllUserGameKeys(){
    return this.getUserGames().valueChanges();
  }

  getUserGames(){
    return this.db.list('/users/'+ localStorage.getItem('id') + '/games');
  }
  
}
