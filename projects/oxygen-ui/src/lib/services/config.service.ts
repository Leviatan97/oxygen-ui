import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface OxygenConfig {
  ripple: boolean;
  inputStyle: 'filled' | 'outlined';
  theme: ThemeMode;
}

@Injectable({
  providedIn: 'root'
})
export class OxygenConfigService {
  config = signal<OxygenConfig>({
    ripple: true,
    inputStyle: 'outlined',
    theme: 'light'
  });

  constructor() {
    // Escuchar cambios en el tema para aplicar clases al body
    effect(() => {
      const theme = this.config().theme;
      this.applyTheme(theme);
    });
  }

  updateConfig(newConfig: Partial<OxygenConfig>) {
    this.config.update(current => ({ ...current, ...newConfig }));
  }

  private applyTheme(theme: ThemeMode) {
    if (typeof document === 'undefined') return;
    
    const root = document.documentElement;
    root.classList.remove('ox-dark', 'ox-light');
    
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(prefersDark ? 'ox-dark' : 'ox-light');
    } else {
      root.classList.add(`ox-${theme}`);
    }
  }
}
