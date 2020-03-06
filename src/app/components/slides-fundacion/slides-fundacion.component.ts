import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../../services/global';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import * as $ from 'jquery'
import Swiper from 'swiper';
import * as Hammer from 'hammerjs'
@Component({
  selector: 'app-slides-fundacion',
  templateUrl: './slides-fundacion.component.html',
  styleUrls: ['./slides-fundacion.component.scss'],
})
export class SlidesFundacionComponent implements OnInit {
  public portadas:any;
  public historias:any;
  public op;
  public url;
  public msj;
  constructor(private activeRoute:ActivatedRoute,navParams: NavParams, public modalController: ModalController) { 
    this.url = GLOBAL.url;

    this.op = navParams.get('op');
    this.portadas = navParams.get('port')
    this.historias = navParams.get('hist');
    console.log(this.op)
    this.msj = ''
    console.log(this.portadas)
    console.log(this.historias)

  }

  ngOnInit() {
    this.swiperCard()
    if(this.portadas){
      //this.gestures();
      console.log("entro")
    }
  }
  swiperCard(){
    $(document).ready(function () {
    var swiper = new Swiper('.swiper-container', {
      slideShadows: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  });
  }
  async myDismiss(result) {
   
      await this.modalController.dismiss(result);

  }
  

  swipel(event){
    console.log(event)
  }

  verDescripcion(msj){
    console.log("entro")
    this.msj = msj;
    $("#upDescripcion").addClass("upDscVisible");
  }

}
