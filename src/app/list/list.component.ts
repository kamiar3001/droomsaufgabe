import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../core/models/users.model';
import { UsersService } from '../core/services/users.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  userData$: Observable<Array<IUser>>;
  userBackupData$: Observable<Array<IUser>>;
  constructor(private userService: UsersService) {
    this.userBackupData$ = this.userData$ = this.userService.loadUsers();
  }

  ngOnInit() {
  }

  getFollower(item: IUser) {
    item.followerCount = this.userService.followers(item.followers_url);
  }

  search(loginName: string): void {
    this.userData$ = this.userBackupData$.pipe(
      map((users: Array<IUser>) => {
        const FuzzySearch = require('fuzzy-search');
        const searcher = new FuzzySearch(users, ['login'], {
          caseSensitive: false
        });
        const result = searcher.search(loginName);
        return result as Array<IUser>;
      })
    );
  }
}
