import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, BadgeComponent } from 'oxygen-ui';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent, BadgeComponent],
  template: `
    <div class="demo-page">
      <h1>Button</h1>
      <p class="description">
        The button component is used to trigger an action or event.
      </p>

      <section class="demo-section">
        <h2>Basic Usage</h2>
        <div class="demo-row">
          <ox-button>Primary</ox-button>
          <ox-button variant="secondary">Secondary</ox-button>
          <ox-button variant="success">Success</ox-button>
          <ox-button variant="info">Info</ox-button>
          <ox-button variant="warning">Warning</ox-button>
          <ox-button variant="danger">Danger</ox-button>
        </div>
      </section>

      <section class="demo-section">
        <h2>Outlined</h2>
        <div class="demo-row">
          <ox-button variant="outline-primary">Primary</ox-button>
          <ox-button variant="outline-secondary">Secondary</ox-button>
          <ox-button variant="outline-success">Success</ox-button>
          <ox-button variant="outline-warning">Warning</ox-button>
          <ox-button variant="outline-danger">Danger</ox-button>
          <ox-button variant="outline-info">Info</ox-button>
        </div>
      </section>

      <section class="demo-section">
        <h2>Ghost</h2>
        <div class="demo-row">
          <ox-button variant="ghost-primary">Primary</ox-button>
          <ox-button variant="ghost-secondary">Secondary</ox-button>
          <ox-button variant="ghost-success">Success</ox-button>
          <ox-button variant="ghost-warning">Warning</ox-button>
          <ox-button variant="ghost-danger">Danger</ox-button>
          <ox-button variant="ghost-info">Info</ox-button>
        </div>
      </section>

      <section class="demo-section">
        <h2>Sizes</h2>
        <div class="demo-row align-center">
          <ox-button size="sm">Small</ox-button>
          <ox-button size="md">Medium</ox-button>
          <ox-button size="lg">Large</ox-button>
        </div>
      </section>

      <section class="demo-section">
        <h2>With Badge</h2>
        <div class="demo-row">
          <ox-button badge="5">Inbox</ox-button>
          <ox-button badge="99+" badgeSeverity="danger">Notifications</ox-button>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 800px; }
    h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    .description { font-size: 1.125rem; color: #64748b; margin-bottom: 3rem; }
    .demo-section { margin-bottom: 3rem; }
    .demo-section h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.5rem; }
    .demo-row { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem; }
    .align-center { align-items: center; }
  `]
})
export class ButtonDemoComponent {}