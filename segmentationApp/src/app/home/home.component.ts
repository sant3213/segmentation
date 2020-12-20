import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { UserParameters } from '../model/UserParameters';
import { SegmentService } from '../services/segment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  paramsForm: FormGroup;
  constructor(private fb: FormBuilder, private segmentService: SegmentService) { }

  params:any;
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
    this.setParamsValues();
    this.segmentService.sendParams(this.paramsForm).subscribe((data)=>{
      this.params =data;
      console.log(this.params.base0);
    });
  }

  sendDefaultParams(){
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


  resetValues(){
    this.paramsForm.reset()
  }


}