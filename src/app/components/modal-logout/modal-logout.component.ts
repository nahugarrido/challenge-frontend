import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-logout',
  templateUrl: './modal-logout.component.html',
  styleUrls: ['./modal-logout.component.css'],
})
export class ModalLogoutComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  logOutHandler(): void {
    this.authService.cleanUserData();
    this.router.navigate(['login']);
    this.dialog.closeAll();
  }

  closeLogOutDialog(): void {
    this.dialog.closeAll();
  }
}
