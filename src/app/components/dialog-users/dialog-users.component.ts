import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {UserInformation} from '../../models/userInformation';
import {UserInformationService} from '../../services/user-information.service';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-dialog-users',
  templateUrl: './dialog-users.component.html',
  styleUrls: ['./dialog-users.component.css']
})
export class DialogUsersComponent implements OnInit {

  user: UserInformation = {
    city: '',
    name: ''
  };

  constructor(private keycloakService: KeycloakService, public ref: DynamicDialogRef, public config: DynamicDialogConfig, public userInformationService: UserInformationService) { }

  ngOnInit(): void {
    this.userInformationService.getUserInformation().subscribe(result => {
      this.user = result;
    },
      error => {
        this.keycloakService.loadUserProfile().then(r => {
            this.user.name = this.keycloakService.getUsername();
          }
        );
      });
  }

  addUser(): void{
    this.userInformationService.addCity(this.user.city).subscribe(value => {
      this.ref.close();
    });
  }

}
