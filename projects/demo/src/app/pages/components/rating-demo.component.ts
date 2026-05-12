import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from 'oxygen-ui';

@Component({
  selector: 'app-rating-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, RatingComponent],
  template: `
    <div class="demo-page">
      <h1>Rating</h1>
      <p class="description">Sistema de puntuación por estrellas.</p>

      <section class="demo-section">
        <h2>Básico</h2>
        <ox-rating [(ngModel)]="value"></ox-rating>
        <p class="mt-4">Puntuación: {{ value }} / 5</p>
      </section>

      <section class="demo-section">
        <h2>Personalizado (10 estrellas)</h2>
        <ox-rating [max]="10" [(ngModel)]="value10"></ox-rating>
      </section>

      <section class="demo-section">
        <h2>Deshabilitado</h2>
        <ox-rating [disabled]="true" [ngModel]="3"></ox-rating>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 800px; padding: 2rem; }
    h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    .description { font-size: 1.125rem; color: #64748b; margin-bottom: 3rem; }
    .demo-section { margin-bottom: 4rem; }
    .demo-section h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.5rem; }
    .mt-4 { margin-top: 1rem; }
  `]
})
export class RatingDemoComponent {
  value = 3;
  value10 = 7;
}
