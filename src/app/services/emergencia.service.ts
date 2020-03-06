import { Injectable } from '@angular/core';
import {GLOBAL} from './global';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import{FileTransfer,FileUploadOptions} from '@ionic-native/file-transfer/ngx'

@Injectable({
  providedIn: 'root'
})
export class EmergenciaService {
  public url:string;

  constructor(private transfer:FileTransfer,public _http:HttpClient) {
    this.url = GLOBAL.url;
   }
  obtEmergencias(page=1):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
  
    return this._http.get(this.url+'obtener-emergencias/'+page, {headers:headers});
  }
  obtEmergenciasRP(id,page=1):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
  
    return this._http.get(this.url+'emergenciasRMB/'+id+'/'+page, {headers:headers});
  }
  obtEmergenciasAS(id,page=1):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
  
    return this._http.get(this.url+'emergenciasAMB/'+id+'/'+page, {headers:headers});
  }
  obtEmergencia(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
  
    return this._http.get(this.url+'obtener-emergencia/'+id, {headers:headers});
  }
  filtroEmergenciasMB(filtro:any,page = 1,token):Observable<any>{
    let params = JSON.stringify(filtro);
    let headers = new HttpHeaders().set('Content-Type','application/json')
    .set('Authorization',token);
  
    return this._http.post(this.url+'filtro-emergenciasMB/'+page, params,{headers:headers});
  }

  aprobarNegar(id,idF,tipo,token,emergencia):Observable<any>{
    let params = JSON.stringify(emergencia);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',token);
  
    return this._http.put(this.url+'aprobarEmergencia-vl/'+id+'/'+idF+'/'+tipo,params, {headers:headers});
  }
     
  nuevaEmergencia(img,emergencia,rol,id){
    let url = this.url + 'nuevaEmergencianMB/'+rol+'/'+id;
    var options:FileUploadOptions={
        fileKey:'image',
        chunkedMode:false,
        mimeType:'image/jpeg',
        params:emergencia
    }
    const fileTransfer = this.transfer.create();
    return fileTransfer.upload(img,url,options)
  }

}
