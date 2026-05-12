import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, Input as ComponentInput } from '@angular/core';

@Component({
  selector: 'ox-tooltip-view',
  standalone: true,
  template: `
    <div class="ox-tooltip ox-elevation-2">
      {{ text }}
    </div>
  `,
  styles: [`
    .ox-tooltip {
      background: #1e293b;
      color: white;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 0.75rem;
      max-width: 250px;
      word-wrap: break-word;
      animation: ox-tooltip-in 0.15s ease-out;
    }
    @keyframes ox-tooltip-in {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `]
})
export class TooltipViewComponent {
  @ComponentInput() text: string = '';
}

@Directive({
  selector: '[oxTooltip]',
  standalone: true
})
export class TooltipDirective implements OnInit, OnDestroy {
  @Input('oxTooltip') text: string = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef);
  private overlayRef: OverlayRef | null = null;

  ngOnInit() {
    const element = this.elementRef.nativeElement;
    element.addEventListener('mouseenter', () => this.show());
    element.addEventListener('mouseleave', () => this.hide());
  }

  ngOnDestroy() {
    this.hide();
  }

  private show() {
    if (!this.text) return;

    const positions = this.getPositions();

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(positions);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });

    const portal = new ComponentPortal(TooltipViewComponent);
    const componentRef = this.overlayRef.attach(portal);
    componentRef.instance.text = this.text;
  }

  private getPositions() {
    switch (this.tooltipPosition) {
      case 'top':
        return [{
          originX: 'center' as const,
          originY: 'top' as const,
          overlayX: 'center' as const,
          overlayY: 'bottom' as const,
          offsetY: -8
        }];
      case 'bottom':
        return [{
          originX: 'center' as const,
          originY: 'bottom' as const,
          overlayX: 'center' as const,
          overlayY: 'top' as const,
          offsetY: 8
        }];
      case 'left':
        return [{
          originX: 'start' as const,
          originY: 'center' as const,
          overlayX: 'end' as const,
          overlayY: 'center' as const,
          offsetX: -8
        }];
      case 'right':
        return [{
          originX: 'end' as const,
          originY: 'center' as const,
          overlayX: 'start' as const,
          overlayY: 'center' as const,
          offsetX: 8
        }];
      default:
        return [{
          originX: 'center' as const,
          originY: 'top' as const,
          overlayX: 'center' as const,
          overlayY: 'bottom' as const,
          offsetY: -8
        }];
    }
  }

  private hide() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
