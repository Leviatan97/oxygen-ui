import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { 
  SampleComponent, 
  ButtonComponent, 
  AccordionComponent, 
  AccordionItemComponent, 
  OxAccordionHeaderDirective, 
  CardComponent, 
  OxCardHeaderDirective, 
  OxCardBodyDirective, 
  OxCardFooterDirective, 
  OxCardBackDirective, 
  OxCardBackHeaderDirective, 
  OxCardBackBodyDirective, 
  OxCardBackFooterDirective, 
  DividerComponent, 
  FieldsetComponent 
} from 'oxygen-ui';

import { InputComponent, PanelComponent, StepperComponent, StepComponent, TabsComponent, TabComponent, OxTabHeaderDirective, ToolbarComponent, AlertComponent, BadgeComponent, BreadcrumbComponent, BreadcrumbItem, OxBreadcrumbItemDef } from 'oxygen-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SampleComponent,
    ButtonComponent, 
    CardComponent, 
    AccordionComponent, 
    AccordionItemComponent,
    OxAccordionHeaderDirective,
    OxCardHeaderDirective,
    OxCardBodyDirective,
    OxCardFooterDirective,
    OxCardBackDirective,
    OxCardBackHeaderDirective,
    OxCardBackBodyDirective,
    OxCardBackFooterDirective,
    DividerComponent,
    FieldsetComponent,
    PanelComponent,
    StepperComponent,
    StepperComponent,
    StepComponent,
    TabsComponent,
    TabComponent,
    OxTabHeaderDirective,
    ToolbarComponent,
    AlertComponent,
    BadgeComponent,
    BreadcrumbComponent,
    OxBreadcrumbItemDef,
    InputComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo';
  controlledActiveId = signal<string | null>(null);
  controlledTabIndex = signal<number>(0);
  cardFlipped = signal<boolean>(false);
  flip2 = signal<boolean>(false);

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/', icon: 'ox-icon-home' },
    { label: 'Components', url: '/components' },
    { label: 'Navigation', url: '/components/navigation' },
    { label: 'Breadcrumb' }
  ];

  customBreadcrumbItems: BreadcrumbItem[] = [
    { label: 'Desktop', icon: 'ox-icon-monitor' },
    { label: 'Projects', icon: 'ox-icon-folder' },
    { label: 'Oxygen UI', icon: 'ox-icon-brand', disabled: true },
    { label: 'README.md', icon: 'ox-icon-file' }
  ];

  private accordionIds = ['item1', 'item2'];

  nextItem() {
    const current = this.controlledActiveId();
    const index = current ? this.accordionIds.indexOf(current) : -1;
    const nextIndex = (index + 1) % this.accordionIds.length;
    this.controlledActiveId.set(this.accordionIds[nextIndex]);
  }

  prevItem() {
    const current = this.controlledActiveId();
    const index = current ? this.accordionIds.indexOf(current) : -1;
    const prevIndex = index <= 0 ? this.accordionIds.length - 1 : index - 1;
    this.controlledActiveId.set(this.accordionIds[prevIndex]);
  }

  // Reactive Forms
  userForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    website: new FormControl('', [Validators.pattern('https?://.+')]),
  });

  formValues = signal<any>(null);

  onSubmit() {
    if (this.userForm.valid) {
      this.formValues.set(this.userForm.value);
      console.log('Form submitted:', this.userForm.value);
    } else {
      this.formValues.set({ error: 'Please fix the validation errors' });
    }
  }

  resetForm() {
    this.userForm.reset();
    this.formValues.set(null);
  }
}
