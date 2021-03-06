import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Params } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SegmentService {

  basePath = `${environment.segmentApi}`;
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Type':  'application/json',
      'Accept': 'application/json'})
  };

  
  constructor(private httpClient: HttpClient) { }

  sendParams(parameters: Params) {
    var params;
    if(parameters.value !=undefined)
    params = JSON.stringify(parameters.value);
    else params = parameters
    return this.httpClient.post('http://localhost:3200/segmentation', params, this.httpOptions);
  }

}
