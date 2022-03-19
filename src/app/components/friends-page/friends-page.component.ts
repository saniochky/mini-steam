import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {User} from "../../models/models";

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.css']
})
export class FriendsPageComponent implements OnInit {
  input: string = '';
  status: string = 'display';
  isLoading: boolean = false;
  searchResult: { id: string, isFriend: boolean }[] = [];
  friends: string[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  onChangeInput(input: string) {
    this.status = 'display';
    this.input = input.toLowerCase();
  }

  onSearch() {
    this.status = 'search';
    this.isLoading = true;
    this.http
      .get<{ [key: string]: User }>('https://mini-steam-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .pipe(
        map(responseData => {
          const usersArray: { id: string, isFriend: boolean }[] = [];

          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const user = {...responseData[key]};

              if (user.hasOwnProperty('username') ? user.username!.toLowerCase().includes(this.input) : user.email.toLowerCase().includes(this.input)) {
                usersArray.push({
                  id: user.uid,
                  isFriend: this.friends.includes(user.uid)
                });
              }
            }
          }
          return usersArray;
        })
      )
      .subscribe(result => {
        this.searchResult = result;
        this.isLoading = false;
      });
  }

  onAddFriend(id: string) {
    this.friends.push(id);
    this.putFriends();
  }

  onRemoveFriend(id: string) {
    this.friends = this.friends.filter((el) => el !== id);
    this.putFriends();
  }

  getUsers() {
    this.isLoading = true;
    this.http
      .get<User>(`https://mini-steam-default-rtdb.europe-west1.firebasedatabase.app/users/ghmlCU0pC9MMzObhg2VN2TFdAiy1.json`)
      .subscribe(user => {
        this.isLoading = false;
        this.friends = user.hasOwnProperty('friends') ? [...user.friends!.values()] : [];
      });
  }

  putFriends() {
    this.http
      .put<string[]>(`https://mini-steam-default-rtdb.europe-west1.firebasedatabase.app/users/ghmlCU0pC9MMzObhg2VN2TFdAiy1/friends.json`, this.friends)
      .subscribe(data => {
        console.log('OK');
      });
  }

}
