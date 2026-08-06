import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user';


@Component({

  selector: 'app-side-menu',

  templateUrl: './side-menu.component.html',

  styleUrls: ['./side-menu.component.scss']

})
export class SideMenuComponent implements OnInit {


  user: User | null = null;



  constructor(

    private router: Router,

    private menu: MenuController,

    private userService: UserService

  ) {}




  ngOnInit(){


    this.userService.user$

    .subscribe(user => {


      this.user = user;


    });


  }




  navigate(url:string){


    this.menu.close('main-menu');


    this.router.navigateByUrl(url);


  }





  logout(){


    this.userService.logout();


    this.menu.close('main-menu');


    this.router.navigateByUrl('/');


  }


}