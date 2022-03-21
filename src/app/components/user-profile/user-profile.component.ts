import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../shared/services/user-profile.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../shared/services/user';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    public firebaseAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public userProfileService: UserProfileService,
    public ap: AppComponent
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) this.ap.isSignedIn = true;
    else this.ap.isSignedIn = false;
  }
  async onChanginUsername(username: string) {
    await this.userProfileService.updateUsername(username);

    // if (this.userProfileService.isLogged) this.ap.isSignedIn = true;
    // console.log(this.ap.isSignedIn);
  }
  async onChanginAge(age: string) {
    await this.userProfileService.updateAge(age);
  }
  async updatingData(username: string, age: string){
    await this.userProfileService.checkUpdates(username, age)
  }
}
