import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpService } from '../../services/http.service';
import { SweetAlertService } from '../../services/sweet-alert.service';

declare var $: any;

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  public token: string = '';
  public validate: boolean = false;

  constructor(private route: ActivatedRoute,
              private httpService: HttpService,
              private swa: SweetAlertService) {
    this.route.params.subscribe((params) => {
      this.token = params['token'];
    });
  }

  ngOnInit() {
    $('#myModal').modal('hide');

    this.httpService.buildGetRequest('user/Activate', { token: this.token })
      .subscribe((data) => {
        this.validate = true;
        this.swa.success('Cuenta validada', 'La cuenta se ha validado correctamente.');
      }, (error) => {
        this.swa.error('Ocurrió un problema', 'No se ha podido validar la cuenta.');
      });
  }

  refresh(){
    location.reload();
  }

  goToLogin(){
    $('#login').modal('show');
    $("#login").appendTo("body");
    $('#login-form')[0].reset();
  }
}
