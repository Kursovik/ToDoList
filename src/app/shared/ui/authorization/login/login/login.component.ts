import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {UserService} from "../../../../services/users/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly userService: UserService) {}
  public ngOnInit(): void {
    this.initForm();
  }
  public loginUser() {
    this.userService.login(this.loginForm.value).subscribe();
  }
  private initForm() {
    this.loginForm = this.fb.group({
      email: [null],
      password: [null],
    });
  }
}
