import { Injectable } from '@angular/core';
import {GLOBAL} from './global';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class AdopcionService {
  public url:string;
  constructor(public _http:HttpClient) {
    this.url = GLOBAL.url;
   }
  obtenerAdopciones(id,page = 1,token):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',token);
    return this._http.get(this.url+'obtener-adopcionesMB/'+id+'/'+page, {headers:headers});
    
  }
  obtAdopcion(id, token):Observable<any>{
    
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',token);
    return this._http.get(this.url+'obtener-adopcion/'+id, {headers:headers});
    
  }
}
