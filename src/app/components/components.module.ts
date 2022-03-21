import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GamesPageComponent } from './games-page/games-page.component';
import { LibraryPageComponent } from './library-page/library-page.component';
import {AppModule} from "../app.module";



@NgModule({
  declarations: [
    GamesPageComponent,
    LibraryPageComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        AppModule
    ],
  exports: [
    GamesPageComponent,
    LibraryPageComponent
  ]
})
export class ComponentsModule { }
