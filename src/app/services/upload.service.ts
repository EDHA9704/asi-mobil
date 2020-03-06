import { Injectable } from '@angular/core';
import {GLOBAL} from './global';
import{FileTransfer,FileUploadOptions} from '@ionic-native/file-transfer/ngx'

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  public url:string;
  constructor(private transfer:FileTransfer) {
    this.url = GLOBAL.url;
   }
   makeGileRequest(url:string, params:Array<string>, files:Array<File>, token:string, name:string){
    return new Promise(function(resolve, reject){
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();

        for(var i = 0; i<files.length; i++){
            formData.append(name,files[i], files[i].name);

        }

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    resolve(JSON.parse(xhr.response));

                }else{
                    reject(xhr.response);
                }
            }
        }

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Authorization', token);
        xhr.send(formData);
    });
}
makeGileRequest2(url:string, params:Array<string>, files:Array<File>, name:string){
  return new Promise(function(resolve, reject){
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for(var i = 0; i<files.length; i++){
          formData.append(name,files[i], files[i].name);

      }

      xhr.onreadystatechange = function(){
          if(xhr.readyState == 4){
              if(xhr.status == 200){
                  resolve(JSON.parse(xhr.response));

              }else{
                  reject(xhr.response);
              }
          }
      }

      xhr.open('POST', url, true);
      
      xhr.send(formData);
  });
}

uploadUser(img,user){
    let url = this.url + 'registrarAdoptante';
    var options:FileUploadOptions={
        fileKey:'foto',
        chunkedMode:false,
        mimeType:'multipart/form-data',
        params:user
    }
    const fileTransfer = this.transfer.create();
    return fileTransfer.upload(img,url,options)
}
}

