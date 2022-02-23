import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesPageComponent } from '../games-page/games-page.component';
import { LibraryPageComponent } from '../library-page/library-page.component';



@NgModule({
  declarations: [
    GamesPageComponent,
    LibraryPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
