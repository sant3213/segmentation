import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { SegmentService } from '../services/segment.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

@Output() paramsInformation = new EventEmitter();

  paramsForm: FormGroup;
  constructor(private service: SegmentService, 
    private fb:FormBuilder,
    private router: Router) { }

  params:any;

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

  callParenGreeet(){
    this.paramsInformation.emit(this.paramsForm.value);
  }

  sendParams(){
    this.setParamsValues();
    this.service.sendParams(this.paramsForm).subscribe(
      (data)=>{
      this.params =data;
      console.log(this.params);
    });
    this.router.navigate(['graphic-result'], {queryParams:{data:JSON.stringify(this.params)}})
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
