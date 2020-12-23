
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Addressess } from '../model/Addressess';
import { Base0 } from '../model/Base0';
import { Base1 } from '../model/Base1';
import { SegmentService } from '../services/segment.service';
import { UserParameters } from '../../app/model/UserParameters';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

export interface DialogData {
  error: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  paramsForm: FormGroup;
  params: any;
  isInputParam: Boolean = false;
  base0Object: Base0;
  base1Object: Base1;
  addressesObject: Addressess;
  addressesList = [];
  closeResult = '';
  error: string;

  constructor(private fb: FormBuilder,
    private segmentService: SegmentService,
    private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.paramsForm = this.fb.group({
      seed: [0, Validators.required],
      asize: ['', Validators.required],
      psize: ['', Validators.required],
      address: ['', Validators.required],
      len0: ['', Validators.required],
      len1: ['', Validators.required],
      base0: ['', Validators.required],
      base1: ['', Validators.required],
      numaddrs: [0, Validators.required]
    });
  }

  sendParams(information: UserParameters) {

    this.setParamsValues(information);
    this.segmentService.sendParams(information).subscribe((data) => {
      this.showData(data);
    });
  }

  greet(information: FormGroup) {
    this.paramsForm = information;
  }

  setParamsValues(information: UserParameters) {
    this.paramsForm.setValue({
      seed: information.seed,
      asize: information.asize,
      psize: information.psize,
      address: information.address,
      len0: information.len0,
      len1: information.len1,
      base0: information.base0,
      base1: information.base1,
      numaddrs: information.numaddrs
    });
  }

  setDefaultValues() {
    this.isInputParam = false;
    this.paramsForm.patchValue({
      seed: 0,
      asize: '1k',
      psize: '16k',
      address: '-1',
      len0: '-1',
      len1: '-1',
      base0: '-1',
      base1: '-1',
      numaddrs: 0,
    });

    this.segmentService.sendParams(this.paramsForm).subscribe((data) => {
      this.showData(data);
    });
  }

  showData(data) {
    this.params = data;
    if (data['error']) {
      this.error = data['error'];
      this.openDialog();
     // console.log(data['error']);
    } else {
      this.setValues(data['base0'], data['base1']);
      this.setAddresses(data['virtualAddressTrace']);
      this.router.navigate(['graphic-result'], { queryParams: { info: JSON.stringify(data) } })
      this.resetValues()
    }
  }

  showParamsForm() {
    this.isInputParam = true;
  }

  resetValues() {
    this.paramsForm.reset()
  }

  setValues(base0Object, base1Object) {
    this.base0Object = base0Object;
    this.base1Object = base1Object;
  }

  setAddresses(addresses) {
    addresses.forEach(element => {
      this.addressesObject = element;
      this.addressesList.push(this.addressesObject)
    });
  }

  openPopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(PopupComponent);
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '750px',
      height: '350px',
      disableClose: true,
      data: {
        error: this.error
      }
    });
  }
}

