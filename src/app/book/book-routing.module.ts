import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [
  { path: 'book', redirectTo: 'book/list', pathMatch: 'full'},
  { path: 'book/list', component: ListComponent },
  { path: 'book/detail/:id', component: DetailComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class BookRoutingModule { }