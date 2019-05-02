import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { NguCarouselConfig } from '@ngu/carousel';

declare var $: any;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public fullModels = [
    { name: 'Karlita822', price: 2500, city: 'CDMX', img: 'https://cdn.glamour.es/uploads/images/thumbs/201238/las_mas_sexy_en_lenceria_722345526_1000x667.jpg' },
    { name: 'LuceroHot', price: 2000, city: 'Monterrey', img: 'http://memoflores.com/fotos-de-boudoir-02.jpg' },
    { name: 'AndreaMont', price: 2100, city: 'Guadalajara', img: 'https://ep01.epimg.net/elpais/imagenes/2017/09/05/estilo/1504628663_859971_1504632135_noticia_normal.jpg'},
    { name: 'PaolaSexy', price: 1800, city: 'CDMX', img: 'http://memoflores.com/fotos-de-boudoir-01.jpg'},
    { name: 'Jessi Love', price: 2800, city: 'CDMX', img: 'https://i.ytimg.com/vi/IJTfBViKBdI/maxresdefault.jpg'},
  ];

  public diamondModels = [ 
    { name: 'Alejandra583', price:1800, city: 'CDMX', img: 'https://ae01.alicdn.com/kf/HTB1G.3pX6ihSKJjy0Flq6ydEXXak/Mujeres-lencer-a-sexy-Cuerpo-Lenceria-erotica-Teddy-Lencer-a-sujetador-de-las-mujeres-Ropa-interior.jpg', imgs: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTisb3PekB6GN5ExgGbQBiJxWEEKqYXYNEZlnNCUI7hPJLyjsInMQ', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg'] }, 
    { name: 'July920', price:3000, city: 'Monterrey', img: 'https://www.venca.es/i/916593/l/bikini-estampado-mujer-copa-b-con-relleno-y-braga-alta-estampado-azul.jpg', imgs: ['https://www.venca.es/i/916593/l/bikini-estampado-mujer-copa-b-con-relleno-y-braga-alta-estampado-azul.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg']},
    { name: 'LyndallSex', price:1900, city: 'Puebla', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTisb3PekB6GN5ExgGbQBiJxWEEKqYXYNEZlnNCUI7hPJLyjsInMQ', imgs: ['https://i.pinimg.com/736x/25/99/29/2599295c134bd149971e89f219fa8b64.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg']}, 
    { name: 'MarianaSexy', price:2000, city: 'CDMX', img: 'https://cdn.glamour.es/uploads/images/thumbs/201240/iquien_se_desnuda_mejor_1319398_320x480.jpg', imgs: ['https://cdn.glamour.es/uploads/images/thumbs/201240/iquien_se_desnuda_mejor_1319398_320x480.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg']},
    { name: 'AndreaBb72', price:2100, city: 'Guadalajara', img: 'https://ae01.alicdn.com/kf/HTB1koF_kOOYBuNjSsD4q6zSkFXaU/Los-nuevos-modelos-calientes-de-encaje-japon-s-bordado-Lencer-a-ajustable-Sujetador-push-up-sexy.jpg_640x640.jpg', imgs: ['https://ae01.alicdn.com/kf/HTB1koF_kOOYBuNjSsD4q6zSkFXaU/Los-nuevos-modelos-calientes-de-encaje-japon-s-bordado-Lencer-a-ajustable-Sujetador-push-up-sexy.jpg_640x640.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg'] },  
    { name: 'PaolaChuiquita', price:2300, city: 'CDMX', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROnlyjeT_tI6BTqwAUxS8RQ_Ih5TiE8hrqzZZGnXnaqH8HJ4_FGg', imgs: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROnlyjeT_tI6BTqwAUxS8RQ_Ih5TiE8hrqzZZGnXnaqH8HJ4_FGg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg']},
    { name: 'CarmenDiaz', price:1250, city: 'CDMX', img: 'https://farm5.staticflickr.com/4715/39643698541_c3c074638b_b.jpg', imgs: ['https://farm5.staticflickr.com/4715/39643698541_c3c074638b_b.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg'] }, 
    { name: 'Karlita822', price: 2500, city: 'Monterrey', img: 'http://pueblaonline.com.mx/2015/portal/movil//media/k2/galleries_p/51972/thumb_front/mk4.jpg', imgs: ['http://pueblaonline.com.mx/2015/portal/movil//media/k2/galleries_p/51972/thumb_front/mk4.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg']},
    { name: 'LuceroHot', price: 2000, city: 'Cancún', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj1IFGYZfWQceE1It_WaFf6PWhYfmZdC42-s-rRMWe9Sp8nmMk', imgs: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj1IFGYZfWQceE1It_WaFf6PWhYfmZdC42-s-rRMWe9Sp8nmMk', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg'] },
    { name: 'AndreaMont', price: 2100, city: 'CDMX', img: 'https://http2.mlstatic.com/disfraz-erotico-sex-appeal-disfraces-lenceria-modelos-2017-D_NQ_NP_184121-MLA20713237451_052016-F.jpg', imgs: ['https://http2.mlstatic.com/disfraz-erotico-sex-appeal-disfraces-lenceria-modelos-2017-D_NQ_NP_184121-MLA20713237451_052016-F.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg']},
    { name: 'PaolaSexy', price: 1800, city: 'Guadalajara', img: 'https://i.pinimg.com/736x/25/99/29/2599295c134bd149971e89f219fa8b64.jpg', imgs: ['https://ae01.alicdn.com/kf/HTB1G.3pX6ihSKJjy0Flq6ydEXXak/Mujeres-lencer-a-sexy-Cuerpo-Lenceria-erotica-Teddy-Lencer-a-sujetador-de-las-mujeres-Ropa-interior.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg']},
  ];

  public silverModels = [ 
    { name: 'Alejandra583', price:1800, city: 'Guadalajara', img: 'http://cubacute.com/wp-content/uploads/2018/02/las_modelos_de_lenceria_mas_influyentes_en_instagram__765680421_1440x1800.jpg', imgs: ['http://cubacute.com/wp-content/uploads/2018/02/las_modelos_de_lenceria_mas_influyentes_en_instagram__765680421_1440x1800.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg'] }, 
    { name: 'July920', price:3000, city: 'CDMX', img: 'https://www.dhresource.com/0x0s/f2-albu-g6-M00-BD-31-rBVaR1uvFNSAdkmpAAQelc0dZH0448.jpg/los-modelos-de-explosi-n-de-las-nuevas-mujeres.jpg', imgs: ['https://www.dhresource.com/0x0s/f2-albu-g6-M00-BD-31-rBVaR1uvFNSAdkmpAAQelc0dZH0448.jpg/los-modelos-de-explosi-n-de-las-nuevas-mujeres.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg'] },
    { name: 'LyndallSex', price:1900, city: 'CDMX', img: 'https://img.ltwebstatic.com/origin/images2_pi/2018/07/25/1532517252337159212_im_600x799.jpg', imgs: ['https://img.ltwebstatic.com/origin/images2_pi/2018/07/25/1532517252337159212_im_600x799.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg'] }, 
    { name: 'MarianaSexy', price:2000, city: 'Monterrey', img: 'https://www.instyle.es/medio/2017/12/14/anine-bing-lenceria-357-620x930_12a86a0c.jpg', imgs: ['https://www.instyle.es/medio/2017/12/14/anine-bing-lenceria-357-620x930_12a86a0c.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg'] },
    { name: 'AndreaBb72', price:2100, city: 'CDMX', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWOpoNoWMpw0PU9Qp_idVf1oxy3HyqZos615Xps3lJi-RsI9eS', imgs: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWOpoNoWMpw0PU9Qp_idVf1oxy3HyqZos615Xps3lJi-RsI9eS', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg'] },  
    { name: 'PaolaChuiquita', price:2300, city: 'CDMX', img: 'http://i2.wp.com/www.sopitas.com/site/wp-content/uploads/2014/11/nopsh12.jpg?resize=500%2C648', imgs: ['http://i2.wp.com/www.sopitas.com/site/wp-content/uploads/2014/11/nopsh12.jpg?resize=500%2C648', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg'] },
    { name: 'CarmenDiaz', price:1250, city: 'Guadalajara', img: 'https://image.dhgate.com/0x0/f2/albu/g10/M01/30/AB/rBVaWVwGfByAUE5MAAcDajP5stg421.jpg', imgs: ['https://image.dhgate.com/0x0/f2/albu/g10/M01/30/AB/rBVaWVwGfByAUE5MAAcDajP5stg421.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg'] }, 
    { name: 'Karlita822', price: 2500, city: 'CDMX', img: 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg', imgs: ['https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg'] },
    { name: 'LuceroHot', price: 2000, city: 'Monterrey', img: 'https://i.pinimg.com/originals/4e/05/c9/4e05c9072b7b6562f0e6eabc7bb4c8ce.jpg', imgs: ['https://i.pinimg.com/originals/4e/05/c9/4e05c9072b7b6562f0e6eabc7bb4c8ce.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg'] },
    { name: 'AndreaMont', price: 2100, city: 'CDMX', img: 'https://static.ellahoy.es/ellahoy/fotogallery/845X0/122553/todos-los-modelos-de-bikinis-con-paillettes-del-verano-2013.jpg', imgs: ['https://static.ellahoy.es/ellahoy/fotogallery/845X0/122553/todos-los-modelos-de-bikinis-con-paillettes-del-verano-2013.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg']},
    { name: 'PaolaSexy', price: 1800, city: 'CDMX', img: 'http://directoriofemenino.com/wp-content/uploads/2012/02/modelos-de-lenceria.jpg', imgs: ['http://directoriofemenino.com/wp-content/uploads/2012/02/modelos-de-lenceria.jpg', 'https://www-s.mlo.me/upen/v/2018/201806/20180606/201806061649035536106.jpg']},
  ];

  public carouselBanner: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    slide: 1,
    speed: 250,
    interval: {
      timing: 2500
    },
    point: {
      visible: true
    },
    load: 1,
    loop: true,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };

  public carouselTile: NguCarouselConfig = {
    grid: { xs: 1, sm: 3, md: 4, lg: 5, all: 0 },
    slide: 1,
    speed: 250,
    animation: 'lazy',
    interval: {
      timing: 2500
    },
    point: {
      visible: true
    },
    velocity: 0,
    load: 1,
    touch: true,
    loop: true,
  };
  
  //public credentials: any = {};

  constructor(private router: Router) { }

  ngOnInit() { }

  ngAfterViewInit(){
    //window.scrollTo(0, 0)
  }

  goToProfile(){
    this.router.navigate(['ad', '67']);
  }
  
  openLevelsModal(){
    $('#levels').modal('show');
    $("#levels").appendTo("body");
  }

  /*
  goToRegister(){
    this.router.navigate(['register']);
  }*/

  /*moveToGalery(){
    $('html, body').animate({
      scrollTop: $("#galery").offset().top
    }, 800, function(){ 
      window.location.hash = "#galery";
    });
  }*/

  /*openLoginModal(){
    $('#login').modal('show');
    $("#login").appendTo("body");
  }*/

  /*login(){
    console.log(this.credentials);
    $('#login').modal('hide');
  }*/

}
