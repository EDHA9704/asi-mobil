import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {UsuarioLogin} from 'src/app/models/UsuarioLogin';
import {UsuarioAdoptante} from '../models/usuarioAdoptante';
import{FileTransfer,FileUploadOptions} from '@ionic-native/file-transfer/ngx'

import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from './global';
import { UsuarioFundacion } from '../models/usuarioFundacion';
import { UsuarioRecover } from '../models/usuarioRecover';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url:string;
  public identity;
  public token;
  constructor(private transfer:FileTransfer,public _http:HttpClient,private _route:ActivatedRoute,
    private _router:Router) {
      this.url = GLOBAL.url;
     }

      
   login(usuario:UsuarioLogin, gettoken = null):Observable<any>{
    if(gettoken != null){
      usuario.gettoken = gettoken;

    }
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'login-mobile', params, {headers:headers});

  }
  loginFB(usuario:UsuarioLogin, gettoken = null):Observable<any>{
    if(gettoken != null){
      usuario.gettoken = gettoken;

    }
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'login-mobileFB', params, {headers:headers});

  }     
  registro(usuario:UsuarioAdoptante):Observable<any>{
    
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'registrarAdoptanteFB', params, {headers:headers});

  }
  obtUsuario(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
  
    return this._http.get(this.url+'usuario/'+id,{headers:headers});
  }
  obtFundacionSTD(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
  
    return this._http.get(this.url+'obtfundacionstd/'+id,{headers:headers});
  }
  
uploadUser(img,user){
    let url = this.url + 'registrarAdoptante';
    var options:FileUploadOptions={
        fileKey:'image',
        chunkedMode:false,
        mimeType:'image/jpeg',
        params:user
    }
    const fileTransfer = this.transfer.create();
    return fileTransfer.upload(img,url,options)
}
 validUser(usuario):Observable<any>{
    
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'valid-usuario', params, {headers:headers});

  }
  enviarEmail(form):Observable<any>{
    let params = JSON.stringify(form);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'enviar', params, {headers:headers});
    
  }
  errrp(errp):Observable<any>{
    
    let params = JSON.stringify(this.errrp);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'errorprueba', params, {headers:headers});

  }
  obtIdentity(){
    let identity = JSON.parse(localStorage.getItem('identityMobile')); 
    
    if(identity != "undefined"){
        this.identity = identity;
    }else{
        this.identity = null;
    }

    return this.identity;
}

obtToken(){
  let token = localStorage.getItem('token'); 
  
  if(token != "undefined"){
      this.token = token;
  }else{
      this.token = null;
  }
  return this.token;
}
obtUsuariosRol(page=null,rol):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');

  return this._http.get(this.url+'obtener-usuarios-rol/'+rol+'/'+page,{headers:headers});
}
obtFundacionesByname(name):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');

  return this._http.get(this.url+'fundaciones-byname/'+name, {headers:headers});
}
filtroFundacionesMB(filtro:any,page = 1):Observable<any>{
  let params = JSON.stringify(filtro);
  let headers = new HttpHeaders().set('Content-Type','application/json');

  return this._http.post(this.url+'filtro-fundacionesMB/'+page, params,{headers:headers});
}
obtPortadasFundacion(id):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');

  return this._http.get(this.url+'obtener-portadas-fundacion/'+id, {headers:headers});
}
obtHistoriasFundacion(id):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');

  return this._http.get(this.url+'obtener-historias/'+id, {headers:headers});
}
actualizarUsuario(id,usuario,token):Observable<any>{
  let params = JSON.stringify(usuario);
  let headers = new HttpHeaders().set('Content-Type','application/json')
                                  /*.set('Authorization',token);;*/

  return this._http.put(this.url+'usuario-updateMB/'+id,params, {headers:headers});
}
updateFoto(img,id){
  let url = this.url + 'foto-user-MB/'+id;
  var options:FileUploadOptions={
      fileKey:'image', 
      chunkedMode:false,
      mimeType:'image/jpeg',
     
  }
  const fileTransfer = this.transfer.create();
  return fileTransfer.upload(img,url,options)
}
enviarCodigo(form):Observable<any>{
  let params = JSON.stringify(form);
  let headers = new HttpHeaders().set('Content-Type','application/json');
  return this._http.post(this.url+'enviar-codigoMB', params, {headers:headers});
  
} 
verificarCodigo(correo,cd,tipo):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');
  return this._http.get(this.url+'verificar-codigoMB/'+correo+'/'+cd+'/'+tipo, {headers:headers});
}

obtUsuarioCorreo(usuario):Observable<any>{
  let params = JSON.stringify(usuario);
  let headers = new HttpHeaders().set('Content-Type','application/json')
  return this._http.post(this.url+'obtener-usuario-emMB', params, {headers:headers});
  
  
}
eliminarCodigo(id):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');
  return this._http.delete(this.url+'eliminar-codigo/'+id, {headers:headers});
  
}
cambiarPss(usuario,id):Observable<any>{
  let params = JSON.stringify(usuario);
  let headers = new HttpHeaders().set('Content-Type','application/json');
  return this._http.post(this.url+'cambiar-passMB/'+id, params, {headers:headers});
  
}
}
