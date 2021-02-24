import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {KeycloakExampleComponent} from './pages/keycloakExample/keycloakexample.component';
import {EspDeclarationComponent} from './pages/espDeclaration/espDeclaration.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'espdeclaration',
    component: EspDeclarationComponent
  },
  {
    path: 'kcexample',
    component: KeycloakExampleComponent
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
