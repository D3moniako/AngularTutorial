import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { UserService } from '../../../services/user.service';

import { User } from '../../../models/user';

@Component({
  selector: 'app-admin-users',

  templateUrl: './admin-users.component.html',

  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;

  users: User[] = [];

  filteredUsers: User[] = [];

  searchText: string = '';

  message: string = '';

  selectedRole: string = 'Tutti';

  totalUsers: number = 0;

  adminCount: number = 0;

  activeCount: number = 0;

  blockedCount: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();

    this.subscription = this.userService.users$.subscribe((users) => {
      this.users = [...users];

      this.updateCounters();

      this.filterUsers();
    });
  }

  loadUsers() {
    this.users = this.userService.getUsers();

    this.updateCounters();

    this.filterUsers();
  }

  updateCounters() {
    this.totalUsers = this.users.length;

    this.adminCount = this.users.filter((u) => u.role === 'ADMIN').length;

    this.activeCount = this.users.filter((u) => u.enabled).length;

    this.blockedCount = this.users.filter((u) => !u.enabled).length;
  }

  filterUsers() {
    let result = [...this.users];

    if (this.searchText.trim()) {
      const text = this.searchText.toLowerCase();

      result = result.filter(
        (user) =>
          (user.name || '')

            .toLowerCase()

            .includes(text) ||
          (user.email || '')

            .toLowerCase()

            .includes(text),
      );
    }

    if (this.selectedRole !== 'Tutti') {
      result = result.filter((user) => user.role === this.selectedRole);
    }

    result.sort((a, b) => a.name.localeCompare(b.name));

    this.filteredUsers = result;
  }

  toggleStatus(id: number) {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      return;
    }

    const updatedUser: User = {
      ...user,

      enabled: !user.enabled,
    };

    this.userService.adminUpdateUser(updatedUser);

    this.showMessage('✅ Stato utente aggiornato');
  }

  changeRole(user: User) {
    const updatedUser: User = {
      ...user,

      role: user.role === 'ADMIN' ? 'USER' : 'ADMIN',
    };

    this.userService.adminUpdateUser(updatedUser);

    this.showMessage('🔄 Ruolo modificato');
  }

  deleteUser(id: number) {
    if (confirm('Vuoi eliminare definitivamente questo account?')) {
      this.userService.deleteUser(id);

      this.showMessage('🗑 Utente eliminato');
    }
  }

  private showMessage(text: string) {
    this.message = text;

    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  trackByUser(
    index: number,

    user: User,
  ) {
    return user.id;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
