import { Component } from '@angular/core';

import * as Slideout from 'slideout';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public slideout: any;

  constructor() { }

  ngAfterViewInit(){
    this.slideout = new Slideout({
      'panel': $('#panel')[0],
      'menu': $('#menu')[0],
      'padding': 256,
      'tolerance': 70,
      'touch': false
    });

    $('.toggle-container').click(() => {
      this.slideout.toggle();
    });
    
    $('.opt').click(() => {
      this.slideout.close();  
      $(".panel-open").off('click');
      $('.main-content').removeClass('panel-open'); 
    });

    this.slideout
      .on('beforeopen', () => {
        $('.main-content').addClass('panel-open');
      })
      .on('open', () => {
        $('.panel-open').click(() => { this.slideout.close(); });
      })
      .on('beforeclose', () => {
        $(".panel-open").off('click');
        $('.main-content').removeClass('panel-open');
      });

    let accept = sessionStorage.getItem('accept');
    if(accept != 'true'){
      $('#myModal').modal({ backdrop: 'static', keyboard: false });
      $('#myModal').modal('show');
    }
  }

  accept(){
    sessionStorage.setItem('accept', 'true');
    $('#myModal').modal('hide');
  }
}
