import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../model/User.model';
import {Subscription} from "rxjs";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users :User[];
 
  constructor(private userService: UserService) { }

  ngOnInit() {
      this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }
 
 /* add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.addUser({ name } as User)
      .subscribe(user => {
        this.users.push(user);
      });
  }*/
 
  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteUser(user).subscribe();
  }
}
