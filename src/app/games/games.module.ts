import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibgamesComponent } from './libgames/libgames.component';
import { UsergamesComponent } from './usergames/usergames.component';



@NgModule({
  declarations: [
    LibgamesComponent,
    UsergamesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LibgamesComponent,
    UsergamesComponent
  ]
})
export class GamesModule { }
