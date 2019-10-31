import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { UsersService } from '../core/services/users.service';
import { of } from 'rxjs';
import { IUser } from '../core/models/users.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let userServiceSpy: jasmine.SpyObj<UsersService> = null;

  beforeEach(async(() => {
    userServiceSpy = jasmine.createSpyObj('UsersService', ['loadUsers']);
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        HttpClientTestingModule
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
    userServiceSpy.loadUsers.and.returnValue(of(defaultValues));
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fdescribe('ListComponent', () => {
    fit('should return result', fakeAsync(() => {
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
