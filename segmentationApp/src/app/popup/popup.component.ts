import { Component, Inject, OnInit, Type } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogData, HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  message: string;
  isError:Boolean;
  buttonDisabled= true;

  constructor(public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private route: ActivatedRoute, private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.message = this.data.message;
    this.isError = this.data.logo;
  }

  save() {
    this.dialogRef.close();
}

close() {
    this.dialogRef.close();
}

onChange(event){
  this.buttonDisabled = false
}

  

}
