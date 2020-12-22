import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Addressess } from '../model/Addressess';
import { Base0 } from '../model/Base0';
import { Base1 } from '../model/Base1';
import { SegmentService } from '../services/segment.service';

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
  addressesList=[];

  constructor(private fb: FormBuilder,
    private segmentService: SegmentService,
    private router: Router) { }

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

  sendParams() {
    this.setParamsValues();
    this.segmentService.sendParams(this.paramsForm).subscribe((data) => {
      this.params = data;
    });
  }

  setParamsValues() {
    this.paramsForm.setValue({
      seed: this.paramsForm.get('seed').value,
      asize: this.paramsForm.get('asize').value,
      psize: this.paramsForm.get('psize').value,
      address: this.paramsForm.get('address').value,
      len0: this.paramsForm.get('len0').value,
      len1: this.paramsForm.get('len1').value,
      base0: this.paramsForm.get('base0').value,
      base1: this.paramsForm.get('base1').value,
      numaddrs: this.paramsForm.get('numaddrs').value
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
      this.params = data;
      this.setValues(data['base0'], data['base1']);
      this.setAddresses(data['virtualAddressTrace']);
      this.router.navigate(['graphic-result'], { queryParams: {info: JSON.stringify(data)}})

    });
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
}