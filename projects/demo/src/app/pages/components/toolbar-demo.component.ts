import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent, ButtonComponent, DividerComponent } from 'oxygen-ui';

@Component({
  selector: 'app-toolbar-demo',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, ButtonComponent, DividerComponent],
  template: `
    <div class="demo-page">
      <h1>Toolbar</h1>
      <p class="description">Agrupa un conjunto de componentes, normalmente botones, de forma horizontal.</p>

      <section class="demo-section">
        <h2>Básico</h2>
        <div class="card p-4">
          <ox-toolbar>
            <div left>
              <ox-button icon="pi pi-plus" severity="success"></ox-button>
              <ox-button icon="pi pi-file" severity="secondary"></ox-button>
              <ox-button icon="pi pi-trash" severity="error"></ox-button>
            </div>
            
            <div right>
              <ox-button label="Exportar" icon="pi pi-download"></ox-button>
            </div>
          </ox-toolbar>
        </div>
      </section>

      <section class="demo-section">
        <h2>Variantes de Color</h2>
        <div class="flex flex-column gap-4">
          <ox-toolbar color="primary">
            <div left>
              <ox-button icon="pi pi-bars" variant="ghost-secondary"></ox-button>
              <span class="font-bold">Primary Toolbar</span>
            </div>
            <div right>
              <ox-button icon="pi pi-search" variant="ghost-secondary"></ox-button>
            </div>
          </ox-toolbar>

          <ox-toolbar color="secondary">
            <div left>
              <ox-button icon="pi pi-user" variant="ghost-secondary"></ox-button>
              <span class="font-bold">Secondary Toolbar</span>
            </div>
            <div right>
              <ox-button icon="pi pi-bell" variant="ghost-secondary"></ox-button>
            </div>
          </ox-toolbar>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 900px; padding: 2rem; }
    h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    .description { font-size: 1.125rem; color: #64748b; margin-bottom: 3rem; }
    .demo-section { margin-bottom: 4rem; }
    .p-4 { padding: 1.5rem; }
    .flex { display: flex; }
    .flex-column { flex-direction: column; }
    .gap-4 { gap: 1rem; }
    .font-bold { font-weight: 700; }
  `]
})
export class ToolbarDemoComponent {}