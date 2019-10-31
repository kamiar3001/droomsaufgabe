import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';

import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';

const appRoutes: Routes = [
  { path: '', component: ListComponent },
  { path: 'detail', component: DetailComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
