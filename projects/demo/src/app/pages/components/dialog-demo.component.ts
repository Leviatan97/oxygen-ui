import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent, ButtonComponent } from 'oxygen-ui';

@Component({
  selector: 'app-dialog-demo',
  standalone: true,
  imports: [CommonModule, DialogComponent, ButtonComponent],
  template: `
    <div class="demo-page">
      <h1>Dialog</h1>
      <p class="description">Ventanas modales para interacción o visualización de contenido importante.</p>

      <section class="demo-section">
        <h2>Básico</h2>
        <ox-button label="Abrir Modal" (onClick)="visible = true"></ox-button>

        <ox-dialog 
          header="Título del Diálogo" 
          [(visible)]="visible"
          [width]="'500px'"
          [hasFooter]="true">
          <p>Este es el contenido interno del diálogo. Puedes poner cualquier componente aquí.</p>
          
          <ng-template oxFooter>
            <div class="flex justify-end gap-2">
              <ox-button label="Cancelar" severity="secondary" (onClick)="visible = false"></ox-button>
              <ox-button label="Confirmar" (onClick)="visible = false"></ox-button>
            </div>
          </ng-template>
        </ox-dialog>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 800px; padding: 2rem; }
    h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    .description { font-size: 1.125rem; color: #64748b; margin-bottom: 3rem; }
    .demo-section { margin-bottom: 4rem; }
    .justify-end { justify-content: flex-end; }
    .flex { display: flex; }
    .gap-2 { gap: 0.5rem; }
  `]
})
export class DialogDemoComponent {
  visible = false;
}