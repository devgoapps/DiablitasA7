import { Component, OnInit } from '@angular/core';

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
  public img: string = '';
  public currentIndex: number = 0;
  public profile: any = { Profile: {}, photos: [], videos: [], services: [] };
  public zonesSource: any[] = ['Polanco', 'Reforma', 'Revolucion', 'Tlalpan', 'Naucalpan', 'Condesa', 'Santa fe', 'Cuautitlan Izcalli', 'Lindavista', 'Buenavista'];

  public modelPhotos = [ 
   
  ];

  public service: any = {};

  public states: Array<any> = [];
  public cities: Array<any> = [];
  public zones: Array<any> = [];
  public nationalities: Array<any> = [];
  public services: Array<any> = [];
  public colorEyes: Array<any> = [];
  public colorSkin: Array<any> = [];
  public colorHair: Array<any> = [];

  constructor(private httpService: HttpService,
              private swa: SweetAlertService) { }

  ngOnInit() { 
    this.getStates();
    this.getNationalities();
    this.getColorEyes();
    this.getColorSkin();
    this.getColorHair();
    this.getServices();
  }

  ngAfterViewInit(){
    window.scrollTo(0, 0);
    this.initCarruselEvent();

    $('#profile-img-error').tooltip({
      title: 'La imagen de perfil es requerida',
      position: 'top'
    })
  }

  submit(){
    $("#submit-btn").click()
  }

  saveProfile(){
    console.log('GUARDANDO PERFIL ...');
  }

  addService(){
    if(!this.service) return;

    this.profile.services.push(this.service);
    for(let i = 0; i < this.services.length; i++){
      if(this.service.IdCatalogDetail == this.services[i].IdCatalogDetail) {
        this.services.splice(i, 1);
        this.services = [...this.services];
      }
    }
    delete this.service;
  }

  removeService(index){
    this.services.push(this.profile.services[index]);
    this.services = [...this.services];
    this.profile.services.splice(index, 1);
  }

  uploadCoverPhoto(event){
    let target = event.target || event.srcElement;
    if (target.files && target.files[0]) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            this.profile.uploadCoverPhoto = fileReader.result;
            this.profile.newUploadCoverPhoto = true;
        };
        fileReader.readAsDataURL(target.files[0]);
    }
  }

  uploadProfilePhoto(event){
    let target = event.target || event.srcElement;
    if (target.files && target.files[0]) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            this.profile.uploadProfilePhoto = fileReader.result;
            this.profile.newUploadProfilePhoto = true;
        };
        fileReader.readAsDataURL(target.files[0]);
    }
  }

  uploadPhoto(event){
    let target = event.target || event.srcElement;
    if (target.files && target.files[0]) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            this.profile.photos.push({ img: fileReader.result });
            //this.profile.newUploadProfilePhoto = true;
        };
        fileReader.readAsDataURL(target.files[0]);
    }
  }

  uploadVideo(event){
    let target = event.target || event.srcElement;
    if (target.files && target.files[0]) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            this.profile.videos.push({ video: fileReader.result });
            //this.profile.newUploadProfilePhoto = true;
        };
        fileReader.readAsDataURL(target.files[0]);
    }
  }

  removeVideo(index){
    this.profile.videos.splice(index, 1);
  }

  removePhoto(index){
    this.profile.photos.splice(index, 1);
  }


  base64toFile(dataurl, filename) {
      let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
  }

  getStates(){
    let filter = { Filtering: { IdCatalog: 7 }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data: Array<any>) => {
        this.states = data;
      }, (error) => {
        this.swa.error('Ocurrió un problema', error.message);
      });
  }

  getCities(){
    let filter = { Filtering: { IdCatalog: 8, KeyState: this.profile.Profile.KeyState }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data: Array<any>) => {
        this.cities = data;
      }, (error) => {
        this.swa.error('Ocurrió un problema', error.message);
      });
  }

  getZones(){
    let filter = { Filtering: { IdCatalog: 9, KeyState: this.profile.Profile.KeyState, KeyTown: this.profile.Profile.KeyTown }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data: Array<any>) => {
        this.zones = data;
      }, (error) => {
        this.swa.error('Ocurrió un problema', error.message);
      });
  }

  getNationalities(){
    let filter = { Filtering: { IdCatalog: 10 }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data: Array<any>) => {
        this.nationalities = data;
      }, (error) => {
        this.swa.error('Ocurrió un problema', error.message);
      });
  }

  getServices(){
    let filter = { Filtering: { IdCatalog: 4 }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data: Array<any>) => {
        this.services = data;
      }, (error) => {
        this.swa.error('Ocurrió un problema', error.message);
      });
  }

  getColorEyes(){
    let filter = { Filtering: { IdCatalog: 1 }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data: Array<any>) => {
        this.colorEyes = data;
      }, (error) => {
        this.swa.error('Ocurrió un problema', error.message);
      });
  }

  getColorSkin(){
    let filter = { Filtering: { IdCatalog: 3 }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data: Array<any>) => {
        this.colorSkin = data;
      }, (error) => {
        this.swa.error('Ocurrió un problema', error.message);
      });
  }

  getColorHair(){
    let filter = { Filtering: { IdCatalog: 2 }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data: Array<any>) => {
        this.colorHair = data;
      }, (error) => {
        this.swa.error('Ocurrió un problema', error.message);
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
