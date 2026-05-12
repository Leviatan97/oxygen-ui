import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent, FieldsetComponent, DividerComponent } from 'oxygen-ui';

@Component({
  selector: 'app-panel-demo',
  standalone: true,
  imports: [CommonModule, PanelComponent, FieldsetComponent, DividerComponent],
  template: `
    <div class="demo-page">
      <h1>Panel & Containers</h1>
      <p class="description">Contenedores estructurados para organizar el contenido de la aplicación.</p>

      <section class="demo-section">
        <h2>Panel</h2>
        <ox-panel header="Ajustes de Cuenta" [toggleable]="true">
          <p>Los paneles pueden tener cabecera y ser colapsables para ahorrar espacio.</p>
        </ox-panel>
      </section>

      <section class="demo-section">
        <h2>Fieldset</h2>
        <ox-fieldset legend="Información Personal" [toggleable]="true">
          <p>Ideal para agrupar campos relacionados en formularios.</p>
        </ox-fieldset>
      </section>

      <section class="demo-section">
        <h2>Divider</h2>
        <p>Texto superior</p>
        <ox-divider align="center">CONCEPTO</ox-divider>
        <p>Texto inferior</p>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 800px; padding: 2rem; }
    h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    .description { font-size: 1.125rem; color: #64748b; margin-bottom: 3rem; }
    .demo-section { margin-bottom: 4rem; }
  `]
})
export class PanelDemoComponent {}