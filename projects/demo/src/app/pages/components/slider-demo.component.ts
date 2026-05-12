import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from 'oxygen-ui';

@Component({
  selector: 'app-slider-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, SliderComponent],
  template: `
    <div class="demo-page">
      <h1>Slider</h1>
      <p class="description">Control deslizante para valores numéricos.</p>

      <section class="demo-section">
        <h2>Básico</h2>
        <ox-slider [(ngModel)]="value"></ox-slider>
        <p class="mt-4">Valor: {{ value }}</p>
      </section>

      <section class="demo-section">
        <h2>Rango personalizado (0-10)</h2>
        <ox-slider [min]="0" [max]="10" [step]="0.5" [(ngModel)]="valueStep"></ox-slider>
        <p class="mt-4">Valor: {{ valueStep }}</p>
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
export class SliderDemoComponent {
  value = 50;
  valueStep = 5;
}
