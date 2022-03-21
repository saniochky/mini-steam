import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DbgamesService } from '../../shared/services/dbgames.service';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.css']
})
export class LibraryPageComponent implements OnInit {
  title: string;

  gamekeysObs: Observable<any>;
  usergames: Array<Game>;
  constructor(private dbservice: DbgamesService) {
    this.title = 'My games';

    this.usergames = [];
    this.gamekeysObs = this.dbservice.getAllUserGameKeys();

    this.loadUserGames();
  }

  ngOnInit(): void {
  }

  loadUserGames(){
    this.usergames = [];
    this.gamekeysObs = this.dbservice.getAllUserGameKeys();

    this.gamekeysObs.subscribe(gamekeys => {
      gamekeys.forEach((gamekey: string)=>{
        let dbgame = this.dbservice.getGame(gamekey);
        dbgame.subscribe(usergame => {
          this.usergames.push(usergame as Game);
        });
      });
    });
  }

}
