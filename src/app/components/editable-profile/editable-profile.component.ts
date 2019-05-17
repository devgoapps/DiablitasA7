import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpService } from '../../services/http.service';
import { SweetAlertService } from '../../services/sweet-alert.service';

declare var $: any;
declare var Hammer: any;

@Component({
  selector: 'app-editable-profile',
  templateUrl: './editable-profile.component.html',
  styleUrls: ['./editable-profile.component.css']
})
export class EditableProfileComponent implements OnInit {
  
  public tab: string = 'detail';
  public userId: number = null;
  public img: string = '';
  public currentIndex: number = 0;
  public loading: string = 'assets/img/loading.gif';
  public URL: string = 'https://api.diablitas.com.mx/media/';
  //public URL: string = 'http://models.destructor.mx/media/';
  
  public profile: any = { Profile: { } };

  public service: any = {};

  public states: Array<any> = [];
  public cities: Array<any> = [];
  public zones: Array<any> = [];
  public languages: Array<any> = [];
  public locations: Array<any> = [];
  public nationalities: Array<any> = [];
  public services: Array<any> = [];
  public colorEyes: Array<any> = [];
  public colorSkin: Array<any> = [];
  public colorHair: Array<any> = [];

  public MEDIA: any = {
    IMAGE: 1,
    VIDEO: 2,
    BACK: 1,
    PROFILE: 2,
    GALERY: 3
  }

  public textPattern: any = /^[a-z\s0-9Ññ,.]+$/i;
  public urlPattern: any = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  public measuresRegex = /^(\d{2,3})-(\d{2,3})-(\d{2,3})$/;

  constructor(private httpService: HttpService,
              private swa: SweetAlertService,
              private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
  }

  ngOnInit() { 
    this.getStates();
    this.getNationalities();
    this.getColorEyes();
    this.getColorSkin();
    this.getColorHair();
    //this.getServices();
    this.getLanguages();
    this.getLocations();
    this.getProfileById();
  }

  ngAfterViewInit(){
    window.scrollTo(0, 0);
    this.initCarruselEvent();
  }

  initTooltips(){
    setTimeout(() => {
      $('#profile-img-error').tooltip({
        title: 'La imagen de perfil es requerida',
        position: 'top'
      });
  
      $('#full-img-error').tooltip({
        title: 'La imagen de portada es requerida',
        position: 'top'
      });
    }, 0);
  }

  submit(){
    $("#submit-btn").click();
  }

  getProfileById(){
    this.swa.loading('Obteniendo perfil...');
    
    this.httpService.buildGetRequest('user/get/' + this.userId, '')
      .subscribe((data: any) => {
        this.swa.close();
        this.profile = data;

        this.getMedia();
        this.getCities(false);
        this.getServices();
        console.log(this.profile);
      }, (error) => {
        this.swa.info(error.message, '');
      });
  }

  openLink(url) {
    window.open(url, '_blank');
  }

