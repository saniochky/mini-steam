import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibgamesComponent } from './libgames/libgames.component';
import { UsergamesComponent } from './usergames/usergames.component';
import { DbgamesService } from './dbgames.service'



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
  ],
  providers: [
    DbgamesService
  ]
})
export class GamesModule { }
