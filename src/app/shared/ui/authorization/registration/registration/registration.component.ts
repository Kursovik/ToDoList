import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from "../../../../services/users/user.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public regForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly userService: UserService) {}
  public ngOnInit(): void {
    this.initRegForm();
  }
  private initRegForm() {
    this.regForm = this.fb.group({
      name: [null, [Validators.required, ]],
      email: [null, [Validators.pattern(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu)]],
      password: [null],
    });
  }

  public createUser(){
    this.userService.register(this.regForm.value).subscribe();
  }
}
