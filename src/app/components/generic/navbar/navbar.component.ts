import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from "../../../services/http.service";
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { SessionService } from  '../../../services/session.service';

declare var $: any;
declare var CryptoJS: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public credentials: any = {};

  public isLogin: boolean = true;
  public loggedIn: boolean = false;
  public forgotCredentials: string = '';

  public textPattern: any = /^[a-z\s0-9Ññ]+$/i;
  public emailPattern: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;

  constructor(private router: Router,
              private httpService: HttpService,
              private swa: SweetAlertService,
              private sessionService: SessionService) { }

  ngOnInit() {
    this.sessionService.isLoggedIn
      .subscribe((isLoggedIn) => {
          this.loggedIn = isLoggedIn;
      }); 
  }

  goToHome(){
    this.router.navigate(['home']);
  }

  goToRegister(){
    this.router.navigate(['register']);
  }

  goToLogin(){
    $('#login').modal('show');
    $("#login").appendTo("body");
    $('#login-form')[0].reset();
  }

  saveProfile(){
    $("#submit-btn").click();
  }

  login(){
    this.swa.loading('Iniciando sesión ...');

    this.credentials.Password = CryptoJS.SHA1(this.credentials.PasswordEncrypt);
    this.credentials.Password = CryptoJS.enc.Hex.stringify(this.credentials.Password);

    console.log(this.credentials);

    this.httpService.buildPostRequest('user/login', this.credentials)
      .subscribe((data: any) => {
        this.swa.close();
        
        $('#login').modal('hide');
        this.sessionService.login(data.id, data.token);
        this.router.navigate(['profile', '100']);
      }, (error) => {
        this.swa.error('Ocurrió un problema', error.Message);
      });
  }

  logout(){
    this.sessionService.logout();
    this.router.navigate(['home']);
  }
}
