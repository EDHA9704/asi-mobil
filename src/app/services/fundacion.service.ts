import { Injectable } from '@angular/core';
import{FileTransfer,FileUploadOptions} from '@ionic-native/file-transfer/ngx'
import {GLOBAL} from './global';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class FundacionService {
  public url;
  constructor(private transfer:FileTransfer,public _http:HttpClient) {
    this.url = GLOBAL.url;

   }

    
uploadDonacion(img,user,rol){
  let url = this.url + 'registrarDonacionMB/'+rol;
  var options:FileUploadOptions={
      fileKey:'image',
      chunkedMode:false,
      mimeType:'image/jpeg',
      params:user
  }
  const fileTransfer = this.transfer.create();
  return fileTransfer.upload(img,url,options)
}
}
