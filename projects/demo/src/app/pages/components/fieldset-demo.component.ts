import { Component } from '@angular/core';
import { FieldsetComponent, CardComponent } from 'oxygen-ui';

@Component({
  selector: 'app-fieldset-demo',
  standalone: true,
  imports: [FieldsetComponent, CardComponent],
  template: `
    <div class="demo-container">
      <h1>Fieldset</h1>
      <p class="demo-description">Fieldset is a grouping component with a legend and content.</p>

      <section class="demo-section">
        <ox-card>
          <div class="p-4">
            <h5>Basic</h5>
            <ox-fieldset legend="Header">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </ox-fieldset>
          </div>
        </ox-card>
      </section>

      <section class="demo-section mt-4">
        <ox-card>
          <div class="p-4">
            <h5>Toggleable</h5>
            <ox-fieldset legend="Toggleable Header" [toggleable]="true">
               <p>This fieldset can be collapsed and expanded by clicking the legend or the toggle icon.</p>
            </ox-fieldset>
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
  `]
})
export class FieldsetDemoComponent {}


