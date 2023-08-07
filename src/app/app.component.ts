import { Component } from '@angular/core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'challenge-frontend';
  faHouse = faHouse;
  readonly TIME_INTERVAL = 300000;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    setInterval(() => {
      if (!authService.isAuthenticated()) {
        authService.cleanUserData();
        router.navigateByUrl('/login');
      }
    }, this.TIME_INTERVAL);
  }
}
