import {Component, OnInit} from '@angular/core';

import {AngularFireDatabase} from '@angular/fire/compat/database';
import {Observable} from 'rxjs';
import {User} from './shared/services/user';

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
    public db: AngularFireDatabase
  ) {
    this.users = db.list('users').valueChanges() as Observable<User[]>;
  }

  ngOnInit(): void {
    this.isSignedIn = localStorage.getItem('id') !== null;
  }


  handleLogout() {
    this.isSignedIn = false;
  }
}
