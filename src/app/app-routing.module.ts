import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guards/auth.guard'
import {IniGuard} from './guards/ini.guard'

const routes: Routes = [
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule',canLoad:[AuthGuard] },
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
 { path: 'inicio', loadChildren: './components/inicio/inicio.module#InicioPageModule' ,canLoad:[IniGuard]},
  { path: 'login', loadChildren: './components/login/login.module#LoginPageModule' ,canLoad:[IniGuard] },
  { path: 'registro-final', loadChildren: './components/registro-final/registro-final.module#RegistroFinalPageModule'  ,canLoad:[IniGuard]},
  { path: 'registro-proceso/:user/:pass', loadChildren: './components/registro-proceso/registro-proceso.module#RegistroProcesoPageModule' ,canLoad:[IniGuard] },
  { path: 'registro', loadChildren: './components/registro/registro.module#RegistroPageModule'  ,canLoad:[IniGuard]},
  { path: 'perfil-mascota/:id', loadChildren: './components/perfil-mascota/perfil-mascota.module#PerfilMascotaPageModule' ,canLoad:[AuthGuard]},
  { path: 'fundaciones', loadChildren: './components/fundacion/fundaciones/fundaciones.module#FundacionesPageModule' ,canLoad:[AuthGuard]},
  { path: 'perfil-fundacion/:id', loadChildren: './components/perfil-fundacion/perfil-fundacion.module#PerfilFundacionPageModule' ,canLoad:[AuthGuard]},
  { path: 'perfil-emergencia/:id/:tipo', loadChildren: './components/perfil-emergencia/perfil-emergencia.module#PerfilEmergenciaPageModule' ,canLoad:[AuthGuard]},
  { path: 'adopciones', loadChildren: './components/sub-menus/adopciones/adopciones.module#AdopcionesPageModule',canLoad:[AuthGuard]},
  { path: 'perfil/:id', loadChildren: './components/sub-menus/perfil/perfil.module#PerfilPageModule' ,canLoad:[AuthGuard]},
  //{ path: 'emergencias', loadChildren: './components/sub-menus/emergencias/emergencias.module#EmergenciasPageModule' },
  { path: 'emergencias-reportadas', loadChildren: './components/sub-menus/emergencias-reportadas/emergencias-reportadas.module#EmergenciasReportadasPageModule' ,canLoad:[AuthGuard]},
  { path: 'perfil-adopcion/:id', loadChildren: './components/perfil-adopcion/perfil-adopcion/perfil-adopcion.module#PerfilAdopcionPageModule',canLoad:[AuthGuard] },
  { path: 'donaciones', loadChildren: './components/sub-menus/donaciones/donaciones.module#DonacionesPageModule' ,canLoad:[AuthGuard]},
  { path: 'perfil-donacion/:id/:tipo', loadChildren: './components/perfil-donacion/perfil-donacion.module#PerfilDonacionPageModule' ,canLoad:[AuthGuard]},
  { path: 'donaciones-reportadas', loadChildren: './components/sub-menus/donaciones-reportadas/donaciones-reportadas.module#DonacionesReportadasPageModule',canLoad:[AuthGuard] },
  { path: 'recover', loadChildren: './components/recover/recover.module#RecoverPageModule' },
]; 
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule] 
})
export class AppRoutingModule {}
