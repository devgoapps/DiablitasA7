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

  public siteKey: string = '6LcA8J0UAAAAAL7GznZ6gyjgoln1pZkhL4hikl43';
  public tab: string = 'detail';
  public img: string = '';
  public currentIndex: number = 0;
  public loading: string = 'assets/img/loading.gif';

  public userId: number = null;
  public URL: string = 'http://220.1.3.203/diablitas/media/';
  //public URL: string = 'http://models.destructor.mx/media/';

  public profile: any = { Profile: { } };
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
    //window.scrollTo(0, 0);
    this.initCarruselEvent();
  }

  getProfileById(){
    this.swa.loading('Obteniendo perfil...');
    
    this.httpService.buildGetRequest('user/public/profile/' + this.userId, '')
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
    window.open(url, '_blank');
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
        this.profile.photos.push({ img: this.URL + this.profile.Profile.Media[i].Uri });
      }else if(this.profile.Profile.Media[i].MediaType == 2){ // Videos
        this.profile.videos.push({ video: this.URL + this.profile.Profile.Media[i].Uri });
      }
    }
  }

  createComment() {
    this.comment.IdProfile = this.profile.Profile.IdProfile;

    this.swa.loading('Guardando comentario...');
    
    this.httpService.buildPostRequest('user/public/comment', this.comment)
      .subscribe((data: any) => {
        this.swa.close();

        this.swa.success('Comentario Agregado', 'El comentario fue agregado correctamente', () => {
          this.getProfileById();
          $('#comment').modal('hide');
        });
      }, (error) => {
        this.swa.error('Ocurrió un problema', error.message);
      });
  }

  openModalPhotos(index){
    this.img = this.profile.photos[index].img;
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
      this.img = this.profile.photos[this.currentIndex].img;
    }else{
      this.currentIndex = this.profile.photos.length - 1;
      this.img = this.profile.photos[this.currentIndex].img;
    }
  }

  nextImg(){
    if(this.currentIndex < (this.profile.photos.length - 1)) {
      this.currentIndex++;
      this.img = this.profile.photos[this.currentIndex].img;
    }else{
      this.currentIndex = 0;
      this.img = this.profile.photos[0].img;
    }
  }


  goToImportant(){
    let text;
    if(this.tab == 'detail')
      text = $("#important").offset().top;
    else
      text = $("#important2").offset().top;

    $('html, body').animate({
      scrollTop: text
    }, 800);
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

}
