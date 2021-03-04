import { Component, OnInit } from '@angular/core';
import {faPlusCircle, faTachometerAlt} from '@fortawesome/free-solid-svg-icons';
import {KeycloakService} from 'keycloak-angular';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ConfirmationService} from 'primeng/api';
import {DialogUsersComponent} from '../dialog-users/dialog-users.component';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import {UserInformationService} from '../../services/user-information.service';
import {UserInformation} from '../../models/userInformation';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [DialogService]
})
export class SidebarComponent implements OnInit {

  userName = '';


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
  ref: DynamicDialogRef;
  user: UserInformation;

  constructor(private userInformationService: UserInformationService,
              private readonly keycloak: KeycloakService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.keycloak.loadUserProfile().then(r => {
        this.userName = this.keycloak.getUsername();
      }
    );
  }

  logout(): void {
    this.keycloak.logout();
  }


  displayUserBox(): void{
    this.ref = this.dialogService.open(DialogUsersComponent, {
      header: 'User Informations',
      width: '20%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });
  }

}
