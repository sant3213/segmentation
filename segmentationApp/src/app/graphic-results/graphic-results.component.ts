import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Addressess } from '../model/Addressess';
import { Base0 } from '../model/Base0';
import { Base1 } from '../model/Base1';

interface Base0Section {
  selection: string;
}

@Component({
  selector: 'app-graphic-results',
  templateUrl: './graphic-results.component.html',
  styleUrls: ['./graphic-results.component.css']
})
export class GraphicResultsComponent implements OnInit {

  data: any;
  info: any;
  addresses: Addressess;
  base0Object: Base0;
  base1Object: Base1;
  addressesObject: Addressess;
  addressesList = [];
  base0Value:String;
  base1Value:String;
  len0Value:string;
  len1Value:string;

  states: Base0Section[] = [
    {
      selection: 'Decimal'
    }, {
      selection: 'Hexadecimal'
    }
  ];

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.info = JSON.parse(params.info)
      console.log(this.info)
      this.setValues(this.info.base0, this.info.base1);
      this.setAddresses(this.info.virtualAddressTrace);
      this.base0Value=this.base0Object.decimal;
      this.base1Value=this.base1Object.decimal;
      this.len0Value = this.info.len0;
      this.len1Value = this.info.len1;
    });
  }

  setValues(base0Data, base1Data) {
    this.base0Object = base0Data;
    this.base1Object = base1Data;
  }

  setAddresses(addresses) {
    addresses.forEach(element => {
      this.addressesObject = element;
      this.addressesList.push(this.addressesObject)
    });
  }

  setBase0Variable(event){
    switch(event.value){
      case 'Decimal':{
        this.base0Value=this.base0Object.decimal;
        this.base1Value=this.base1Object.decimal;
        this.len0Value = this.info.len0;
        this.len1Value = this.info.len1;
        break;
      }
      case 'Hexadecimal':{
        this.base0Value=this.base0Object.hexa;
        this.base1Value=this.base1Object.hexa;
        this.len0Value = Number(this.info.len0).toString(16);
        this.len1Value = Number(this.info.len1).toString(16);
        break;
      }
    }
  }

}
