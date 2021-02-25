import { Component, OnInit } from '@angular/core';
import {faBars, faInfo, faPlusCircle, faTachometerAlt, faObjectGroup, faSearchPlus, faMinusCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  sideItems = [
    {
      icon : faPlusCircle,
      name: 'ESP Manager',
      path: '/espdeclaration',
    },
    {
      icon : faTachometerAlt,
      name: 'Dashboard',
      path: '/dashboard',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
