import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector:'app-side-menu',
  templateUrl:'./side-menu.component.html',
  styleUrls:['./side-menu.component.scss']
})
export class SideMenuComponent {


constructor(

 private router:Router,

 private menu:MenuController

){}



navigate(url:string){


 this.menu.close('main-menu');


 this.router.navigateByUrl(url);


}



}