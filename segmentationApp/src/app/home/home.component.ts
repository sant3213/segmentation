import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import { Params } from '@angular/router';
import { params } from '../model/params';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  paramsForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.paramsForm = this.fb.group({
      seed: [""],
      asize: [''],
      psize: [''],
      address: [''],
      len0: [''],
      len1: [''],
      base0: [''],
      base1: [''],
      numaddrs: [''],
    });

  }

  sendParams(){
    this.paramsForm.setValue({
      seed: this.paramsForm.get('seed').value,
      asize: "1k",
      psize: "16k",
      address: "-1",
      len0: "-1",
      len1: "-1",
      base0: "-1",
      base1: "-1",
      numaddrs: 5
    });
    console.log(this.paramsForm.value)
    console.log(this.paramsForm.get('seed').value);
    //this.sendParams(this.paramsForm);
    //console.log("valor"+value);
  }

  setParamsValues(paramsForm: FormGroup) {
    this.paramsForm.setValue({
      seed: this.paramsForm.get('seed').value
    });
    console.log(this.paramsForm.value)
}


  resetValues(){
    this.paramsForm.reset()
  }


}