import { Component } from '@angular/core';
import { DividerComponent, CardComponent, ButtonComponent } from 'oxygen-ui';

@Component({
  selector: 'app-divider-demo',
  standalone: true,
  imports: [DividerComponent, CardComponent, ButtonComponent],
  template: `
    <div class="demo-container">
      <h1>Divider</h1>
      <p class="demo-description">El componente Divider se utiliza para separar contenido con líneas opcionales y etiquetas.</p>

      <section class="demo-section">
        <ox-card>
          <div class="p-4">
            <h5>Básico (Horizontal)</h5>
            <p>Contenido superior</p>
            <ox-divider></ox-divider>
            <p>Contenido inferior</p>
          </div>
        </ox-card>
      </section>

      <section class="demo-section mt-4">
        <ox-card>
          <div class="p-4">
            <h5>Con Etiquetas y Posiciones</h5>
            <p>Izquierda</p>
            <ox-divider label="IZQUIERDA" labelPosition="start"></ox-divider>
            <p>Centro</p>
            <ox-divider label="CENTRO" labelPosition="center"></ox-divider>
            <p>Derecha</p>
            <ox-divider label="DERECHA" labelPosition="end"></ox-divider>
          </div>
        </ox-card>
      </section>

      <section class="demo-section mt-4">
        <ox-card>
          <div class="p-4">
            <h5>Estilos de Borde</h5>
            <p>Sólido (Default)</p>
            <ox-divider borderStyle="solid"></ox-divider>
            <p>Discontinuo (Dashed)</p>
            <ox-divider borderStyle="dashed"></ox-divider>
            <p>Punteado (Dotted)</p>
            <ox-divider borderStyle="dotted"></ox-divider>
          </div>
        </ox-card>
      </section>

      <section class="demo-section mt-4">
        <ox-card>
          <div class="p-4">
            <h5>Vertical</h5>
            <div class="flex items-center" style="height: 50px;">
                <span>Opción 1</span>
                <ox-divider orientation="vertical"></ox-divider>
                <span>Opción 2</span>
                <ox-divider orientation="vertical"></ox-divider>
                <span>Opción 3</span>
            </div>
          </div>
        </ox-card>
      </section>
    </div>
  `,
  styles: [`
    .demo-container { padding: 2rem; max-width: 800px; margin: 0 auto; }
    .demo-section { margin-bottom: 2rem; }
    .demo-description { color: var(--text-muted); margin-bottom: 2rem; }
    h5 { margin-bottom: 1rem; font-weight: 600; }
    .flex { display: flex; }
    .items-center { align-items: center; }
  `]
})
export class DividerDemoComponent {}


