import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Addressess } from '../model/Addressess';
import { Base0 } from '../model/Base0';
import { Base1 } from '../model/Base1';
import { UserParameters } from '../model/UserParameters';

interface Base0Section {
  selection: string;
}

@Component({
  selector: 'app-graphic-results',
  templateUrl: './graphic-results.component.html',
  styleUrls: ['./graphic-results.component.css']
})
export class GraphicResultsComponent implements OnInit {

  /**
   * Initialize variables
   */
  data: any;
  info: any;
  addresses: Addressess;
  base0Object: Base0;
  base1Object: Base1;
  addressesObject: Addressess;
  addressesList = [];
  base0Value: String;
  base1Value: String;
  len0Value: string;
  len1Value: string;
  isHexa=false;
  userParameters:UserParameters;

  /**
   * Options to select if decimal system or hexadecimal system
   */
  states: Base0Section[] = [
    {
      selection: 'Decimal'
    }, {
      selection: 'Hexadecimal'
    }
  ];

  constructor(private router: ActivatedRoute) { }
  /**
   * Gets information from home page
   * Sets information to base0, base1 and addresses Object
   * Initializes base0Value, base1Value, len0Value, len1Value with decimal value to show
   */
  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.info = JSON.parse(params.info)
      console.log(this.info)
      this.setValues(this.info.base0, this.info.base1);
      this.setAddresses(this.info.virtualAddressTrace);
      this.base0Value = this.base0Object.decimal;
      this.base1Value = this.base1Object.decimal;
      this.len0Value = (Number(this.base0Object.decimal)+Number(this.info.len0)).toString();
      this.len1Value = (Number(this.base1Object.decimal)-Number(this.info.len1)).toString();
    });
  }

  /**
   * Sets values to base0 and base1 object
   * @param base0Data 
   * @param base1Data 
   */
  setValues(base0Data, base1Data) {
    this.base0Object = base0Data;
    this.base1Object = base1Data;
  }

  /**
   * Iterates over the addresses list to get each object and set it to addressesList
   * @param addresses 
   */
  setAddresses(addresses) {
    addresses.forEach(element => {
      this.addressesObject = element;
      this.addressesList.push(this.addressesObject)
    });
  }

  /**
   * 
   * @param event 
   * Get the system option to set it to each value whether it is decimal or hexadecimal
   */
  setBase0Variable(event) {
    switch (event.value) {
      case 'Decimal': {
        this.isHexa = false;
        this.base0Value = this.base0Object.decimal;
        this.base1Value = this.base1Object.decimal;
        this.len0Value = (Number(this.base0Object.decimal)+Number(this.info.len0)).toString();
        this.len1Value = (Number(this.base1Object.decimal)-Number(this.info.len1)).toString();
        break;
      }
      case 'Hexadecimal': {
        this.isHexa = true;
        this.base0Value = this.base0Object.hexa;
        this.base1Value = this.base1Object.hexa;
        
        this.len0Value = this.concatNumberToHexa((Number(this.base0Object.hexa)+Number(this.info.len0Hexa)).toString(16));
        this.len1Value = this.concatNumberToHexa((Number(this.base1Object.hexa)-Number(this.info.len1Hexa)).toString(16));
        break;
      }
    }
  }
/**
 * 
 * @param number 
 * Convert to hexadecimal the limits either the seg0 or the seg1
 */
  concatNumberToHexa(number: string){
    var lengthNumber = number.length;
    var cerosToConcat = 8-lengthNumber;
    var ceros="0";
    var symbol = "0x";
    for(var i = 0; i < cerosToConcat-1; i++){
     
      ceros+="0";
    }
    var a = symbol.concat(ceros);
    var result = a.concat(number)
    return result;
    
  }
}
