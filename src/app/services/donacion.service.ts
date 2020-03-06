import { Injectable } from '@angular/core';
import {GLOBAL} from './global';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class DonacionService {
public url:any
  constructor(public _http:HttpClient) { 
    this.url = GLOBAL.url;
  }
  obtenerDonaciones(id,page = 1,token):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',token);
    return this._http.get(this.url+'obtener-donacionesMB/'+id+'/'+page, {headers:headers});
    
  }
  obtDonacionesRP(id,page=1):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
  
    return this._http.get(this.url+'donacionesRMB/'+id+'/'+page, {headers:headers});
  }
  obtDonacionAS(id,page=1):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
  
    return this._http.get(this.url+'donacionesAMB/'+id+'/'+page, {headers:headers});
  }
  obtDonacion(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get(this.url+'obtener-donacion/'+id, {headers:headers});
  }
  
  aprobarNegar(id,idF,tipo,token,emergencia):Observable<any>{
    let params = JSON.stringify(emergencia);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',token);
  
    return this._http.put(this.url+'aprobarDonacion-vl/'+id+'/'+idF+'/'+tipo,params, {headers:headers});
  }
}
