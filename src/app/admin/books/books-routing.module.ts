import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';

// import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [
  { path: 'admin/books', redirectTo: 'admin/books/list', pathMatch: 'full'},
  { path: 'admin/books/list', component: ListComponent },
  { path: 'admin/books/create', component: CreateComponent },
  { path: 'admin/books/edit/:id', component: EditComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class BooksRoutingModule { }