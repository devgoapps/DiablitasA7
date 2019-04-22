import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from  '../../../services/session.service';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public slideout: any;
  public loggedIn: boolean = false;

  constructor(private router: Router,
              private sessionService: SessionService) { }

  ngOnInit() {
    this.sessionService.isLoggedIn
      .subscribe((isLoggedIn) => {
          console.log(isLoggedIn);
          this.loggedIn = isLoggedIn;
      }); 
  }

  saveProfile(){
    $("#submit-btn").click();
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

  logout(){
    this.sessionService.logout();
    this.router.navigate(['home']);
  }
}
