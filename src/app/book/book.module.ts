import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

import { BookRoutingModule } from './book-routing.module';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule
  ],
  exports: [
    ListComponent,
    DetailComponent
  ]
})
export class BookModule { }
