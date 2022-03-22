import { Component, OnInit } from '@angular/core';
import { SignInService } from '../../shared/services/sign-in.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../shared/services/user';
import{AppComponent} from '../../app.component'
import { LogoutComponent } from '../logout/logout.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {

  constructor(
    public firebaseAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public firebaseService: SignInService,
    public ap: AppComponent,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('id') !== null) this.ap.isSignedIn = true;
    else this.ap.isSignedIn = false;
  }
  async onSignin(email: string, password: string) {
    await this.firebaseService.signin(email, password);
    console.log(localStorage.getItem('id'));

    if (this.firebaseService.isLogged) this.ap.isSignedIn = true;
    console.log(this.ap.isSignedIn);
    await this.router.navigate(['/friends']);
  }

}
