import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, finalize, map } from 'rxjs';
import { IQuery, IQueryByYear } from '../interfaces/query.interface';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  headers = {
    Authorization: 'Basic ' + btoa('admin:33fx0xy26e')
  };
  constructor(private http: HttpClient, private readonly commonService: CommonService) { }

  /**
   * Calls the queryAPI to get the accident data per year
   * @returns Observable<Array<IQuery>>
   */
  getAccidentData(): Observable<Array<IQuery>> {
    this.beforeAPICall();
    return this.http.get(environment.queryAPI, {
      headers: this.headers,
    })
    .pipe(map((response: any) => response || [] ), finalize(() => {this.commonService.resetLoader()}))
  }
  
  /**
   * Calls the queryAPI to get the accident data for a given year
   * @param year: number
   * @returns Observable<Array<IQueryByYear>>
   */
  getAccidentDataByYear(year: number): Observable<Array<IQueryByYear>> {
    this.beforeAPICall();
    return this.http.get(environment.queryAPI, {
      headers: this.headers,
      params: { year }
    })
    .pipe(map((response: any) => response || [] ), finalize(() => {this.commonService.resetLoader()}))
  }
  
  /**
   * Calls the yearsAPI to get the list of years when accident has occurred
   * @returns Observable<Array<number>>
   */
  getYears(): Observable<Array<number>> {
    this.beforeAPICall();
    return this.http.get(environment.yearsAPI, {
      headers: this.headers,
    })
    .pipe(map((response: any) => response || [] ), finalize(() => {this.commonService.resetLoader()}))
  }
  
  /**
   * Actions that needs to be performed just before calling an API, show loader and hide any error messages
   */
  private beforeAPICall() {
    this.commonService.setLoader();
    this.commonService.resetError();
  }
}
