import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-friends-search',
  templateUrl: './friends-search.component.html',
  styleUrls: ['./friends-search.component.css']
})
export class FriendsSearchComponent implements OnInit {
  input: string = '';
  @Output() searchFriend = new EventEmitter<string>();
  @Output() changedInput = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  searchInputFriend() {
    this.searchFriend.emit();
  }

  inputChanged(event: Event) {
    this.input = (<HTMLInputElement>event.target).value;
    this.changedInput.emit(this.input);
  }

}
