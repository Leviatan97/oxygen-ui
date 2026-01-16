import { Component, contentChildren, input, signal, computed, effect } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { trigger, transition, style, animate, query, group, state } from '@angular/animations';
import { StepComponent } from './step.component';

@Component({
  selector: 'ox-stepper',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  host: {
    '[class.ox-stepper]': 'true',
    '[class.ox-stepper--vertical]': 'orientation() === "vertical"',
    '[class.ox-stepper--horizontal]': 'orientation() === "horizontal"'
  },
  animations: [
    trigger('stepAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ position: 'absolute', top: 0, left: 0, width: '100%' }),
        animate('0.2s ease-in', style({ opacity: 0, transform: 'translateX(-20px)' }))
      ])
    ])
  ]
})
export class StepperComponent {
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  linear = input<boolean>(true);
  headerNavigation = input<boolean>(true); // Controls whether step headers are clickable

  steps = contentChildren(StepComponent);
  
  // Active step index
  selectedIndex = signal(0);
  
  activeStep = computed(() => {
    const steps = this.steps();
    return steps[this.selectedIndex()];
  });

  isFirst = computed(() => this.selectedIndex() === 0);
  isLast = computed(() => this.selectedIndex() === this.steps().length - 1);

  next() {
    if (!this.isLast()) {
      this.selectedIndex.update(i => i + 1);
    }
  }

  previous() {
    if (!this.isFirst()) {
      this.selectedIndex.update(i => i - 1);
    }
  }
  
  reset() {
    this.selectedIndex.set(0);
  }

  // Handler for header clicks
  onStepClick(index: number) {
    if (!this.headerNavigation()) {
      // If header navigation is disabled, ignore clicks.
      // This is useful for strict linear flows or read-only views.
      return;
    }
    this.setIndex(index);
  }

  setIndex(index: number) {
     if (this.linear()) {
         // In linear mode, can only go back or to immediately next if current is valid (simplified here)
         if (index < this.selectedIndex() || index === this.selectedIndex() + 1) {
             this.selectedIndex.set(index);
         }
     } else {
         this.selectedIndex.set(index);
     }
  }
}
