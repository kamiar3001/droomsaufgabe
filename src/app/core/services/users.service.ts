import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/users.model';
import { IUserDetail } from '../models/user-detail.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly limit: number = 1000;
  private readonly endpoint: string = 'https://api.github.com/users';
  private readonly detail_endpoint: string = `${this.endpoint}/{0}`;

  constructor(private http: HttpClient) { }

  loadUsers(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(this.endpoint);
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
