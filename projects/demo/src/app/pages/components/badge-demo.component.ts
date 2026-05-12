import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent, ButtonComponent } from 'oxygen-ui';

@Component({
  selector: 'app-badge-demo',
  standalone: true,
  imports: [CommonModule, BadgeComponent, ButtonComponent],
  template: `
    <div class="demo-page">
      <h1>Badges</h1>
      <p class="description">Documentación y ejemplos para badges, nuestro componente de etiquetado pequeño y adaptable.</p>

      <section class="demo-section">
        <h2>Ejemplos</h2>
        <p>Los badges escalan para coincidir con el tamaño del elemento padre inmediato utilizando fuentes relativas y em.</p>
        <div class="card p-4 shadow-sm border rounded">
          <h1>Example heading <ox-badge value="New" severity="secondary"></ox-badge></h1>
          <h2>Example heading <ox-badge value="New" severity="secondary"></ox-badge></h2>
          <h3>Example heading <ox-badge value="New" severity="secondary"></ox-badge></h3>
          <h4>Example heading <ox-badge value="New" severity="secondary"></ox-badge></h4>
          <h5>Example heading <ox-badge value="New" severity="secondary"></ox-badge></h5>
          <h6>Example heading <ox-badge value="New" severity="secondary"></ox-badge></h6>
        </div>
      </section>

      <section class="demo-section">
        <h2>Botones</h2>
        <p>Los badges se pueden utilizar como parte de enlaces o botones para proporcionar un contador.</p>
        <div class="card p-4 shadow-sm border rounded">
          <ox-button severity="primary">
            Notifications <ox-badge value="4" severity="secondary" style="margin-left: 8px"></ox-badge>
          </ox-button>
        </div>
      </section>

      <section class="demo-section">
        <h2>Posicionados</h2>
        <p>Usa utilidades para posicionar un ox-badge en la esquina de un componente.</p>
        <div class="card p-4 shadow-sm border rounded flex gap-4">
          <ox-button severity="primary" class="relative">
            Inbox
            <ox-badge value="99+" severity="error" [overlay]="true"></ox-badge>
          </ox-button>

          <ox-button severity="primary" class="relative">
            Profile
            <ox-badge [dot]="true" severity="error" [overlay]="true"></ox-badge>
            <span class="sr-only">unread messages</span>
          </ox-button>
        </div>
      </section>

      <section class="demo-section">
        <h2>Colores de fondo</h2>
        <p>Usa las severidades para cambiar la apariencia de un badge.</p>
        <div class="card p-4 shadow-sm border rounded flex gap-2 flex-wrap">
          <ox-badge value="Primary" severity="primary"></ox-badge>
          <ox-badge value="Secondary" severity="secondary"></ox-badge>
          <ox-badge value="Success" severity="success"></ox-badge>
          <ox-badge value="Danger" severity="error"></ox-badge>
          <ox-badge value="Warning" severity="warn"></ox-badge>
          <ox-badge value="Info" severity="info"></ox-badge>
        </div>
      </section>

      <section class="demo-section">
        <h2>Badges redondeados</h2>
        <p>Usa la propiedad <code>pill</code> para hacer los badges más redondeados.</p>
        <div class="card p-4 shadow-sm border rounded flex gap-2">
          <ox-badge value="Primary" severity="primary" [pill]="true"></ox-badge>
          <ox-badge value="Secondary" severity="secondary" [pill]="true"></ox-badge>
          <ox-badge value="Success" severity="success" [pill]="true"></ox-badge>
          <ox-badge value="Danger" severity="error" [pill]="true"></ox-badge>
          <ox-badge value="Warning" severity="warn" [pill]="true"></ox-badge>
          <ox-badge value="Info" severity="info" [pill]="true"></ox-badge>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 900px; padding: 2rem; margin: 0 auto; }
    h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    .description { font-size: 1.25rem; color: #64748b; margin-bottom: 3rem; }
    .demo-section { margin-bottom: 3rem; }
    .demo-section h2 { font-size: 1.75rem; font-weight: 600; margin-bottom: 1rem; }
    .demo-section p { color: #64748b; margin-bottom: 1.5rem; }
    .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 1.5rem; }
    .flex { display: flex; }
    .flex-wrap { flex-wrap: wrap; }
    .gap-2 { gap: 0.5rem; }
    .gap-4 { gap: 1rem; }
    .relative { position: relative; display: inline-block; }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
  `]
})
export class BadgeDemoComponent {}