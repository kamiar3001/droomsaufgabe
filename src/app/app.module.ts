import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list/list.component';
import { AppRoutingModule } from './app-routing.module';

import { AgGridModule } from 'ag-grid-angular';

import { DetailComponent } from './detail/detail.component';
import { ListDetailItemComponent } from './list-detail-item/list-detail-item.component';
import { AvatarComponent } from './avatar/avatar.component';
import { FollowersComponent } from './followers/followers.component';
import { DetailGridCellComponent } from './detail-grid-cell/detail-grid-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailComponent,
    ListDetailItemComponent,
    AvatarComponent,
    FollowersComponent,
    DetailGridCellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    AgGridModule.withComponents([
      AvatarComponent,
      FollowersComponent,
      DetailGridCellComponent
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
