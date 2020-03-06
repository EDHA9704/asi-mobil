import { Directive,HostListener,Output,EventEmitter } from '@angular/core';

@Directive({
  selector: '[appHammertime]'
})
export class HammertimeDirective {

  @Output() swipeup =  new EventEmitter();
  constructor() { }

// @HostListener('swipeup',['$event'])
  /*hmSwipeup(e){
    if(e.swipeup)
  }
*/

}
