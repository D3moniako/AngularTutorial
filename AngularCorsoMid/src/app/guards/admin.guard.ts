import { Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private userService: UserService,

    private router: Router,
  ) {}

  canActivate(): boolean {
    const user = this.userService.getCurrentUser();

    if (!user) {
      this.router.navigate(['/login']);

      return false;
    }

    if (user.role !== 'ADMIN') {
      alert('Accesso riservato amministratori');

      this.router.navigate(['/']);

      return false;
    }

    return true;
  }
}
