import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './shared/services/firebase.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { User } from './shared/services/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  users: Observable<User[]>;
  title = 'mini-steam';
  isSignedIn = false;
  constructor(
    public firebaseService: FirebaseService,
    public db: AngularFireDatabase
  ) {
    const users = db.list('users').valueChanges()  as Observable<User[]>;
    console.log('users', users);

    this.users = users;
  }
  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) this.isSignedIn = true;
    else this.isSignedIn = false;
  }
  // async onSignup(email: string, password: string) {
  //   await this.firebaseService.signup(email, password);
  //   if (this.firebaseService.isLogged) this.isSignedIn = true;
  // }
  // async onSignin(email: string, password: string) {
  //   await this.firebaseService.signin(email, password);
  //   if (this.firebaseService.isLogged) this.isSignedIn = true;
  // }

  handleLogout() {
    this.isSignedIn = false;
  }
}
