import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Friend} from "../../models/models";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  friend: Friend = {
    email: ''
  };
  @Input() id: string | undefined;
  @Input() isFriend: boolean | undefined;
  @Output() friendAdded = new EventEmitter<string>();
  @Output() friendRemoved = new EventEmitter<string>();

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http
      .get(`https://mini-steam-default-rtdb.europe-west1.firebasedatabase.app/users/${this.id}.json`)
      .subscribe((user: any) => {
        this.friend = {
          email: user.email,
          username: user.username,
          isFriend: this.isFriend
        };
      });
  }

  addFriend() {
    this.friend.isFriend = true;
    this.friendAdded.emit(this.id);
  }

  removeFriend() {
    this.friend.isFriend = false;
    this.friendRemoved.emit(this.id);
  }

}
