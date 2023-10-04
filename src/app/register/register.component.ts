import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regForm = this.fb.nonNullable.group({
    firstName: this.fb.nonNullable.control<string>("", {validators: Validators.required}),
    email: this.fb.nonNullable.control<string>("", {validators: [Validators.required, Validators.email]}),
    password: this.fb.nonNullable.control<string>("", {validators: Validators.required}),
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private router: Router
  ) {
  }

  signUp() {
    const payload = this.regForm.getRawValue();
    this.authService.signUp(payload).subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: err => console.log(err)
    })
  }

  ngOnInit(): void {
  }

}
