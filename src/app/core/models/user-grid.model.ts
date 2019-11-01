import { AvatarComponent } from 'src/app/avatar/avatar.component';
import { FollowersComponent } from 'src/app/followers/followers.component';
import { DetailGridCellComponent } from 'src/app/detail-grid-cell/detail-grid-cell.component';

export class Grid {
    columnDefs: any = [
        { headerName: 'Id', field: 'id' },
        { headerName: 'Avatar', field: 'avatar_url', cellRendererFramework: AvatarComponent },
        { headerName: 'Login', field: 'login' },
        { headerName: 'Followers', field: 'followers_url', cellRendererFramework: FollowersComponent },
        { headerName: 'Detail', field: 'url', cellRendererFramework: DetailGridCellComponent }
    ];
    rowHeight = 50;
}
