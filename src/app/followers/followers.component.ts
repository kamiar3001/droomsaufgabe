import { Component, OnInit } from '@angular/core';
import { UsersService } from '../core/services/users.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent {
  params: any;

  constructor(private userService: UsersService) { }

  agInit(params: any): void {
    this.params = params;
  }

  getFollower() {
    this.params.followerCount = this.userService.followers(this.params.value);
  }
}
