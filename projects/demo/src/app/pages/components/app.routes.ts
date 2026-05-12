import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ComponentsPageComponent } from './pages/components/components.component';
import { ButtonDemoComponent } from './pages/components/button-demo.component';
import { TableDemoComponent } from './pages/components/table-demo.component';
import { CardDemoComponent } from './pages/components/card-demo.component';
import { AlertDemoComponent } from './pages/components/alert-demo.component';
import { AccordionDemoComponent } from './pages/components/accordion-demo.component';
import { DropdownDemoComponent } from './pages/components/dropdown-demo.component';
import { ToastDemoComponent } from './pages/components/toast-demo.component';
import { InputDemoComponent } from './pages/components/input-demo.component';
import { DialogDemoComponent } from './pages/components/dialog-demo.component';
import { TooltipDemoComponent } from './pages/components/tooltip-demo.component';
import { CheckboxDemoComponent } from './pages/components/checkbox-demo.component';
import { PanelDemoComponent } from './pages/components/panel-demo.component';
import { StepperDemoComponent } from './pages/components/stepper-demo.component';
import { SidebarDemoComponent } from './pages/components/sidebar-demo.component';
import { BadgeDemoComponent } from './pages/components/badge-demo.component';
import { BreadcrumbDemoComponent } from './pages/components/breadcrumb-demo.component';
import { ToolbarDemoComponent } from './pages/components/toolbar-demo.component';
import { TabsDemoComponent } from './pages/components/tabs-demo.component';
import { PlaceholderDemoComponent } from './pages/components/placeholder-demo.component';

import { PasswordDemoComponent } from './pages/components/password-demo.component';
import { DateDemoComponent } from './pages/components/date-demo.component';
import { FileDemoComponent } from './pages/components/file-demo.component';
import { OtpDemoComponent } from './pages/components/otp-demo.component';
import { RadioDemoComponent } from './pages/components/radio-demo.component';
import { RatingDemoComponent } from './pages/components/rating-demo.component';
import { TextareaDemoComponent } from './pages/components/textarea-demo.component';
import { SliderDemoComponent } from './pages/components/slider-demo.component';
import { KnobDemoComponent } from './pages/components/knob-demo.component';
import { DividerDemoComponent } from './pages/components/divider-demo.component';
import { InputSwitchDemoComponent } from './pages/components/input-switch-demo.component';
import { FieldsetDemoComponent } from './pages/components/fieldset-demo.component';
import { PaginatorDemoComponent } from './pages/components/paginator-demo.component';
import { MenubarDemoComponent } from './pages/components/menubar-demo.component';
import { DatePickerDemoComponent } from './pages/components/datepicker-demo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'components', 
    component: ComponentsPageComponent,
    children: [
      { path: '', redirectTo: 'button', pathMatch: 'full' },
      { path: 'button', component: ButtonDemoComponent },
      { path: 'badge', component: BadgeDemoComponent },
      { path: 'divider', component: DividerDemoComponent },
      { path: 'card', component: CardDemoComponent },
      { path: 'panel', component: PanelDemoComponent },
      { path: 'fieldset', component: FieldsetDemoComponent },
      { path: 'accordion', component: AccordionDemoComponent },
      { path: 'tabs', component: TabsDemoComponent },
      { path: 'toolbar', component: ToolbarDemoComponent },
      { path: 'input', component: InputDemoComponent },
      { path: 'password', component: PasswordDemoComponent },
      { path: 'textarea', component: TextareaDemoComponent },
      { path: 'date', component: DateDemoComponent },
      { path: 'datepicker', component: DatePickerDemoComponent },
      { path: 'file', component: FileDemoComponent },
      { path: 'otp', component: OtpDemoComponent },
      { path: 'radio', component: RadioDemoComponent },
      { path: 'rating', component: RatingDemoComponent },
      { path: 'slider', component: SliderDemoComponent },
      { path: 'knob', component: KnobDemoComponent },
      { path: 'dropdown', component: DropdownDemoComponent },
      { path: 'checkbox', component: CheckboxDemoComponent },
      { path: 'switch', component: InputSwitchDemoComponent },
      { path: 'table', component: TableDemoComponent },
      { path: 'paginator', component: PaginatorDemoComponent },
      { path: 'alert', component: AlertDemoComponent },
      { path: 'toast', component: ToastDemoComponent },
      { path: 'dialog', component: DialogDemoComponent },
      { path: 'tooltip', component: TooltipDemoComponent },
      { path: 'menubar', component: MenubarDemoComponent },
      { path: 'breadcrumb', component: BreadcrumbDemoComponent },
      { path: 'stepper', component: StepperDemoComponent },
      { path: 'sidebar', component: SidebarDemoComponent }
    ]
  }
];