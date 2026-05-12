import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-placeholder-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="demo-page">
      <h1>{{ title }}</h1>
      <p class="description">
        Esta es una página de demostración para el componente <strong>{{ title }}</strong>.
      </p>
      <div class="coming-soon">
        <div class="icon">🚧</div>
        <p>Estamos trabajando activamente en esta documentación. ¡Pronto verás ejemplos interactivos aquí!</p>
      </div>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 800px; }
    h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    .description { font-size: 1.125rem; color: #64748b; margin-bottom: 3rem; }
    .coming-soon { 
      padding: 4rem; 
      background: #f8fafc; 
      border-radius: var(--radius-lg); 
      border: 2px dashed #e2e8f0;
      text-align: center;
      color: #64748b;
    }
    .icon { font-size: 3rem; margin-bottom: 1rem; }
  `]
})
export class PlaceholderDemoComponent {
  title = 'Componente';
}