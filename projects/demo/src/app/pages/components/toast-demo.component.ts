import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ButtonComponent } from 'oxygen-ui';

@Component({
  selector: 'app-toast-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="demo-page">
      <h1>Toast</h1>
      <p class="description">Mensajes de notificación que aparecen temporalmente en la pantalla.</p>

      <section class="demo-section">
        <h2>Variantes</h2>
        <div class="flex flex-col gap-4">
          <div>
            <h3>Standard (Default)</h3>
            <div class="flex flex-wrap gap-2">
              <ox-button label="Success" variant="success" (onClick)="show('success', 'Completado', 'La tarea se guardó con éxito')"></ox-button>
              <ox-button label="Info" variant="info" (onClick)="show('info', 'Información', 'Tienes un mensaje nuevo')"></ox-button>
            </div>
          </div>
          <div>
            <h3>Filled</h3>
            <div class="flex flex-wrap gap-2">
              <ox-button label="Success Filled" variant="success" (onClick)="show('success', 'Completado', 'La tarea se guardó con éxito', 'filled')"></ox-button>
              <ox-button label="Info Filled" variant="info" (onClick)="show('info', 'Información', 'Tienes un mensaje nuevo', 'filled')"></ox-button>
              <ox-button label="Warning Filled" variant="warning" (onClick)="show('warning', 'Aviso', 'Cuidado con esto', 'filled')"></ox-button>
              <ox-button label="Error Filled" variant="danger" (onClick)="show('error', 'Error', 'Algo salió mal', 'filled')"></ox-button>
            </div>
          </div>
          <div>
            <h3>Outlined</h3>
            <div class="flex flex-wrap gap-2">
              <ox-button label="Success Outlined" variant="success" outline  (onClick)="show('success', 'Completado', 'La tarea se guardó con éxito', 'outlined')"></ox-button>
              <ox-button label="Error Outlined" variant="danger" outline (onClick)="show('error', 'Error', 'Algo salió mal', 'outlined')"></ox-button>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Posiciones</h2>
        <div class="flex flex-wrap gap-2">
          <ox-button label="Top Left" variant="secondary" (onClick)="changePos('top-left')"></ox-button>
          <ox-button label="Top Center" variant="secondary" (onClick)="changePos('top-center')"></ox-button>
          <ox-button label="Top Right" variant="secondary" (onClick)="changePos('top-right')"></ox-button>
          <ox-button label="Bottom Left" variant="secondary" (onClick)="changePos('bottom-left')"></ox-button>
          <ox-button label="Bottom Center" variant="secondary" (onClick)="changePos('bottom-center')"></ox-button>
          <ox-button label="Bottom Right" variant="secondary" (onClick)="changePos('bottom-right')"></ox-button>
          <ox-button label="Center" variant="secondary" (onClick)="changePos('center')"></ox-button>
        </div>
      </section>

      <section class="demo-section">
        <h2>Persistente</h2>
        <ox-button label="Mostrar Sticky" variant="secondary" (onClick)="showSticky()"></ox-button>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 800px; padding: 2rem; }
    h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    .description { font-size: 1.125rem; color: #64748b; margin-bottom: 3rem; }
    .demo-section { margin-bottom: 4rem; }
    .flex { display: flex; }
    .flex-col { flex-direction: column; }
    .flex-wrap { flex-wrap: wrap; }
    .gap-2 { gap: 0.5rem; }
    .gap-4 { gap: 1rem; }
    h2 { font-size: 1.5rem; margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem; }
    h3 { font-size: 1rem; margin-bottom: 0.5rem; color: #64748b; }
  `]
})
export class ToastDemoComponent {
  private toastService = inject(ToastService);

  show(severity: any, summary: string, detail: string, variant: any = 'standard') {
    this.toastService.add({ severity, summary, detail, variant });
  }

  changePos(position: any) {
    this.toastService.setPosition(position);
    this.toastService.add({ 
      severity: 'info', 
      summary: 'Posición cambiada', 
      detail: `La posición ahora es ${position}` 
    });
  }

  showSticky() {
    this.toastService.add({ 
      severity: 'info', 
      summary: 'Sticky Message', 
      detail: 'Este mensaje no se cerrará solo.', 
      sticky: true 
    });
  }
}