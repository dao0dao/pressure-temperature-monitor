import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usernameS = signal<string | null>(localStorage.getItem('username'));

  readonly username = computed(() => {
    return this.usernameS();
  });

  readonly isLoggedIn = computed(() => {
    return Boolean(this.username());
  });

  login(username: string): void {
    this.usernameS.set(username);
    localStorage.setItem('username', username);
  }

  logout(): void {
    localStorage.removeItem('username');
    this.usernameS.set(null);
  }
}
