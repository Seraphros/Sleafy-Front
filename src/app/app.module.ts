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
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatButtonToggle, MatButtonToggleGroup, MatButtonToggleModule} from '@angular/material/button-toggle';
import {WeatherComponent} from './components/weather/weather.component';
import {TableModule} from 'primeng/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from "@angular/forms";
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { HttpClientModule } from '@angular/common/http';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputNumberModule} from 'primeng/inputnumber';

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
    SidebarComponent,
    DialogBoxComponent,
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
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatButtonModule,
        MatButtonToggleModule,
        TableModule,
        FlexLayoutModule,
        DialogModule,
        InputTextModule,
        FormsModule,
        DynamicDialogModule,
        HttpClientModule,
        ConfirmDialogModule,
        DropdownModule,
        InputSwitchModule,
        InputNumberModule
    ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  entryComponents: [
    DialogBoxComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
