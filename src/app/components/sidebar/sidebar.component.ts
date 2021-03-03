import { Component, OnInit } from '@angular/core';
import {faPlusCircle, faTachometerAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  sideItems = [
    {
      icon : faTachometerAlt,
      name: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon : faPlusCircle,
      name: 'ESP Manager',
      path: '/espdeclaration',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
