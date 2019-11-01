import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../core/models/users.model';
import { UsersService } from '../core/services/users.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Grid } from '../core/models/user-grid.model';

// We have to use this due to import `fuzzy-search` javascript functionality
// there aren't any declaration file for `fuzzy-search`
declare const require: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  userData$: Observable<Array<IUser>>;
  userBackupData$: Observable<Array<IUser>>;
  gridOptions: any = new Grid();

  constructor(private userService: UsersService) {
    this.userBackupData$ = this.userData$ = this.userService.loadUsers();
  }

  ngOnInit() {
  }

  search(loginName: string): void {
    this.userData$ = this.userBackupData$.pipe(
      map((users: Array<IUser>) => {
        return this.fuzzySearch(loginName, users);
      })
    );
  }

  private fuzzySearch(loginName: string, users: Array<IUser>): Array<IUser> {
    const FuzzySearch = require('fuzzy-search');
    const searcher = new FuzzySearch(users, ['login'], {
      caseSensitive: false,
      space: true
    });

    const reverseKeyName: string = loginName.split(' ').reverse().join('');
    const keyName: string = loginName.split(' ').join('');

    const keyResult: Array<IUser> = searcher.search(keyName);
    const reverseKeyResult: Array<IUser> = searcher.search(reverseKeyName);

    const result: Array<IUser> = keyResult.concat(...reverseKeyResult);
    result.filter((item, index) => result.indexOf(item) === index);
    result.reduce((unique: Array<IUser>, item: IUser) => unique.includes(item) ? unique : [...unique, item], []);
    return result;
  }
}
