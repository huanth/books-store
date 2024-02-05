import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({  
     declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        AuthRoutingModule
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ],
    providers: [],
})
export class AuthModule { }