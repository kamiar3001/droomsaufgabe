import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/users.model';
import { IUserDetail } from '../models/user-detail.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly limit: number = 1000;
  private readonly endpoint: string = 'https://developer.github.com/v3/users/';
  private readonly detail_endpoint: string = 'https://developer.github.com/v3/users/{0}';

  constructor(private http: HttpClient) { }

  loadUsers(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(this.endpoint);
  }

  loadDetail(userName: string): Observable<IUserDetail> {
    const url: string = this.detail_endpoint.replace('{0}', userName);
    return this.http.get<IUserDetail>(url);
  }

  // in memory search should implement here
  searchUser(name: string): Observable<Array<IUser>> {
    throw new Error('not implement');
  }
}
