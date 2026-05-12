import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent, InputSwitchComponent } from 'oxygen-ui';

@Component({
  selector: 'app-checkbox-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxComponent, InputSwitchComponent],
  template: `
    <div class="demo-page">
      <h1>Checkbox & Switch</h1>
      <p class="description">Componentes de selección binaria para opciones y estados de encendido/apagado.</p>

      <section class="demo-section">
        <h2>Checkbox</h2>
        <div class="flex flex-column gap-4">
          <ox-checkbox label="Acepto los términos y condiciones" [(checked)]="terms"></ox-checkbox>
          <ox-checkbox label="Recibir newsletter" [(checked)]="news" [disabled]="true"></ox-checkbox>
        </div>
        <p class="mt-4">Estado términos: <b>{{ terms ? 'Aceptado' : 'Pendiente' }}</b></p>
      </section>

      <section class="demo-section">
        <h2>Input Switch</h2>
        <div class="flex flex-column gap-6">
          <div class="switch-container">
            <span>Modo Oscuro</span>
            <ox-input-switch [(checked)]="darkMode"></ox-input-switch>
          </div>
          <div class="switch-container">
            <span>Notificaciones Push</span>
            <ox-input-switch [(checked)]="notifications"></ox-input-switch>
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
    .flex { display: flex; }
    .flex-column { flex-direction: column; }
    .gap-4 { gap: 1rem; }
    .gap-6 { gap: 1.5rem; }
    .mt-4 { margin-top: 1rem; }
    .switch-container { display: flex; align-items: center; justify-content: space-between; max-width: 250px; }
  `]
})
export class CheckboxDemoComponent {
  terms = false;
  news = true;
  darkMode = false;
  notifications = true;
}