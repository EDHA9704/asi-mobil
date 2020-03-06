import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  public url:string;
  constructor(public _http:HttpClient) { 
    this.url = GLOBAL.url;
  }

  obtNotificaciones(id,rol,page=null,token):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                              .set('Authorization',token);
  
    return this._http.get(this.url+'obtener-notificacionesMB/'+id+'/'+rol+'/'+page,{headers:headers});
  }
  statsNotificaciones(id,rol,token):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                              .set('Authorization',token);
  
    return this._http.get(this.url+'stats-notificacionesMB/'+id+'/'+rol,{headers:headers});
  }
  changeEstado(id,token):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                              .set('Authorization',token);
  
    return this._http.put(this.url+'changeEstadoNotiMB/'+id,{},{headers:headers});
  }
  filtroNoticacionesMB(filtro:any,page = 1,token):Observable<any>{
    let params = JSON.stringify(filtro);
    let headers = new HttpHeaders().set('Content-Type','application/json')
    .set('Authorization',token);
  
    return this._http.post(this.url+'filtro-notificacionesMB/'+page, params,{headers:headers});
  }
  nuevaOneSignal(device):Observable<any>{

    let params = JSON.stringify(device);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'nueva-onesignal', params, {headers:headers});

  }
  eliminarOneSignal(id,ido):Observable<any>{

    //let params = JSON.stringify(device);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'eliminar-onesignal/'+id+'/'+ido, {headers:headers});

  }
  
  
}
