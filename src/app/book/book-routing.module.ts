import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

// import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [
  { path: 'book', redirectTo: 'book/list', pathMatch: 'full'},
  { path: 'book/list', component: ListComponent },
  { path: 'book/:id', component: DetailComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class BookRoutingModule { }