import { Component, OnInit } from '@angular/core';

import { HttpService } from "../../services/http.service";
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {

  public user: any = {};
  public isValid: boolean = false;

  constructor(private httpService: HttpService,
              private swa: SweetAlertService,) { }

  ngOnInit() { }

  changePassword(){
    this.httpService.buildPostRequest('user/recovery', { NewPassword: this.user.password } )
      .subscribe((data: any) => {
        this.swa.close();

        this.swa.info('La contraseña se ha cambiado correctamente.', '');
      }, (error) => {
        this.swa.info(error.Message, '');
      });
  }

  validate(){
    if(this.user.password == this.user.confirmPassword){
      this.isValid = true;
    }else{
      this.isValid = false;
    }
  }

}
