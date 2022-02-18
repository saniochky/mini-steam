import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { Game } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class DbgamesService {
  dataArr: Array<Game>;
  branch: AngularFireList<Game>;
  constructor(db: AngularFireDatabase) {
    this.branch = db.list('/games');
    this.dataArr = [];
  }

  getAllGames(){
    return this.branch.snapshotChanges().pipe(
      map( changes => 
        changes.map(c => {
          return {
            key: c.payload.key,
            ...c.payload.val() as Game
          }
        }))
    );
  }
}
