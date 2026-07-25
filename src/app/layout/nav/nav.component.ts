import { Component, inject, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';

import { NAV_ITEMS } from './nav-items';
import { AuthService } from '../../core/auth/auth.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    DrawerModule,
    IconComponent,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly username = this.authService.username;
  readonly navItems = NAV_ITEMS;

  private readonly mobileMenuState = signal(false);
  readonly isMobileMenuOpen = this.mobileMenuState.asReadonly();

  onDrawerVisibleChange(visible: boolean): void {
    this.mobileMenuState.set(visible);
  }

  toggleMobileMenu(): void {
    this.mobileMenuState.set(!this.mobileMenuState());
  }

  closeMobileMenu(): void {
    this.mobileMenuState.set(false);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('');
  }
}
