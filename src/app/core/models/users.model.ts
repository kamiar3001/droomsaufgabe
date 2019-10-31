import { Observable } from 'rxjs';

export interface IUser {
    login: string;
    id: number;
    avatar_url: string;
    url: string;
    followers_url: string;
    followerCount?: Observable<number>;
    site_admin: boolean;
}
