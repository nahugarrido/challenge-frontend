import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  readonly TIME_INTERVAL = 300000;
  user!: User;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService
  ) {
    setInterval(() => {
      if (!authService.isAuthenticated()) {
        authService.cleanUserData();
        router.navigateByUrl('/login');
      }
    }, this.TIME_INTERVAL);
  }

  ngOnInit(): void {
    this.updateUser();
  }

  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  updateUser() {
    const activeUserID = this.authService.getActiveUserId() as string;
    this.userService.getUserInformation(activeUserID).subscribe((user) => {
      this.user = user;
    });
  }
}
