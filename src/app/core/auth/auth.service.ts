import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usernameS = signal<string | null>(null);

  readonly username = computed(() => {
    return this.usernameS() || localStorage.getItem('username');
  });

  readonly isLoggedIn = computed(() => {
    return this.username() !== null || localStorage.getItem('username') !== null;
  });

  login(username: string): void {
    this.usernameS.set(username);
    localStorage.setItem('username', username);
  }

  logout(): void {
    this.usernameS.set(null);
    localStorage.removeItem('username');
  }
}
