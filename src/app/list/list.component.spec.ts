import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ListComponent } from './list.component';
import { UsersService } from '../core/services/users.service';
import { of } from 'rxjs';
import { IUser } from '../core/models/users.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AgGridModule } from 'ag-grid-angular';
import { AvatarComponent } from '../avatar/avatar.component';
import { FollowersComponent } from '../followers/followers.component';
import { DetailGridCellComponent } from '../detail-grid-cell/detail-grid-cell.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let userServiceSpy: jasmine.SpyObj<UsersService> = null;

  beforeEach(async(() => {
    userServiceSpy = jasmine.createSpyObj('UsersService', ['cachefirstOneThousandUsers']);
    TestBed.configureTestingModule({
      declarations: [
        AvatarComponent,
        FollowersComponent,
        DetailGridCellComponent,
        ListComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AgGridModule.withComponents([
          AvatarComponent,
          FollowersComponent,
          DetailGridCellComponent
        ])
      ],
      providers: [
        { provide: UsersService, useValue: userServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const defaultValues: Array<IUser> = [
      { login: 'loginname', id: 1 },
      { login: 'Nally Lowen', id: 2 },
      { login: 'peter' },
      { login: 'adam' },
      { login: 'parviz' },
      { login: 'sina' },
      { login: 'John' },
      { login: 'na.lo@gmail.com', id: 3 }
    ];
    userServiceSpy.cachefirstOneThousandUsers.and.returnValue(of(defaultValues));
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ListComponent', () => {
    it('should return result', fakeAsync(() => {
      // Arrange
      const searchValue = 'na lo';
      const expectedValues: Array<IUser> = [
        { login: 'loginname', id: 1 },
        { login: 'Nally Lowen', id: 2 },
        { login: 'na.lo@gmail.com', id: 3 }
      ];
      let returnData: Array<IUser>;

      // Act
      component.search(searchValue);
      component.userData$.subscribe((data: Array<IUser>) => {
        returnData = data.sort((x, y) => x.id.valueOf() - y.id.valueOf());
      });
      tick();

      // Assert
      expect(returnData)
        .toEqual(expectedValues);
    }));
  });
});
