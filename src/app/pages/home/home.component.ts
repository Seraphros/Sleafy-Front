import {Component, OnInit} from '@angular/core';
import {faBars, faPlusCircle, faTachometerAlt} from '@fortawesome/free-solid-svg-icons';
import {faCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faBars = faBars;
  faCircle = faCircle;
  faDashboard = faTachometerAlt;
  faPlus = faPlusCircle;

  date = new Date();

  constructor() {
  }

  public async ngOnInit() {
  }
}
