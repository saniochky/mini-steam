import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {BrowserModule} from '@angular/platform-browser';

import {FirebaseService} from './services/firebase.service';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {LogoutComponent} from './components/logout/logout.component';
import {AppRoutingModule} from '../app/app-routing/app-routing.module';
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
import {environment} from '../environments/environment';
import {GamesPageComponent} from "./components/games-page/games-page.component";
import {LibraryPageComponent} from "./components/library-page/library-page.component";

const routes: Routes = [
  // { path: 'sign-in', canActivate: [NoAuthGuard], component: SignInComponent },
  // { path: 'sign-up', canActivate: [NoAuthGuard], component: SignUpComponent },
  // { path: 'user-profile', canActivate: [AuthGuard], component: UserProfileComponent },
  { path: 'friends', canActivate: [AuthGuard], component: FriendsPageComponent },
  { path: 'games', canActivate: [AuthGuard], component: GamesPageComponent },
  { path: 'library', canActivate: [AuthGuard], component: LibraryPageComponent },
  { path: '**', redirectTo: 'friends', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    UserProfileComponent,
    LogoutComponent,
    LoaderComponent,
    NavbarComponent,
    FriendsPageComponent,
    FriendComponent,
    FriendsSearchComponent,
    CardComponent,
    GamesPageComponent,
    LibraryPageComponent
  ],
  imports: [
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard, NoAuthGuard, Permissions, FirebaseService],
  exports: [
    NavbarComponent,
    CardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
