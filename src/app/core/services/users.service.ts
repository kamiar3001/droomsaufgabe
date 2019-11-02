import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/users.model';
import { IUserDetail } from '../models/user-detail.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly endpoint: string = 'https://api.github.com/users';
  private readonly detail_endpoint: string = `${this.endpoint}/{0}`;

  constructor(private http: HttpClient) { }

  load(since: number, pageSize: number = 100): Observable<Array<IUser>> {
    let sinceParam = '';
    if (since > 0) {
      sinceParam = `&since=${since}`;
    }
    return this.http.get<Array<IUser>>(`${this.endpoint}?per_page=${pageSize}${sinceParam}`);
  }

  // there is no pagination system base on the current page and since is not based on sorted id
  // so we need to request server partialy in the other hand we need cache system for search
  // so one idea could be collecting data each seqment is one hunderd so the client request ten times
  // and collecting data after data has been collected so we need to sort this is not best technic,
  // but for demo project it could be nice idea
  cachefirstOneThousandUsers(): Observable<Array<IUser>> {
    const pageSize = 136;
    const arrayOfSince: Array<Observable<Array<IUser>>> = [
      this.load(0 * pageSize),
      this.load(1 * pageSize),
      this.load(3 * pageSize),
      this.load(4 * pageSize),
      this.load(5 * pageSize),
      this.load(6 * pageSize),
      this.load(7 * pageSize),
      this.load(9 * pageSize),
      this.load(10 * pageSize),
      this.load(11 * pageSize)
    ];
    // tslint:disable-next-line: deprecation
    return forkJoin(arrayOfSince).pipe(
      map((rowSet: Array<Array<IUser>>) => {
        // merge all row set from different request
        let rows: Array<IUser> = rowSet[0]
          .concat(...rowSet[1])
          .concat(...rowSet[2])
          .concat(...rowSet[3])
          .concat(...rowSet[4])
          .concat(...rowSet[5])
          .concat(...rowSet[6])
          .concat(...rowSet[7])
          .concat(...rowSet[8])
          .concat(...rowSet[9])
          .concat(...rowSet[10])
          .concat(...rowSet[11]);
        // sort by id
        rows = rows.sort((x, y) => x.id.valueOf() - y.id.valueOf());
        return rows;
      })
    );
  }

  loadDetail(userName: string): Observable<IUserDetail> {
    const url: string = this.detail_endpoint.replace('{0}', userName);
    return this.http.get<IUserDetail>(url);
  }

  followers(follower_url: string): Observable<number> {
    return this.http.get<number>(follower_url)
      .pipe(
        map((data: any) => {
          return data.length;
        })
      );
  }
}
