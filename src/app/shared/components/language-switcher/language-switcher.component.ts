import { Component, computed, inject, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TranslationService } from '../../../core/i18n/translate.service';
import { Locale } from '../../i18n/locale.model';
import { NgClass } from '@angular/common';

const LOCALE_LABELS: Record<Locale, string> = {
  pl: 'PL',
  en: 'EN',
};

interface LanguageOption {
  locale: Locale;
  label: string;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [ButtonModule, NgClass],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent {
  justifyContent = input<'start' | 'center' | 'end'>('start');
  readonly languageSwitcherClass = computed(() => {
    switch (this.justifyContent()) {
      case 'center':
        return 'language-switcher--center';
      case 'end':
        return 'language-switcher--end';
      case 'start':
        return 'language-switcher--start';
    }
  });

  private readonly translationService = inject(TranslationService);

  protected readonly locale = this.translationService.locale;

  protected readonly options: LanguageOption[] = (
    Object.keys(LOCALE_LABELS) as Locale[]
  ).map((locale) => ({ locale, label: LOCALE_LABELS[locale] }));

  async selectLocale(locale: Locale): Promise<void> {
    await this.translationService.setLocale(locale);
  }
}
