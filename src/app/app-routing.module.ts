import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { NavigationMaterialComponent } from './material/navigation-material/navigation-material.component';
import { DashboardMaterialComponent } from './material/dashboard-material/dashboard-material.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Ruta por defecto dentro de PanelComponent
  {
    path: 'dashboard',
    component: NavigationMaterialComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Ruta por defecto dentro de PanelComponent
      { path: 'home', component: DashboardMaterialComponent }, // Ruta para el componente HomeComponent dentro de PanelComponent
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
