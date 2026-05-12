import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioGroupComponent } from 'oxygen-ui';

@Component({
  selector: 'app-radio-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, RadioGroupComponent],
  template: `
    <div class="demo-page">
      <h1>Radio Button</h1>
      <p class="description">Grupo de opciones de selección única.</p>

      <section class="demo-section">
        <h2>Horizontal (Default)</h2>
        <ox-radio-group [options]="options" [(ngModel)]="selectedValue"></ox-radio-group>
        <p class="mt-4">Seleccionado: {{ selectedValue }}</p>
      </section>

      <section class="demo-section">
        <h2>Vertical</h2>
        <ox-radio-group [options]="options" [(ngModel)]="selectedValueVertical" [vertical]="true"></ox-radio-group>
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
export class RadioDemoComponent {
  options = [
    { label: 'Opción 1', value: 1 },
    { label: 'Opción 2', value: 2 },
    { label: 'Opción 3 (Deshabilitada)', value: 3, disabled: true }
  ];
  selectedValue = 1;
  selectedValueVertical = 2;
}
