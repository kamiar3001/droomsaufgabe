import { Component } from '@angular/core';
import { UsersService } from './core/services/users.service';
import { Observable } from 'rxjs';
import { IUser } from './core/models/users.model';
import { map } from 'rxjs/operators';
import FuzzySearch from 'fuzzy-search';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  userData$: Observable<Array<IUser>>;
  userBackupData$: Observable<Array<IUser>>;
  constructor(private userService: UsersService) {
    this.userBackupData$ = this.userData$ = this.userService.loadUsers();
  }

  getFollower(item: IUser) {
    item.followerCount = this.userService.followers(item.followers_url);
  }

  search(loginName: string) {
    this.userData$ = this.userBackupData$.pipe(
      map((users: Array<IUser>) => {
        const searcher = new FuzzySearch(users, ['login'], {
          caseSensitive: true
        });
        const result = searcher.search(loginName);
        return result as Array<IUser>;
      })
    );

  }
}
