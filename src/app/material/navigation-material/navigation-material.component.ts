import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navigation-material',
  templateUrl: './navigation-material.component.html',
  styleUrls: ['./navigation-material.component.css'],
})
export class NavigationMaterialComponent {
  readonly TIME_INTERVAL = 300000;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    setInterval(() => {
      if (!authService.isAuthenticated()) {
        authService.cleanUserData();
        router.navigateByUrl('/login');
      }
    }, this.TIME_INTERVAL);
  }
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
