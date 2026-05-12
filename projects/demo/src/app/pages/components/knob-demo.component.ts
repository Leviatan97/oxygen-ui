import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'oxygen-ui';

@Component({
  selector: 'app-knob-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, KnobComponent],
  template: `
    <div class="demo-page">
      <h1>Knob</h1>
      <p class="description">Control circular interactivo para valores numéricos.</p>

      <section class="demo-section">
        <h2>Básico</h2>
        <div class="flex flex-col items-center">
          <ox-knob [(ngModel)]="value" label="Temperatura" unit="°C"></ox-knob>
          <p class="mt-4">Valor actual: {{ value }}°C</p>
        </div>
      </section>

      <section class="demo-section">
        <h2>Personalizado (0-200)</h2>
        <div class="flex justify-center">
          <ox-knob [min]="0" [max]="200" [step]="10" [(ngModel)]="value2" label="Potencia" unit="W"></ox-knob>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 800px; padding: 2rem; }
    h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    .description { font-size: 1.125rem; color: #64748b; margin-bottom: 3rem; }
    .demo-section { margin-bottom: 4rem; }
    .demo-section h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.5rem; }
    .flex { display: flex; }
    .flex-col { flex-direction: column; }
    .items-center { align-items: center; }
    .justify-center { justify-content: center; }
    .mt-4 { margin-top: 1rem; }
  `]
})
export class KnobDemoComponent {
  value = 24;
  value2 = 100;
}
