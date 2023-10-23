import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {TodoComponent} from "./todo/todo.component";
import {notAuthGuard} from "./shared/guards/not-auth.guard";
import {authGuard} from "./shared/guards/auth.guard";
import {WrapperComponent} from "./wrapper/wrapper.component";

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: TodoComponent,
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [notAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
