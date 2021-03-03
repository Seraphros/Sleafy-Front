import {Component, OnInit} from '@angular/core';
import {faBars, faPlusCircle, faTachometerAlt} from '@fortawesome/free-solid-svg-icons';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {Esp} from "../../models/esp";
import {DialogBoxComponent} from '../../components/dialog-box/dialog-box.component';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {EspService} from "../../services/esp.service";
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './espDeclaration.component.html',
  styleUrls: ['./espDeclaration.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class EspDeclarationComponent implements OnInit {

  title = 'ESP Manager';
  faBars = faBars;
  faCircle = faCircle;
  faDashboard = faTachometerAlt;
  faPlus = faPlusCircle;

  date = new Date();
  esp: Esp[] = [];
  espDialog: Esp  = {};
  espSelected: Esp;
  display: boolean;
  titleDialog: any = 'Add new ESP';
  ref: DynamicDialogRef;
  statuses = [];
  dialogWidth = '40%';
  returnObject = {
    title: 'Esp ADD',
    message: 'The asp has been created',
    display: false,
    uuid: '',
    secretKey: ''
  };
  constructor(private confirmationService: ConfirmationService, private dialogService: DialogService, private espService: EspService) {
  }

  public ngOnInit(): void {
    this.getEspValues();
    this.statuses = [
      {label: 'Yes', value: 'true'},
      {label: 'No', value: 'false'}
    ];
  }

    newEspDialog(): void {
    this.ref = this.dialogService.open(DialogBoxComponent, {
      header: 'Add new ESP',
      width: this.dialogWidth,
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((esp: Esp) => {
      if(esp){
        this.espService.addEsp(esp).subscribe(save => {
          this.returnObject.title = 'ESP CREATED';
          this.returnObject.message = 'The ESP has been created with success';
          this.returnObject.secretKey = save.secretKey;
          this.returnObject.uuid = save.uuid;
          this.returnObject.display = true;
          this.getEspValues();
        });
      }
      else{
        console.log('Dont save');
      }

    });

    }


    private getEspValues(): void {
      this.espService.getEsp().subscribe(data => {
        this.esp = data;
      });
    }

   updateEspDialog(): void {
    this.ref = this.dialogService.open(DialogBoxComponent, {
      data: {
        esp: this.espSelected
      },
      header: 'Update Esp Information',
      width: this.dialogWidth,
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((esp: Esp) => {
      if(esp){
        this.espService.updateEsp(esp).subscribe(
          value => {
            this.getEspValues();
          }
        );
      }
    });
  }

  deleteEsp(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this esp ?',
      header: 'Be careful !',
      accept: () => {
        this.espService.deleteEsp(this.espSelected.id).subscribe(value => {
          this.espSelected = null;
          this.getEspValues();
        });
      }
    });
  }

  private resetSecret(): void {
    this.espService.resetSecretKey(this.espSelected.id).subscribe(value => {
      this.returnObject.title = 'SECRET KEY RESET';
      this.returnObject.message = 'The secret key has been reset';
      this.returnObject.secretKey = value.secretKey;
      this.returnObject.uuid = value.uuid;
      this.returnObject.display = true;
    });
  }
}
