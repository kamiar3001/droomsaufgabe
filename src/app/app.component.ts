import { Component } from '@angular/core';
import { UsersService } from './core/services/users.service';
import { Observable } from 'rxjs';
import { IUser } from './core/models/users.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  userData$: Observable<Array<IUser>>;
  constructor(private userService: UsersService) {
    this.userData$ = this.userService.loadUsers();
  }

  getFollower(item: IUser) {
    item.followerCount = this.userService.followers(item.followers_url);
  }
}
