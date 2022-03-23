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
    this.getUsers(localStorage.getItem('id'));
  }

  onChangeInput(input: string) {
    this.status = 'display';
    this.input = input.toLowerCase();
  }

  onSearch() {
    this.status = 'search';
    this.isLoading = true;
    const username = this.getUsername(localStorage.getItem('id'));
    this.http
      .get<{ [key: string]: User }>('https://mini-steam-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .pipe(
        map(responseData => {
          const usersArray: { id: string, isFriend: boolean }[] = [];

          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const user = {...responseData[key]};

              if (user.hasOwnProperty('username') ?
                user.username!.toLowerCase().includes(this.input) && username.username !== user.username!.toLowerCase() :
                user.email.toLowerCase().includes(this.input) && username.email !== user.email.toLowerCase()) {
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
    this.putFriends(localStorage.getItem('id'));
  }

  onRemoveFriend(id: string) {
    this.friends = this.friends.filter((el) => el !== id);
    this.putFriends(localStorage.getItem('id'));
  }

  getUsername(id: string | null) {
    const username: { email: string, username: string } = {email: '', username: ''};

    this.http
      .get<string>(`https://mini-steam-default-rtdb.europe-west1.firebasedatabase.app/users/${id}/email.json`)
      .subscribe(email => {
        username.email = email;
      });
    this.http
      .get<string>(`https://mini-steam-default-rtdb.europe-west1.firebasedatabase.app/users/${id}/username.json`)
      .subscribe(name => {
        if (name) {
          username.username = name;
        }
      });

    return username;
  }

  getUsers(id: string | null) {
    this.isLoading = true;
    this.http
      .get<User>(`https://mini-steam-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`)
      .subscribe(user => {
        this.isLoading = false;
        this.friends = user.hasOwnProperty('friends') ? [...user.friends!.values()] : [];
      });
  }

  putFriends(id: string | null) {
    this.http
      .put<string[]>(`https://mini-steam-default-rtdb.europe-west1.firebasedatabase.app/users/${id}/friends.json`, this.friends)
      .subscribe(data => {
      });
  }

}
