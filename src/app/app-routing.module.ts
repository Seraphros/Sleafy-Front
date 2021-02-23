import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {KeycloakExampleComponent} from './pages/keycloakExample/keycloakexample.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'kcexample',
    component: KeycloakExampleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
