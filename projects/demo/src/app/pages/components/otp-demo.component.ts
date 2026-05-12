import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OtpComponent } from 'oxygen-ui';

@Component({
  selector: 'app-otp-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, OtpComponent],
  template: `
    <div class="demo-page">
      <h1>OTP</h1>
      <p class="description">Campo de verificación de un solo uso.</p>

      <section class="demo-section">
        <h2>Básico (6 dígitos)</h2>
        <div class="flex justify-center">
          <ox-otp [(ngModel)]="otpValue"></ox-otp>
        </div>
        <p class="text-center mt-4">Código: {{ otpValue }}</p>
      </section>

      <section class="demo-section">
        <h2>Personalizado (4 dígitos)</h2>
        <div class="flex justify-center">
          <ox-otp [length]="4" [(ngModel)]="otpValue4"></ox-otp>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 800px; padding: 2rem; }
    h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    .description { font-size: 1.125rem; color: #64748b; margin-bottom: 3rem; }
    .demo-section { margin-bottom: 4rem; }
    .demo-section h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.5rem; }
    .flex { display: flex; }
    .justify-center { justify-content: center; }
    .text-center { text-align: center; }
    .mt-4 { margin-top: 1rem; }
  `]
})
export class OtpDemoComponent {
  otpValue = '';
  otpValue4 = '';
}
