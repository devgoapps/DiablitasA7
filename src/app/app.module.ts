import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// External modules
import 'hammerjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { NgxMaskModule } from 'ngx-mask';
import { RatingModule } from 'ngx-bootstrap/rating';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';
import { NguCarouselModule } from '@ngu/carousel';

// Router
import { AppRoutingModule } from './app.routing';

// Auth Guard
import { AuthGuard } from './services/auth.guard';

// Services
import { HttpService } from './services/http.service';
import { SessionService } from './services/session.service';
import { SweetAlertService } from './services/sweet-alert.service';
import { HttpInterceptorService } from './services/http-interceptor.service';

// Main component
import { AppComponent } from './app.component';

// Generic Components
import { NavbarComponent } from './components/generic/navbar/navbar.component';
import { SidebarComponent } from './components/generic/sidebar/sidebar.component';
import { FooterComponent } from './components/generic/footer/footer.component';

// Components
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { EditableProfileComponent } from './components/editable-profile/editable-profile.component';
import { ActivationComponent } from './components/activation/activation.component';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';


@NgModule({
  declarations: [
    AppComponent,

    NavbarComponent,
    SidebarComponent,
    FooterComponent,

    HomeComponent,
    ProfileComponent,
    RegisterComponent,
    EditableProfileComponent,
    ActivationComponent,
    RecoveryPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RecaptchaFormsModule,
    BrowserAnimationsModule,

    NgSelectModule,
    TagInputModule,
    NguCarouselModule,
    NgxMaskModule.forRoot(),
    RatingModule.forRoot(),
    RecaptchaModule.forRoot(),
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    })
  ],
  providers: [
    HttpService,
    SessionService,
    SweetAlertService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
