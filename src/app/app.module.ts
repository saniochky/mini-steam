import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppComponent } from './app.component';
// import { HomeComponent } from './home/home.component';
import { FirebaseService } from './services/firebase.service';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LogoutComponent } from './components/logout/logout.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { SignInComponent } from './components/sign-in/sign-in.component';
// import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AppRoutingModule } from '../app/app-routing/app-routing.module';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    UserProfileComponent,
    LogoutComponent,
    
  ],
  imports: [
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyDwAtAGHtMDtQtC-uK1s9wXHnkeqmhmbYA',
      authDomain: 'mini-steam.firebaseapp.com',
      databaseURL:
        'https://mini-steam-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'mini-steam',
      storageBucket: 'mini-steam.appspot.com',
      messagingSenderId: '6891832047',
      appId: '1:6891832047:web:35c0f46e4c1601d224911a',
    }),
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
