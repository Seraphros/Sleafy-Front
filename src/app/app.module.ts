import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {KeycloakExampleComponent} from './pages/keycloakExample/keycloakexample.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatSidenavModule} from '@angular/material/sidenav';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {EspDeclarationComponent} from './pages/espDeclaration/espDeclaration.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggle, MatButtonToggleGroup, MatButtonToggleModule} from '@angular/material/button-toggle';
import {WeatherComponent} from './components/weather/weather.component';

registerLocaleData(localeFr, 'fr');

// tslint:disable-next-line:typedef
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://www.sleafy.fr/keycloak/auth',
        realm: 'Sleafy',
        clientId: 'Sleafy-front',
      },
      initOptions: {
        onLoad: 'login-required'
      },
    });
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EspDeclarationComponent,
    KeycloakExampleComponent,
    WeatherComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    KeycloakAngularModule,
    NgbModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
