import { Component, OnInit, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController, ModalController } from '@ionic/angular';
declare var google:any;
@Component({
  selector: 'app-pop-up-location',
  templateUrl: './pop-up-location.component.html',
  styleUrls: ['./pop-up-location.component.scss'],
})
export class PopUpLocationComponent implements OnInit {
  GoogleAutocomplete:any = google.maps.places.AutocompleteService;
  geoCoder:any
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  userActualLocation:any;
  userTextActualLocation:any;
  markerActualUserLocation:any;
  userLatLng = {
    lat:Number,
    lng:Number
  }
  map:any;
  mapHtml:any;
  direccion:any=''
  constructor(private geoIonic:Geolocation,private loadController:LoadingController,public zone: NgZone,
    public modalController: ModalController) { 
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.geoCoder = new google.maps.Geocoder
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  ngOnInit() {
    this.loadMap()
  }


 async currentLocationUser(){
   this.userActualLocation =  await this.geoIonic.getCurrentPosition()
   console.log(this.userActualLocation)
   this.userLatLng.lat = this.userActualLocation.coords.latitude
   this.userLatLng.lng = this.userActualLocation.coords.longitude
   // await this.getLocationFormatted('location',this.userLatLng)
    this.geoCoder.geocode({'location': this.userLatLng}, (results, status) => {
      console.log(results)
      console.log(status)
     if(status === 'OK' && results[0]){

        this.userTextActualLocation = results[1].formatted_address

       }
   })
   /*lat:rta.coords.latitude,
     lng:rta.coords.longitude*/
  }
  async loadMap(){
    const loading = await this.loadController.create()
    loading.present()
   await this.currentLocationUser()

   const mapEle:HTMLElement = document.getElementById('map');
   this.mapHtml = mapEle;
   this.map = new google.maps.Map(this.mapHtml,{
     center:this.userLatLng,
     zoom:12,
   })
   google.maps.event.addListenerOnce(this.map,'idle',()=>{
    loading.dismiss();
    this.putMarker(this.map,this.userLatLng,'Hello')

    //ARRASTRAR MARKER
    google.maps.event.addListener(this.markerActualUserLocation, 'dragend', (evt)=>{
      console.log(evt)
      this.userLatLng.lat = evt.latLng.lat()
      this.userLatLng.lng =  evt.latLng.lng()
      this.geoCoder.geocode({'location': evt.latLng}, (results, status) => {
        console.log(results)
        console.log(status)
       if(status === 'OK' && results[0]){
  
          this.userTextActualLocation = results[1].formatted_address
          this.map.setCenter(this.markerActualUserLocation.position);
          this.markerActualUserLocation.setMap(this.map);
          loading.dismiss()
         }
     })
    });
    
    //INICIA ARRASTRE DEL MARKER
    google.maps.event.addListener(this.markerActualUserLocation, 'dragstart', function(evt){
      evt.latLng.lat()    });
  })
    
  /*this.map.addListener('click', (e)=> {
    console.log(e)
    this.placeMarkerAndPanTo(e.latLng,e.latLng, this.map);
  });*/
  }

  putMarker(map,markerL,text){
   
      
      this.markerActualUserLocation = new google.maps.Marker({
        position:{
          lat:markerL.lat,
          lng:markerL.lng
        },
        draggable: true,
        zoom:8,
        map:map,
        title:text
      })
    
  }
  updateSearchResults(event){
    console.log(event)
    if (event.detail.value == '') {
      this.autocompleteItems = [];
      return;
    }
    
    this.GoogleAutocomplete.getPlacePredictions({ input: event.detail.value },
      (predictions, status) => {
        console.log(status)
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
 
  }
  async selectSearchResult(item) {
    //this.clearMarkers();
    const loading = await this.loadController.create()
    loading.present()
    this.markerActualUserLocation.setMap(null);
    console.log(item)
    this.autocompleteItems = [];



  this.geoCoder.geocode({'placeId': item.place_id}, (results, status) => {
  if(status === 'OK' && results[0]){
    console.log(status)
    console.log(results)
 
    this.userLatLng.lat = results[0].geometry.location.lat()
    this.userLatLng.lng =  results[0].geometry.location.lng()
  
    
    this.markerActualUserLocation.position = results[0].geometry.location
    this.map.setCenter(this.markerActualUserLocation.position);
    this.markerActualUserLocation.setMap(this.map);
    this.userTextActualLocation = results[0].formatted_address
    loading.dismiss()
    //this.markers.push(marker);
    //this.map.setCenter(results[0].geometry.location);
  }
})
  }

 /*async placeMarkerAndPanTo(latLng,placeId, map) {
  this.markerActualUserLocation.setMap(null);
  this.userLatLng.lat = latLng.lat()
  this.userLatLng.lng = latLng.lng()
    const loading = await this.loadController.create()
    loading.present()
    
    this.markerActualUserLocation = new google.maps.Marker({
      position: latLng,
      map: map
    });
    console.log(this.markerActualUserLocation)
    map.panTo(latLng);
    this.geoCoder.geocode({'location': placeId}, (results, status) => {
      console.log(results)
      console.log(status)
     if(status === 'OK' && results[0]){

        this.userTextActualLocation = results[1].formatted_address
        loading.dismiss()
       }
   })
   //-78.53336626720892, a: -0.266202313073718
  }*/
  async myDismiss(result) {

    await this.modalController.dismiss(result);
  }

  guardarDireccion(){
    this.direccion ={
      latLng:this.userLatLng,
      formmatedAddres:this.userTextActualLocation
    }
    this.myDismiss(this.direccion)
  }
 /* getLocationFormatted(tipo:any,id:any){
    //placedId
    //location lat lng
    this.geoCoder.geocode({tipo: id}, (results, status) => {
      console.log(results)
      console.log(status)
     if(status === 'OK' && results[0]){
       if(tipo == 'location'){
        this.userTextActualLocation = results[1].formatted_address
       }else{
        this.userTextActualLocation = results[0].formatted_address
       }
       
       }
   })
  }*/
}
