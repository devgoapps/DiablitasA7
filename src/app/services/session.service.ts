import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SessionService {

  public loggedIn = new BehaviorSubject<boolean>(false);
  
  constructor() { }

  get isLoggedIn() {
    let loggedIn = sessionStorage.getItem('loggedIn') == 'true' ? true: false;
    this.loggedIn.next(loggedIn);
    return this.loggedIn.asObservable();
  }

  getToken(){
    let token = sessionStorage.getItem('token');
    return token;
  }

  getId(){
    let id = sessionStorage.getItem('id');
    return id;
  }

  login(id, token){
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  logout(){
    sessionStorage.setItem('loggedIn', 'false');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('token');
    this.loggedIn.next(false);
  }

}
