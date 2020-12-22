import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Addressess } from '../model/Addressess';
import { Base0 } from '../model/Base0';
import { Base1 } from '../model/Base1';

@Component({
  selector: 'app-graphic-results',
  templateUrl: './graphic-results.component.html',
  styleUrls: ['./graphic-results.component.css']
})
export class GraphicResultsComponent implements OnInit {

  data: any;
  info: any;
  base0: Base0;
  base1: Base1;
  addresses: Addressess;
  base0Object: Base0;
  base1Object: Base1;
  addressesObject: Addressess;
  addressesList=[];

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.setValues(JSON.parse(params['base0']), JSON.parse(params['base0']));
      this.setAddresses(JSON.parse(params['addresses']));
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

}
