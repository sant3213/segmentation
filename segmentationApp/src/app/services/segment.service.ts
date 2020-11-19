import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { params } from '../model/params';

@Injectable({
  providedIn: 'root'
})
export class SegmentService {

  basePath = `${environment.segmentApi}`;
  
  
  constructor(private httpClient: HttpClient) { }

  getAllAsks(): Observable<any> {
    return this.httpClient.get<params>(this.basePath);
  }

}
