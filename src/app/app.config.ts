import { ApplicationConfig, inject, provideExperimentalZonelessChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { TranslationService } from './core/i18n/translate.service';
import { DEFAULT_LOCALE } from './shared/i18n/locale.model';
import { provideHttpClient } from '@angular/common/http';

function initializeTranslations(): () => Promise<void> {
  const translationService = inject(TranslationService);
  return () => translationService.loadTranslations(DEFAULT_LOCALE);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: { preset: Aura },
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslations,
      multi: true
    }
  ],
};