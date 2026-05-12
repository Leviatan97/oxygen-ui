import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  CardComponent, 
  ButtonComponent, 
  BadgeComponent, 
  AlertComponent,
  OxCardBackDirective 
} from 'oxygen-ui';

@Component({
  selector: 'app-card-demo',
  standalone: true,
  imports: [
    CommonModule, 
    CardComponent, 
    ButtonComponent, 
    BadgeComponent, 
    AlertComponent,
    OxCardBackDirective
  ],
  template: `
    <div class="demo-page">
      <h1>Card</h1>
      <p class="description">
        Cards provide a flexible and extensible content container with multiple variants and options.
      </p>

      <section class="demo-section">
        <h2>Basic Card</h2>
        <div class="demo-row">
          <ox-card style="width: 350px">
            <div style="padding: 1.5rem">
              <h3 style="margin-top: 0">Card Title</h3>
              <p style="color: #64748b; margin-bottom: 1.5rem">
                This is a basic card with some content. You can put anything here.
              </p>
              <ox-button size="sm">Action</ox-button>
            </div>
          </ox-card>
        </div>
      </section>

      <section class="demo-section">
        <h2>Hoverable & Lift</h2>
        <div class="demo-row">
          <ox-card [hoverable]="true" [liftOnHover]="true" style="width: 300px">
            <div style="padding: 1.5rem">
              <h3 style="margin-top: 0">Interactive Card</h3>
              <p style="color: #64748b">Hover over me to see the effect.</p>
            </div>
          </ox-card>
          
          <ox-card boxShadow="lg" style="width: 300px">
            <div style="padding: 1.5rem">
              <h3 style="margin-top: 0">Large Shadow</h3>
              <p style="color: #64748b">This card has a deeper shadow for more depth.</p>
            </div>
          </ox-card>
        </div>
      </section>

      <section class="demo-section">
        <h2>Flippable Card</h2>
        <p style="margin-bottom: 1rem">A card that can be flipped to show content on the back.</p>
        <div class="demo-row">
          <ox-card [flipped]="isFlipped" style="width: 300px; height: 180px">
            <div style="padding: 1.5rem; text-align: center">
               <h3>Front Side</h3>
               <ox-button variant="outline-primary" size="sm" (click)="isFlipped = true">Flip Me</ox-button>
            </div>
            
            <div oxCardBack style="padding: 1.5rem; text-align: center">
               <h3>Back Side</h3>
               <p>Surprise content!</p>
               <ox-button variant="secondary" size="sm" (click)="isFlipped = false">Back</ox-button>
            </div>
          </ox-card>
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
    .demo-row { display: flex; gap: 2rem; flex-wrap: wrap; margin-bottom: 1rem; }
  `]
})
export class CardDemoComponent {
  isFlipped = false;
}