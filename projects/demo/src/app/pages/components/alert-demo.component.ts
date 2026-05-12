import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, ButtonComponent } from 'oxygen-ui';

@Component({
  selector: 'app-alert-demo',
  standalone: true,
  imports: [CommonModule, AlertComponent, ButtonComponent],
  template: `
    <div class="demo-page">
      <h1>Alert</h1>
      <p class="description">
        Alerts are used to communicate important information or feedback to the user.
      </p>

      <section class="demo-section">
        <h2>Severities</h2>
        <div class="demo-grid">
          <ox-alert severity="info" title="Info Alert">
            This is an informative message for the user.
          </ox-alert>
          <ox-alert severity="success" title="Success Alert">
            The operation was completed successfully!
          </ox-alert>
          <ox-alert severity="warn" title="Warning Alert">
            Be careful, this action might have consequences.
          </ox-alert>
          <ox-alert severity="error" title="Error Alert">
            Something went wrong while processing your request.
          </ox-alert>
        </div>
      </section>

      <section class="demo-section">
        <h2>Variants</h2>
        <div class="demo-grid">
          <h3>Filled</h3>
          <ox-alert variant="filled" severity="info">A filled alert variant.</ox-alert>
          
          <h3>Outlined</h3>
          <ox-alert variant="outlined" severity="success">An outlined alert variant.</ox-alert>
          
          <h3>Glass (Blurred)</h3>
          <div style="background: linear-gradient(45deg, #3b82f6, #a855f7); padding: 2rem; border-radius: 12px;">
             <ox-alert variant="glass" severity="info">Glass variant with backdrop blur effect.</ox-alert>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Closable</h2>
        <ox-alert [closable]="true" (onClose)="handleClose()" severity="warn">
          Click the close icon to dismiss this alert.
        </ox-alert>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 800px; }
    h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    .description { font-size: 1.125rem; color: #64748b; margin-bottom: 3rem; }
    .demo-section { margin-bottom: 3rem; }
    .demo-section h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; }
    .demo-grid { display: flex; flex-direction: column; gap: 1rem; }
    h3 { font-size: 1rem; color: #64748b; margin-top: 1rem; }
  `]
})
export class AlertDemoComponent {
  handleClose() {
    console.log('Alert closed');
  }
}