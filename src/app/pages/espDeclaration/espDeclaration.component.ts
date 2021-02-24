import {Component, OnInit} from '@angular/core';
import {faBars, faPlusCircle, faTachometerAlt} from '@fortawesome/free-solid-svg-icons';
import {faCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './espDeclaration.component.html',
  styleUrls: ['./espDeclaration.component.css']
})
export class EspDeclarationComponent implements OnInit {

  faBars = faBars;
  faCircle = faCircle;
  faDashboard = faTachometerAlt;
  faPlus = faPlusCircle;

  date = new Date();

  constructor() {
  }

  public async ngOnInit() {
  }

  public navigateToDashboard(): void {
    window.location.assign('/dashboard');
  }
}
