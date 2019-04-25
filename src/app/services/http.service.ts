import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
/*
declare var axios: any;
declare var $: any;
*/
@Injectable()
export class HttpService {

  	public API: string = 'http://220.1.1.243/diablitas/';
  	//public API: string = 'http://models.destructor.mx/';

	constructor(private http: HttpClient) { }
	  
	/*buildUploadRequest(uri, data){
		console.log('Con AXIOS');
		return new Promise((resolve, reject) => {
			var settings = {
				"url": this.API + uri,
				"method": "POST",
				"headers": {
				  "Authorization": "Bearer " + sessionStorage.getItem('token'),
				},
				"processData": false,
				"contentType": false,
				"mimeType": "multipart/form-data",
				"data": data
			  }
			  
			  $.ajax(settings).then(function (response) {
				console.log(response);
				resolve(response)
			  });
		});
   	}*/

	buildGetRequest(uri, params?) {
		return this.http
				.get(this.API + uri, { params: params })
				.pipe(catchError(this.handleError));
	}

	buildPostRequest(uri, data) {
		return this.http
				.post(this.API + uri, data)
				.pipe(catchError(this.handleError));
	}

	buildPutRequest(uri, data) {
		return this.http
				.put(this.API + uri, data)
				.pipe(catchError(this.handleError));
	}

	buildDeleteRequest(uri, id) {
		return this.http
				.delete(this.API + uri + id)
				.pipe(catchError(this.handleError));
	}

	private handleError(error: HttpErrorResponse) {
		console.error(error);
		if(error && error.status == 401)
			return throwError('Tu sesión ha expirado o no tienes permisos para realizar esta acción.');
		else if(error && error.status == 404)
			return throwError('No se encontro el servicio solicitado');
		else if(error && error.status == 500)
			return throwError('Ocurrió un problema con el servidor.');
		else 
			return throwError(error.error);
	}

}
