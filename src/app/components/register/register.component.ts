import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from "../../services/http.service";
import { SweetAlertService } from '../../services/sweet-alert.service';

declare var CryptoJS: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public step: number = 1;
  public register: any = { IdCountry: 142, IsActive: 0, Profile: {} };

  public states: Array<any> = [];
  public cities: Array<any> = [];
  public zones: Array<any> = [];//['Polanco', 'Reforma', 'Revolucion', 'Tlalpan', 'Naucalpan', 'Condesa', 'Santa fe', 'Cuautitlan Izcalli', 'Lindavista', 'Buenavista'];

  public showPassword: boolean = false;

  public textPattern: any = /^[a-z\s0-9Ññ]+$/i;
  public emailPattern: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;

  constructor(private httpService: HttpService,
              private swa: SweetAlertService,
              private router: Router) { }

  ngOnInit() { 
    this.getStates();
  }

  nextStep(){
    this.register.Profile.IdPackage = 2;
    this.step = 2;
  }

  createUser(){
    if(!this.register.Profile.IdPackage) return;

    this.swa.loading('Creando cuenta ...');

    for(let i = 0; i < this.register.Profile.Area.length; i++){
      this.register.Profile.Area[i] = {
        Description: this.register.Profile.Area[i].Description
      }
    }
    
    this.register.Password = CryptoJS.SHA1(this.register.PasswordEncrypt);
    this.register.Password = CryptoJS.enc.Hex.stringify(this.register.Password);

    console.log(this.register);

    this.httpService.buildPostRequest('user/add', this.register)
      .subscribe((data) => {
        this.swa.success('Cuenta creada', 'La cuenta se creó correctamente.', () => {
          this.step = 3;
        });
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

  getCities(){
    this.cities = [];
    this.register.Profile.KeyTown = '';
    this.zones = [];
    this.register.Profile.Zones = [];
    this.register.Profile.Area = [];

    if(!this.register.Profile.KeyState) return;

    let filter = { Filtering: { IdCatalog: 8, KeyState: this.register.Profile.KeyState }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data: Array<any>) => {
        this.cities = data;
      }, (error) => {
        this.swa.info(error.message, '');
      });
  }

  getZones(){
    if(!this.register.Profile.KeyState || !this.register.Profile.KeyTown) return;

    let filter = { Filtering: { IdCatalog: 9, KeyState: this.register.Profile.KeyState, KeyTown: this.register.Profile.KeyTown }, Paging: { All: 1 } };

    this.httpService.buildPostRequest('catalog/get', filter)
      .subscribe((data: Array<any>) => {
        this.zones = data;
      }, (error) => {
        this.swa.info(error.message, '');
      });
  }

  goToHome(){
    this.router.navigate(['home']);
  }
}
