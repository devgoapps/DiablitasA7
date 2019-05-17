import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NguCarouselConfig } from '@ngu/carousel';

import { HttpService } from '../../services/http.service';
import { SweetAlertService } from '../../services/sweet-alert.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public carouselBanner: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    slide: 1,
    speed: 250,
    interval: {
      timing: 2500
    },
    point: {
      visible: true
    },
    load: 1,
    loop: true,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };

  public carouselTile: NguCarouselConfig = {
    grid: { xs: 1, sm: 3, md: 4, lg: 4, all: 0 },
    slide: 1,
    speed: 250,
    animation: 'lazy',
    interval: {
      timing: 2500
    },
    point: {
      visible: true
    },
    velocity: 0,
    load: 1,
    touch: true,
    loop: true,
  };

  public headerAds: Array<any> = [{ Photo1: 'assets/img/loading.gif' }];
  public diamondAds: Array<any> = [{ Photo1: 'assets/img/loading.gif' }, { Photo1: 'assets/img/loading.gif' }, { Photo1: 'assets/img/loading.gif' }, { Photo1: 'assets/img/loading.gif' }];
  public goldAds: Array<any> = [];
  public silverAds: Array<any> = [];

  public loading: string = 'assets/img/loading.gif';
  public URL: string = 'https://api.diablitas.com.mx/media/';
  //public URL: string = 'http://models.destructor.mx/media/';

  public filters: any = {
    filtering: {
        KeyNationality: '',
        KeyState : '',
        KeyTown : '',
        IsMobile: false
    },
    paging: {
      recordsPerPage: 10,
      pageNumber: 1,
      returnAll: 0
    }
  };

  constructor(private httpService: HttpService,
              private swa: SweetAlertService,
              private router: Router) { }

  ngOnInit() { 
    let width = window.innerWidth;
    if(width <= 900)
      this.filters.filtering.IsMobile = true;
    else
      this.filters.filtering.IsMobile = false;
    
    this.getAllAds(); 
  }

  ngAfterViewInit(){ }

  getAllAds(){
    //this.swa.loading('Obteniendo anuncios...');
    
    this.httpService.buildPostRequest('user/public/ads', this.filters)
      .subscribe((data: any) => {
        let allAds = data;

        this.headerAds = [];
        this.diamondAds = [];
        this.goldAds = [];
        this.silverAds = [];

        for(let i = 0; i < allAds.length; i++){
          allAds[i].Photo1 = this.URL + allAds[i].Photo1;
          allAds[i].Photo2 = this.URL + allAds[i].Photo2;

          if(allAds[i].IdPackage == 3){
            if(allAds[i].IsHeader == 1)
              this.headerAds.push(allAds[i]);
            else
              this.diamondAds.push(allAds[i]);
          }else if(allAds[i].IdPackage == 2){
            this.goldAds.push(allAds[i]);
          }else if(allAds[i].IdPackage == 1){
            this.silverAds.push(allAds[i]);
          }
        }
        if(this.diamondAds.length < 4){
          let items = new Array<any>(4 - this.diamondAds.length).fill({});
          this.diamondAds = this.diamondAds.concat(items);
        }
        if(this.headerAds.length < 1){
          this.headerAds.push({ Photo1: 'assets/img/loading.gif' });
        }
        //this.swa.close();
      }, (error) => {
        this.swa.info(error.message, '');
      });
  }

  goToProfile(idUser){
    this.router.navigate(['ad', idUser]);
  }
  
  openLevelsModal(){
    $('#levels').modal('show');
    $("#levels").appendTo("body");
  }


}
