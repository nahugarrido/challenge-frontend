import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
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
    this.authService.login(this.form.value).subscribe((data) => {
      this.cookieService.set('token', data.token);
      this.router.navigate(['/', 'panel']);
    });
  }
}
