import {Component, OnInit} from '@angular/core';
import {LogoutService} from "../services/logout.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public firebaseService: LogoutService) {
  }

  ngOnInit(): void {
  }

  async logout() {
    await this.firebaseService.logout();
  }

}
