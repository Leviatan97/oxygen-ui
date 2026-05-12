import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputSwitchComponent } from 'oxygen-ui';

@Component({
  selector: 'app-input-switch-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, InputSwitchComponent],
  template: `
    <div class="demo-page">
      <h1>Input Switch</h1>
      <p class="description">Interruptor binario para estados activado/desactivado.</p>

      <section class="demo-section">
        <h2>Básico</h2>
        <div class="flex items-center gap-4">
          <ox-input-switch [(ngModel)]="checked"></ox-input-switch>
          <span>{{ checked ? 'Activado' : 'Desactivado' }}</span>
        </div>
      </section>

      <section class="demo-section">
        <h2>Colores</h2>
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <ox-input-switch color="primary" [(ngModel)]="checked1"></ox-input-switch>
            <span>Primario</span>
          </div>
          <div class="flex items-center gap-2">
            <ox-input-switch color="success" [(ngModel)]="checked2"></ox-input-switch>
            <span>Éxito</span>
          </div>
          <div class="flex items-center gap-2">
            <ox-input-switch color="danger" [(ngModel)]="checked3"></ox-input-switch>
            <span>Peligro</span>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Estados</h2>
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <ox-input-switch [disabled]="true" [ngModel]="true"></ox-input-switch>
            <span>Deshabilitado activado</span>
          </div>
          <div class="flex items-center gap-2">
            <ox-input-switch [disabled]="true" [ngModel]="false"></ox-input-switch>
            <span>Deshabilitado desactivado</span>
          </div>
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
    .gap-2 { gap: 0.5rem; }
    .gap-4 { gap: 1rem; }
  `]
})
export class InputSwitchDemoComponent {
  checked = true;
  checked1 = true;
  checked2 = true;
  checked3 = true;
}
