import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { UsersService } from '../core/services/users.service';
import { IUserDetail } from '../core/models/user-detail.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private loginName: string;
  userDetails$: Observable<IUserDetail>;
  routeLoad$: Observable<Params>;

  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit() {
    this.routeLoad$ = this.route.queryParams
      .pipe(
        filter(params => params.id),
        tap(params => {
          this.loginName = params.id;
          this.userDetails$ = this.usersService.loadDetail(this.loginName);
        })
      );
  }
}
