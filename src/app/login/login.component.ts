import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm = this.fb.nonNullable.group({
    email: this.fb.nonNullable.control<string>("",{validators:[Validators.required, Validators.email]}),
    password: this.fb.nonNullable.control<string>("", {validators: Validators.required}),
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private router: Router
  ) {}


  signIn(){
    const payload = this.loginForm.getRawValue()
    this.authService.signIn(payload).subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: (err) => console.error(err),
    });
  }
  ngOnInit(): void {
  }
}
