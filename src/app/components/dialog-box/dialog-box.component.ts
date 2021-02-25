import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Esp} from "../../models/esp";

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  display: boolean;

  esp: Esp = {};

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    if (this.config?.data?.esp){
        this.esp = this.config.data.esp;
    }
  }

  closeDialog(esp: Esp): void {
    this.ref.close(esp);
  }

  closeEmpty(): void {
    this.ref.close();
  }
}
