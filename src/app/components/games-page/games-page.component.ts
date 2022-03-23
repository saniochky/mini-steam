import {Component, OnInit} from '@angular/core';
import {DbgamesService} from '../../shared/services/dbgames.service';
import {Game} from '../../models/game.model';
import {Filter} from '../../models/filter.model';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.css']
})
export class GamesPageComponent implements OnInit {
  filters: Filter;
  maxprice: number;

  gms: any;
  newgms: any;
  filteredGms: any;

  constructor(private dbservice: DbgamesService) {
    this.maxprice = 0;
    this.filters = {
      title: '',
      price: {
        min: 0,
        max: 0,
      },
      genres: {
        indie: true,
        action: true,
        adventure: true
      }
    };
  }

  ngOnInit(): void {
    this.loadGames(true);
  }

  loadGames(init?: boolean) {
    this.dbservice.getAllGames().subscribe(gms => {
      this.gms = gms;
      if (init) {
        this.valueMax();
      }
      this.newgms = this.filterGames();

      this.dbservice.getAllUserGameKeys().subscribe(
        (gamekeys: Array<any>) => {
          for (let i = 0; i < gamekeys.length; i++) {
            for (let j = 0; j < this.newgms.length; j++) {
              if (this.newgms[j].key === gamekeys[i].gamekey) {
                this.newgms[j].addedToUserGames = true;
              }
            }
          }
        }
      );
    });
  }

  validMinMax(event: any) {
    if (event.target.classList.contains('min')) {
      if (this.filters.price.min > this.filters.price.max) {
        this.filters.price.min = this.filters.price.max;
      }
    } else {
      if (this.filters.price.min > this.filters.price.max) {
        this.filters.price.max = this.filters.price.min;
      }
    }
    this.loadGames();
  }

  filterGames() {
    let price = (el: Game, selectedMinPrice: number, selectedMaxPrice: number) => {
      if (el.price === undefined) {
        return false;
      }
      return el.price >= selectedMinPrice && el.price <= selectedMaxPrice;
    };
    let genre = (el: Game, genres: Object) => {
      let filteredGenresNames = Object.keys(genres).filter((genreName: string) => {
        return this.filters.genres[genreName] === true;
      });
      return filteredGenresNames.some((genre) => {
        return genre === el.genre;
      });
    };
    let title = (el: Game, typedText: string) => {
      let pattern = new RegExp(typedText.toLowerCase());
      return pattern.test(el.title.toLowerCase());
    }

    let filtered = this.gms.filter((game: Game) => {
      return price(game, this.filters.price.min, this.filters.price.max)
        && genre(game, this.filters.genres)
        && title(game, this.filters.title);
    });

    return filtered;
  }

  valueMax() {
    this.gms.forEach((game: Game) => {
      if (game.price && game.price > this.maxprice) {
        this.maxprice = game.price;
        this.filters.price.max = game.price;
      }
    })
  }

  addToUserGames(event: any) {
    this.dbservice.addGameToUserGames(event.target.dataset.key);
  }
}
