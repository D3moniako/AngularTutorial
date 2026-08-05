import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Router } from '@angular/router';

import { UserService } from '../../../core/services/user.service';

import { User } from '../../../core/models/user';

import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',

  templateUrl: './header.component.html',

  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuOpen: boolean = false;

  user: User | null = null;

  private userSubscription!: Subscription;

  menuItems = [
    {
      label: 'Home',
      link: '/',
      icon: '🏠',
      private: false,
    },

    {
      label: 'Shop',
      link: '/shop',
      icon: '🛍️',
      private: false,
    },

    {
      label: 'I miei Planner',
      link: '/my-planners',
      icon: '📅',
      private: true,
    },

    {
      label: 'I miei ordini',
      link: '/my-orders',
      icon: '📦',
      private: true,
    },

    {
      label: 'Preferiti',
      link: '/favorites',
      icon: '❤️',
      private: true,
    },

    {
      label: 'Chi siamo',
      link: '/about',
      icon: '🌸',
      private: false,
    },

    {
      label: 'Contatti',
      link: '/contact',
      icon: '✉️',
      private: false,
    },
  ];

  constructor(
    private userService: UserService,
    private menu: MenuController,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userSubscription = this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }

 

  get visibleMenuItems() {
    return this.menuItems.filter((item) => !item.private || this.user);
  }

  logout() {
    this.userService.logout();

    this.menuOpen = false;

    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  closeMenu(){

 this.menu.close('main-menu');

}

goLogin(){

 this.router.navigate(['/login']);

}


goRegister(){

 this.router.navigate(['/register']);

}


goCart(){

 this.router.navigate(['/cart']);

}
}
