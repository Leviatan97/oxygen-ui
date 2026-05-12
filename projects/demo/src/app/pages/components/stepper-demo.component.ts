import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent, StepComponent } from 'oxygen-ui';

@Component({
  selector: 'app-stepper-demo',
  standalone: true,
  imports: [CommonModule, StepperComponent, StepComponent],
  template: `
    <div class="demo-page">
      <h1>Stepper</h1>
      <p class="description">Guía a los usuarios a través de una serie de pasos para completar un proceso.</p>

      <section class="demo-section">
        <h2>Flujo de Registro</h2>
        <ox-stepper [headerNavigation]="true">
          <ox-step label="Cuenta">
            <div class="p-4 border rounded">
              <h3>Datos de Usuario</h3>
              <p>Por favor, ingresa tu correo y contraseña.</p>
            </div>
          </ox-step>
          <ox-step label="Perfil">
            <div class="p-4 border rounded">
              <h3>Tu Perfil</h3>
              <p>Sube una foto y cuéntanos sobre ti.</p>
            </div>
          </ox-step>
          <ox-step label="Finalizar">
            <div class="p-4 border rounded text-center">
              <i class="pi pi-verified text-5xl text-green-500"></i>
              <h3>¡Todo listo!</h3>
              <p>Tu cuenta ha sido creada exitosamente.</p>
            </div>
          </ox-step>
        </ox-stepper>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 800px; padding: 2rem; }
    h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    .description { font-size: 1.125rem; color: #64748b; margin-bottom: 3rem; }
    .demo-section { margin-bottom: 4rem; }
    .p-4 { padding: 1rem; }
    .border { border: 1px solid #e2e8f0; }
    .rounded { border-radius: 8px; }
    .text-center { text-align: center; }
  `]
})
export class StepperDemoComponent {}