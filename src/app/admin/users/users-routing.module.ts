import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';

// import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [
  { path: 'admin/users', redirectTo: 'admin/users/list', pathMatch: 'full'},
  { path: 'admin/users/list', component: ListComponent },
  { path: 'admin/users/create', component: CreateComponent },
  { path: 'admin/users/edit/:id', component: EditComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }