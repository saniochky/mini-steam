import {Component, OnInit} from '@angular/core';
import {UserProfileService} from '../../shared/services/user-profile.service';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AppComponent} from '../../app.component';

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
  ) {
  }

  ngOnInit(): void {
    this.ap.isSignedIn = localStorage.getItem('id') !== null;
  }

  async onChanginUsername(username: string) {
    await this.userProfileService.updateUsername(username);

  }

  async onChanginAge(age: string) {
    await this.userProfileService.updateAge(age);
  }

  async updatingData(username: string, age: string) {
    await this.userProfileService.checkUpdates(username, age);
  }
}
