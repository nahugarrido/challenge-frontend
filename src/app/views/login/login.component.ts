import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      type: ['', [Validators.required]],
      userID: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  send(): any {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const activeUserId = this.form.value.userID;
    this.authService.login(this.form.value).subscribe(
      (data) => {
        this.authService.saveUserData(data.token, activeUserId);
        this.router.navigate(['/', 'dashboard']);
      },
      () => {
        this.authService.cleanUserData();
      }
    );
  }
}
