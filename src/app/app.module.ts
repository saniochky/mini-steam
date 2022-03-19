import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoaderComponent} from './shared/loader/loader.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {FriendsPageComponent} from './components/friends-page/friends-page.component';
import {FriendComponent} from './components/friend/friend.component';
import {FriendsSearchComponent} from './components/friends-search/friends-search.component';
import {FormsModule} from "@angular/forms";
import {CardComponent} from './shared/card/card.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./guards/auth.guard";
import {NoAuthGuard} from "./guards/no-auth.guard";
import {Permissions} from "./services/permissions.service";

const routes: Routes = [
  // { path: 'sign-in', canActivate: [NoAuthGuard], component: SignInComponent },
  // { path: 'sign-up', canActivate: [NoAuthGuard], component: SignUpComponent },
  // { path: 'user-profile', canActivate: [AuthGuard], component: UserProfileComponent },
  { path: 'friends', canActivate: [AuthGuard], component: FriendsPageComponent },
  // { path: 'games', canActivate: [AuthGuard], component: GamesPageComponent },
  // { path: 'library', canActivate: [AuthGuard], component: LibraryPageComponent },
  { path: '**', redirectTo: 'friends', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    NavbarComponent,
    FriendsPageComponent,
    FriendComponent,
    FriendsSearchComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard, NoAuthGuard, Permissions],
  bootstrap: [AppComponent]
})
export class AppModule {
}
