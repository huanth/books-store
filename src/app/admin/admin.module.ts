import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AdminRoutingModule } from './admin-routing.module';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    BooksModule,
    UsersModule,
    AdminRoutingModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class AdminModule { }
