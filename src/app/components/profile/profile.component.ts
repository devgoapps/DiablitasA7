import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpService } from '../../services/http.service';
import { SweetAlertService } from '../../services/sweet-alert.service';

declare var $: any;
declare var Hammer: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //public siteKey: string = '6LcA8J0UAAAAAL7GznZ6gyjgoln1pZkhL4hikl43';
  public tab: string = 'detail';
  public img: string = '';
  public currentIndex: number = 0;

  public userId: number = null;
  public URL: string = 'http://220.1.1.243/diablitas/media/';

  public profile: any = { Profile: { } };
  
  public modelPhotos: Array<any> = [
    { img: 'https://ae01.alicdn.com/kf/HTB1G.3pX6ihSKJjy0Flq6ydEXXak/Mujeres-lencer-a-sexy-Cuerpo-Lenceria-erotica-Teddy-Lencer-a-sujetador-de-las-mujeres-Ropa-interior.jpg', imgs: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTisb3PekB6GN5ExgGbQBiJxWEEKqYXYNEZlnNCUI7hPJLyjsInMQ', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg'] }, 
    { img: 'https://www.venca.es/i/916593/l/bikini-estampado-mujer-copa-b-con-relleno-y-braga-alta-estampado-azul.jpg', imgs: ['https://www.venca.es/i/916593/l/bikini-estampado-mujer-copa-b-con-relleno-y-braga-alta-estampado-azul.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg']},
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTisb3PekB6GN5ExgGbQBiJxWEEKqYXYNEZlnNCUI7hPJLyjsInMQ', imgs: ['https://i.pinimg.com/736x/25/99/29/2599295c134bd149971e89f219fa8b64.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg']}, 
    { img: 'https://cdn.glamour.es/uploads/images/thumbs/201240/iquien_se_desnuda_mejor_1319398_320x480.jpg', imgs: ['https://cdn.glamour.es/uploads/images/thumbs/201240/iquien_se_desnuda_mejor_1319398_320x480.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg']},
    { img: 'https://ae01.alicdn.com/kf/HTB1koF_kOOYBuNjSsD4q6zSkFXaU/Los-nuevos-modelos-calientes-de-encaje-japon-s-bordado-Lencer-a-ajustable-Sujetador-push-up-sexy.jpg_640x640.jpg', imgs: ['https://ae01.alicdn.com/kf/HTB1koF_kOOYBuNjSsD4q6zSkFXaU/Los-nuevos-modelos-calientes-de-encaje-japon-s-bordado-Lencer-a-ajustable-Sujetador-push-up-sexy.jpg_640x640.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg'] },  
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROnlyjeT_tI6BTqwAUxS8RQ_Ih5TiE8hrqzZZGnXnaqH8HJ4_FGg', imgs: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROnlyjeT_tI6BTqwAUxS8RQ_Ih5TiE8hrqzZZGnXnaqH8HJ4_FGg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg']},
    { img: 'https://farm5.staticflickr.com/4715/39643698541_c3c074638b_b.jpg', imgs: ['https://farm5.staticflickr.com/4715/39643698541_c3c074638b_b.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg'] }, 
    { img: 'https://pbs.twimg.com/media/DV7PNzlUQAAK8Zr.jpg', imgs: ['http://pueblaonline.com.mx/2015/portal/movil//media/k2/galleries_p/51972/thumb_front/mk4.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg']},
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj1IFGYZfWQceE1It_WaFf6PWhYfmZdC42-s-rRMWe9Sp8nmMk', imgs: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj1IFGYZfWQceE1It_WaFf6PWhYfmZdC42-s-rRMWe9Sp8nmMk', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg'] },
    { img: 'https://http2.mlstatic.com/disfraz-erotico-sex-appeal-disfraces-lenceria-modelos-2017-D_NQ_NP_184121-MLA20713237451_052016-F.jpg', imgs: ['https://http2.mlstatic.com/disfraz-erotico-sex-appeal-disfraces-lenceria-modelos-2017-D_NQ_NP_184121-MLA20713237451_052016-F.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg']},
    { img: 'https://i.pinimg.com/736x/25/99/29/2599295c134bd149971e89f219fa8b64.jpg', imgs: ['https://ae01.alicdn.com/kf/HTB1G.3pX6ihSKJjy0Flq6ydEXXak/Mujeres-lencer-a-sexy-Cuerpo-Lenceria-erotica-Teddy-Lencer-a-sujetador-de-las-mujeres-Ropa-interior.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg']},
  ];

  /*public modelPhotos: Array<any> = [ 
    { img: './assets/img/img1.jpg' }, 
    //{ img: 'http://memoflores.com/fotos-de-boudoir-02.jpg' },
    { img: './assets/img/img2.jpg' }, 
    { img: './assets/img/img3.jpg' },
    { img: './assets/img/img4.jpg' },  
    { img: './assets/img/img5.jpg' },
    //{ img: 'https://i.pinimg.com/736x/25/99/29/2599295c134bd149971e89f219fa8b64.jpg' }, 
    //{ img: 'https://pbs.twimg.com/media/DV7PNzlUQAAK8Zr.jpg' },
    { img: './assets/img/img6.jpg' },
    { img: './assets/img/img7.jpg' },
    { img: './assets/img/img9.jpg' },
    { img: './assets/img/img11.jpg' },
  ];
  */
  public videos: Array<any> = [
    './assets/videos/video1.mp4',
    './assets/videos/video2.mp4',
    './assets/videos/video3.mp4',
  ]

  public comment: any = {};

  constructor(private httpService: HttpService,
              private swa: SweetAlertService,
              private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
    this.userId = params['id'];
    });
  }

  ngOnInit() { 
    this.getProfileById();
  }

  ngAfterViewInit(){
    window.scrollTo(0, 0);
    this.initCarruselEvent();
  }

  getProfileById(){
    this.swa.loading('Obteniendo perfil...');
    
    this.httpService.buildGetRequest('user/get/' + this.userId, '')
      .subscribe((data: any) => {
        this.swa.close();
        this.profile = data;

        this.loadMedia();
        console.log(this.profile);
      }, (error) => {
        this.swa.error('Ocurrió un problema', error.message);
      });
  }

  openLink(url) {
    window.open('_blank', url);
  }

  loadMedia(){
    if(!this.profile.Profile.Media)
      this.profile.Profile.Media = [];

    if(!this.profile.Profile.Media) return;

    this.profile.photos = [];
    this.profile.videos = [];

    for(let i = 0; i < this.profile.Profile.Media.length; i++){
      if(this.profile.Profile.Media[i].MediaType == 1){ // Imagenes
        if(this.profile.Profile.Media[i].MediaPosition == 1){ // Full Image
          this.profile.uploadCoverPhoto = this.URL + this.profile.Profile.Media[i].Uri;
        }else if(this.profile.Profile.Media[i].MediaPosition == 2){ // Profile Image
          this.profile.uploadProfilePhoto = this.URL + this.profile.Profile.Media[i].Uri;
        }
        this.profile.photos.push({ img: this.URL + this.profile.Profile.Media[i].Uri, idMedia: this.profile.Profile.Media[i].IdMedia, uri: this.profile.Profile.Media[i].Uri });
      }else if(this.profile.Profile.Media[i].MediaType == 2){ // Videos
        this.profile.videos.push({ video: this.URL + this.profile.Profile.Media[i].Uri, idMedia: this.profile.Profile.Media[i].IdMedia, uri: this.profile.Profile.Media[i].Uri });
      }
    }
  }

  openModalPhotos(index){
    this.img = this.modelPhotos[index].img;
    this.currentIndex = index;

    $('#photos').modal('show');
    $("#photos").appendTo("body");
  }

  openModalComment(){
    $('#comment').modal('show');
    $("#comment").appendTo("body");
  }

  initCarruselEvent() {
    var carrusel = $('#carrusel')[0];
    var mc = new Hammer(carrusel);

    mc.on("swipeleft", () => {
      this.nextImg();
    });

    mc.on("swiperight", () => {
      this.prevImg();
    });
  }

  prevImg() {
    if(this.currentIndex > 0) {
      this.currentIndex--;
      this.img = this.modelPhotos[this.currentIndex].img;
    }else{
      this.currentIndex = this.modelPhotos.length - 1;
      this.img = this.modelPhotos[this.currentIndex].img;
    }
  }

  nextImg(){
    if(this.currentIndex < (this.modelPhotos.length - 1)) {
      this.currentIndex++;
      this.img = this.modelPhotos[this.currentIndex].img;
    }else{
      this.currentIndex = 0;
      this.img = this.modelPhotos[0].img;
    }
  }


  goToImportant(){
    $('html, body').animate({
      scrollTop: $("#important").offset().top
    }, 800);
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

}
