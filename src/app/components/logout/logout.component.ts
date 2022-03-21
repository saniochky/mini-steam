import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoguotService } from '../../shared/services/loguot.service';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {

  @Output() isLogout = new EventEmitter<void>();
  constructor(public firebaseService: LoguotService, public ap: AppComponent) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) this.ap.isSignedIn = true;
    else this.ap.isSignedIn = false;
  }
  logout() {
    this.firebaseService.logout();
    this.isLogout.emit();
  }
  handleLogout() {
    this.ap.isSignedIn = false;
  }
}
