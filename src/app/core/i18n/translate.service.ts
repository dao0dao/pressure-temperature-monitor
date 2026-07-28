import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { DEFAULT_LOCALE, Locale } from '../../shared/i18n/models/locale.model';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly http = inject(HttpClient);

  private readonly localeSignal = signal<Locale>(DEFAULT_LOCALE);
  private readonly translations = new Map<Locale, unknown>();

  readonly locale = this.localeSignal.asReadonly();


  async setLocale(locale: Locale): Promise<void> {
    await this.loadTranslations(locale);
    this.localeSignal.set(locale);
  }

  async loadTranslations(locale: Locale): Promise<void> {
    if (this.translations.has(locale)) {
      return;
    }
    const messages = await firstValueFrom(this.http.get(`i18n/${locale}.json`)).catch(e => new Object);
    this.translations.set(locale, messages);
  }

  translate(key: string): string {
    const source = this.translations.get(this.localeSignal());
    return source ? this.resolveKey(source, key) : key;
  }

  private resolveKey(source: unknown, path: string): string {
  const value = path.split('.').reduce<unknown>((acc, translationKey) => {
    if (acc !== null && typeof acc === 'object' && translationKey in acc) {
      return (acc as Record<string, unknown>)[translationKey];
    }
    return undefined;
  }, source);

  return typeof value === 'string' ? value : path;
}
}
