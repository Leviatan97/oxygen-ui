import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateInputComponent } from 'oxygen-ui';

@Component({
  selector: 'app-date-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, DateInputComponent],
  template: `
    <div class="demo-page">
      <h1>Date Input</h1>
      <p class="description">Selector de fecha estándar con soporte para min/max.</p>

      <section class="demo-section">
        <h2>Básico</h2>
        <ox-date-input label="Fecha de Nacimiento"></ox-date-input>
      </section>

      <section class="demo-section">
        <h2>Límites</h2>
        <div class="demo-grid">
          <ox-date-input label="Mínimo 2024-01-01" min="2024-01-01"></ox-date-input>
          <ox-date-input label="Máximo 2024-12-31" max="2024-12-31"></ox-date-input>
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
    .demo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
  `]
})
export class DateDemoComponent {}
