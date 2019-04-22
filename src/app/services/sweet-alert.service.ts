import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

@Injectable()
export class SweetAlertService {

  constructor() { }

  success(title = '', text = '', callback?){
    let options: any = { 
      title: title, 
      text: text, 
      type: 'success', 
      onBeforeOpen: function closeLoading() {
        Swal.hideLoading();
      }
    };
    if(callback){
      Swal.fire(options).then((result) => {
        callback(result);
      });
    }else{
      Swal.fire(options);
    }
  }

  error(title = '', text = ''){
    Swal.fire({ 
      title: title, 
      text: text, 
      type: 'error', 
      onBeforeOpen: function closeLoading() {
        Swal.hideLoading();
      }
    });
  }
  
  loading(title = '', text = '') {
    let options: any = {
      title : title,
      text: text,
      allowOutsideClick : false,
      allowEscapeKey : false,
      onOpen: function(){
          Swal.showLoading();
      }
    };
    Swal.fire(options);
  }

  confirm(title = '', text = '', callbackConfirm?) {
    let options: any = {
      type: 'warning',
      title : title,
      text : text,
      allowOutsideClick : false,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      allowEscapeKey : true,
      reverseButtons: true
    };

    Swal.fire(options).then(function (result){
      if (result.value)
        callbackConfirm(result);
      else
        callbackConfirm({ value: false });
    });
  }

  close() {
    Swal.close();
  }
}
