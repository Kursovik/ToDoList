import {NgModule} from "@angular/core";
import { RegistrationComponent } from './registration/registration/registration.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {RouterModule} from "@angular/router";
import {ButtonModule} from "primeng/button";
import { LoginComponent } from './login/login/login.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'login',
        component: LoginComponent,
      }
    ]),
    InputTextModule,
    ButtonModule
  ]
})
export class AuthorizationModule{}
