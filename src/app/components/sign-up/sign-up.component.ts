import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../../services/sign-up.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { User } from '../../shared/services/user';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  users: Observable<User[]>;
  title = 'mini-steam';
  
  constructor(
    public firebaseService: SignUpService,
    public db: AngularFireDatabase,
    public ap: AppComponent
  ) {
    const users = db.list('users').valueChanges() as Observable<User[]>;


    this.users = users;
  }
  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) this.ap.isSignedIn = true;
    else this.ap.isSignedIn = false;
  }
  async onSignup(email: string, password: string) {
    await this.firebaseService.signup(email, password);
    if (this.firebaseService.isLogged) this.ap.isSignedIn = true;
  }
}