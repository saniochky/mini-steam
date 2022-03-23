import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DbgamesService } from '../../shared/services/dbgames.service';
import { Game } from '../../models/game.model';
import { Gamekey } from '../../models/gamekey.model'

@Component({
  selector: 'app-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.css']
})
export class LibraryPageComponent implements OnInit {
  title: string;

  gamekeysObs!: Observable<any>;
  usergames: Array<Game>;
  constructor(private dbservice: DbgamesService) {
    this.title = 'My games';
    this.usergames = [];
  }

  ngOnInit(): void {
    this.usergames = [];
    this.gamekeysObs = this.dbservice.getAllUserGameKeys();
    this.loadUserGames();
  }

  loadUserGames(){
    this.usergames = [];
    this.gamekeysObs = this.dbservice.getAllUserGameKeys();

    this.gamekeysObs.subscribe(gamekeys => {
      gamekeys.forEach((gamekeyObj: Gamekey)=>{
        let dbgame = this.dbservice.getGame(gamekeyObj.gamekey);
        dbgame.subscribe(usergame => {
          this.usergames.push(usergame as Game);
        });
      });
    });
  }

  deleteFromUserGames(event: any){
    this.dbservice.getAllUserGameKeysWithId().subscribe( userGamesArr => {
      userGamesArr.filter(userGame => {
        return userGame.gamekey === event.target.dataset.key;      
      }).map(game => {
        this.dbservice.getUserGames().remove(game.id);
        this.usergames = [];
      });     
    });
  }

}
