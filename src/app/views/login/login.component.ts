import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      type: [''],
      userID: [''],
      password: [''],
    });
  }

  send(): any {
    if (this.form.invalid) {
      return;
    }
    this.authService.login(this.form.value).subscribe((data) => {
      sessionStorage.setItem('token', data.token);
      this.router.navigate(['/', 'panel']);
    });
  }
}
