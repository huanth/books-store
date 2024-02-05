import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { authGuardAdmin } from './auth.guard';


const routes: Routes = [
  { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full'},
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'admin/books', loadChildren: () => import('./books/books.module').then(m => m.BooksModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }