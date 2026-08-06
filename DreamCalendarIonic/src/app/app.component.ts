import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { MenuController } from '@ionic/angular';

import { UserService } from './core/services/user.service';

import { User } from './core/models/user';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {


  title = 'DreamCalendarIonic';



  user: User | null = null;



  private userSubscription?: Subscription;




  constructor(

    private menu: MenuController,

    private userService: UserService

  ){}





  ngOnInit(){


    this.userSubscription =
    this.userService.user$
    .subscribe(user=>{


      this.user = user;


    });


  }







  closeMenu(){


    this.menu.close('main-menu');


  }







  ngOnDestroy(){


    this.userSubscription?.unsubscribe();


  }



}