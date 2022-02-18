import { Component, OnInit } from '@angular/core';
import { DbgamesService } from '../dbgames.service';
import { Observable } from 'rxjs';
import { Game } from '../game.model';

@Component({
  selector: 'app-libgames',
  templateUrl: './libgames.component.html',
  styleUrls: ['./libgames.component.css']
})
export class LibgamesComponent implements OnInit {
  title: string;
  games: Observable<any>;
  constructor(private dbservice: DbgamesService) {
    this.title = "featured games"
    this.games = this.dbservice.getAllGames();
  }

  ngOnInit(): void {
  }

}