  getMedia(){
    this.httpService.buildGetRequest('user/media/' + this.profile.Profile.IdProfile, '')
      .subscribe((data: any) => {
        console.log(data);
        this.profile.Profile.Media = data;

        this.loadMedia();
      }, (error) => {
        this.swa.info(error.message, '');
      });
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

  saveProfile(){
    for(let i = 0; i < this.profile.Profile.Area.length; i++){
      if(this.profile.Profile.Area[i].IdArea){
        delete this.profile.Profile.Area[i].IdArea;
      }else {
        this.profile.Profile.Area[i] = {
          Description: this.profile.Profile.Area[i].Description
        }
      }
    }

    for(let i = 0; i < this.profile.Profile.Language.length; i++){
      if(!this.profile.Profile.Language[i].IdLanguage) {
        this.profile.Profile.Language[i] = { 
          IdLanguage: this.profile.Profile.Language[i].IdCatalogDetail,
          Description: this.profile.Profile.Language[i].Description
        }
      }
    }
    
    for(let i = 0; i < this.profile.Profile.Location.length; i++){
      if(!this.profile.Profile.Location[i].IdLocationType) {
        this.profile.Profile.Location[i] = { 
          IdLocationType: this.profile.Profile.Location[i].IdCatalogDetail,
          Description: this.profile.Profile.Location[i].Description
        }
      }
    }
    
    console.log(this.profile);

    this.swa.loading('Guardando cambios ...');

    this.httpService.buildPostRequest('user/update', this.profile)
      .subscribe((data: any) => {
        this.swa.success('Perfil Actualizado', 'El perfil se actualizó correctamente.');
        console.log(data);
      }, (error) => {
        this.swa.info(error.message, '');
      });
  }

  isValid(){
    let isValid = true;
    
    if(!this.profile.Profile.Service) 
      isValid = false;

    if(!this.profile.uploadProfilePhoto) 
      isValid = false;

    if(!this.profile.uploadCoverPhoto) 
      isValid = false;

    return isValid;
  }

  addService(){
    if(!this.profile.Profile.Service)
      this.profile.Profile.Service = [];

    if(!this.service || !this.service.IdCatalogDetail) return;

    this.profile.Profile.Service.push({ IdServiceType: this.service.IdCatalogDetail , Description: this.service.Description });
    for(let i = 0; i < this.services.length; i++){
      if(this.service.IdCatalogDetail == this.services[i].IdCatalogDetail) {
        this.services.splice(i, 1);
        this.services = [...this.services];
      }
    }
    delete this.service;
  }

  removeService(index){
    this.services.push({ IdCatalogDetail: this.profile.Profile.Service[index].IdServiceType , Description: this.profile.Profile.Service[index].Description });
    this.services = [...this.services];
    this.profile.Profile.Service.splice(index, 1);
  }

  uploadMedia(event, mediaType, mediaPosition){
    let target = event.target || event.srcElement;
    if (target.files && target.files[0]) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
          this.sendMedia(fileReader.result, mediaType, mediaPosition);
        };
        fileReader.readAsDataURL(target.files[0]);
    }
  }

  removeMedia(idMedia, uri){
    this.deleteMedia(idMedia, uri);
  }

  sendMedia(base64, mediaType, mediaPosition){
    $('#profileImg').wrap('<form>').closest('form').get(0).reset();
    $('#profileImg').unwrap();

    $('#coverImg').wrap('<form>').closest('form').get(0).reset();
    $('#coverImg').unwrap();

    if($('#photos').wrap('<form>').closest('form').get(0)){
      $('#photos').wrap('<form>').closest('form').get(0).reset();
      $('#photos').unwrap();
    }
    if($('#videos').wrap('<form>').closest('form').get(0)){
      $('#videos').wrap('<form>').closest('form').get(0).reset();
      $('#videos').unwrap();
    }

    let file = this.base64toFile(base64, 'file' + new Date().getTime());
    
    var formData = new FormData();

    formData.append('IdProfile', this.profile.Profile.IdProfile);
    formData.append('MediaType', mediaType);
    formData.append('MediaPosition', mediaPosition);
    formData.append('Data', file);

    this.swa.loading('Cargando archivo ...');

    this.httpService.buildPostRequest('user/media/upload', formData)
      .subscribe((data: any) => {
        console.log(data);
        this.swa.close();

        this.profile.Profile.Media.push({ MediaType: data.MediaType, MediaPosition: data.MediaPosition, Uri: data.Uri });
        this.getMedia();
      }, (error) => {
        this.swa.info(error.message, '');
      });    
  }

  deleteMedia(idMedia, uri){
    this.swa.loading('Eliminando archivo ...');

    this.httpService.buildPostRequest('user/media/delete', { IdMedia: idMedia, Uri: uri })
      .subscribe((data: any) => {
        this.swa.close();
        this.getMedia();
      }, (error) => {
        this.swa.info(error.message, '');
      });    
  }


  removeComment(commentId, index){
    this.swa.confirm('¿Deseas eliminar el comentario?', '', (response) => {
      if(response.value){
        this.swa.loading('Eliminando comentario ...');

        this.httpService.buildPostRequest('user/public/comment/delete', { IdComment: commentId, IdProfile: this.profile.Profile.IdProfile })
          .subscribe((data: any) => {
            this.swa.close();
            
            this.swa.success('Comentario Eliminado', 'El comentario se elimino correctamente.');
            this.profile.Profile.Comment.splice(index, 1);

          }, (error) => {
            this.swa.info(error.message, '');
          });    
      }
    });
  }


  base64toFile(dataurl, filename) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  getLanguages(){
    let filter = { Filtering: { IdCatalog: 6 }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data: Array<any>) => {
        this.languages = data;
      }, (error) => {
        this.swa.info(error.message, '');
      });
  }

  getLocations(){
    let filter = { Filtering: { IdCatalog: 5 }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data: Array<any>) => {
        
        this.locations = data;
      }, (error) => {
        this.swa.info(error.message, '');
      });
  }

  getStates(){
    let filter = { Filtering: { IdCatalog: 7 }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data: Array<any>) => {
        this.states = data;
      }, (error) => {
        this.swa.info(error.message, '');
      });
  }

  getCities(clean){
    if(clean){
      this.cities = [];
      this.profile.Profile.KeyTown = '';
    }

    if(!this.profile.Profile.KeyState) return;

    let filter = { Filtering: { IdCatalog: 8, KeyState: this.profile.Profile.KeyState }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data: Array<any>) => {
        this.cities = data;
      }, (error) => {
        this.swa.info(error.message, '');
      });
  }

  getZones(){
    if(!this.profile.Profile.KeyState || this.profile.Profile.KeyTown) return;
     
    let filter = { Filtering: { IdCatalog: 9, KeyState: this.profile.Profile.KeyState, KeyTown: this.profile.Profile.KeyTown }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data: Array<any>) => {
        this.zones = data;
      }, (error) => {
        this.swa.info(error.message, '');
      });
  }

  getNationalities(){
    let filter = { Filtering: { IdCatalog: 10 }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data: Array<any>) => {
        this.nationalities = data;
      }, (error) => {
        this.swa.info(error.message, '');
      });
  }

  getServices(){
    let filter = { Filtering: { IdCatalog: 4 }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data: Array<any>) => {
        if(this.profile.Profile.Service){
          let services = [];
          for(let i = 0; i < data.length; i++){
            let exist = false;
            for(let j = 0; j < this.profile.Profile.Service.length; j++){
              if(data[i].IdCatalogDetail == this.profile.Profile.Service[j].IdServiceType){
                exist = true;
              }
            }
            if(!exist)
              services.push(data[i]);
          }
          this.services = services;
        }else {
          this.services = data;
        }
      }, (error) => {
        this.swa.info(error.message, '');
      });
  }

  getColorEyes(){
    let filter = { Filtering: { IdCatalog: 1 }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data: Array<any>) => {
        this.colorEyes = data;
      }, (error) => {
        this.swa.info(error.message, '');
      });
  }

  getColorSkin(){
    let filter = { Filtering: { IdCatalog: 3 }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data: Array<any>) => {
        this.colorSkin = data;
      }, (error) => {
        this.swa.info(error.message, '');
      });
  }

  getColorHair(){
    let filter = { Filtering: { IdCatalog: 2 }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data: Array<any>) => {
        this.colorHair = data;
      }, (error) => {
        this.swa.info(error.message, '');
      });
  }

  openModalPhotos(index){
    this.img = this.profile.photos[index].img;
    this.currentIndex = index;

    $('#edit-photo').modal('show');
    $("#edit-photo").appendTo("body");
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
}
