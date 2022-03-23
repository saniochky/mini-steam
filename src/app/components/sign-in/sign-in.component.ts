import {Component, OnInit} from '@angular/core';
import {SignInService} from '../../shared/services/sign-in.service';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AppComponent} from '../../app.component'
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
  ) {
  }

  ngOnInit(): void {
    this.ap.isSignedIn = localStorage.getItem('id') !== null;
  }

  async onSignin(email: string, password: string) {
    await this.firebaseService.signin(email, password);

    if (this.firebaseService.isLogged) this.ap.isSignedIn = true;
    await this.router.navigate(['/friends']);
  }

}
