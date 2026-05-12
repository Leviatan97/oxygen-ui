import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective, ButtonComponent } from 'oxygen-ui';

@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [CommonModule, TooltipDirective, ButtonComponent],
  template: `
    <div class="demo-page">
      <h1>Tooltip</h1>
      <p class="description">Información contextual que aparece al pasar el ratón por encima de un elemento.</p>

      <section class="demo-section">
        <h2>Posiciones</h2>
        <div class="flex flex-wrap gap-4">
          <ox-button label="Arriba" oxTooltip="Mensaje superior" tooltipPosition="top"></ox-button>
          <ox-button label="Abajo" oxTooltip="Mensaje inferior" tooltipPosition="bottom" severity="secondary"></ox-button>
          <ox-button label="Izquierda" oxTooltip="Mensaje izquierdo" tooltipPosition="left" severity="info"></ox-button>
          <ox-button label="Derecha" oxTooltip="Mensaje derecho" tooltipPosition="right" severity="warn"></ox-button>
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
    .flex-wrap { flex-wrap: wrap; }
    .gap-4 { gap: 1rem; }
  `]
})
export class TooltipDemoComponent {}