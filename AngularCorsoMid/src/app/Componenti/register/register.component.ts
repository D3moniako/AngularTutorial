import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

import { User } from '../../models/user';

@Component({
  selector: 'app-register',

  templateUrl: './register.component.html',

  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = {
    id: 0,

    name: '',

    email: '',

    password: '',

    phone: '',

    role: 'USER',

    enabled: true,

    twoFactorEnabled: false,

    createdAt: '',

    avatar: '',
  };

  confirmPassword: string = '';

  errorMessage: string = '';

  loading: boolean = false;

  constructor(
    private userService: UserService,

    private router: Router,
  ) {}

  register() {
    this.errorMessage = '';

    // pulizia dati inseriti

    this.user.name = this.user.name.trim();

    this.user.email = this.user.email.trim();

    this.user.phone = this.user.phone?.trim() || '';

    // =================================
    // CONTROLLI CAMPI
    // =================================

    if (!this.user.name || !this.user.email || !this.user.password) {
      this.errorMessage = 'Compila tutti i campi obbligatori';

      return;
    }

    if (this.user.name.length < 2) {
      this.errorMessage = 'Nome troppo corto';

      return;
    }

    if (!this.user.email.includes('@')) {
      this.errorMessage = 'Email non valida';

      return;
    }

    if (this.user.phone && this.user.phone.length < 8) {
      this.errorMessage = 'Numero di telefono non valido';

      return;
    }

    if (this.user.password.length < 6) {
      this.errorMessage = 'La password deve avere almeno 6 caratteri';

      return;
    }

    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = '❌ Le password non coincidono';

      return;
    }

    this.loading = true;

    // =================================
    // REGISTRAZIONE UTENTE
    // =================================

    const result = this.userService.register(this.user);

    if (result) {
      alert('🌸 Registrazione completata');

      this.router.navigate(['/login']);
    } else {
      this.errorMessage = '⚠️ Email già utilizzata';
    }

    this.loading = false;
  }
}
