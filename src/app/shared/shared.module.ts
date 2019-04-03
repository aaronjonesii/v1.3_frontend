import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';

// Material
import {
  MatBottomSheetModule, MatListModule,
} from '@angular/material';

import {
  NbActionsModule, NbCardModule, NbLayoutModule,
  NbMenuModule, NbRouteTabsetModule, NbSearchModule,
  NbSidebarModule, NbTabsetModule, NbThemeModule,
  NbUserModule, NbCheckboxModule, NbPopoverModule,
  NbContextMenuModule, NbProgressBarModule, NbCalendarModule,
  NbCalendarRangeModule, NbStepperModule, NbButtonModule,
  NbInputModule, NbAccordionModule, NbDialogModule,
  NbWindowModule, NbListModule, NbToastrModule,
  NbAlertModule, NbSpinnerModule, NbRadioModule,
  NbSelectModule, NbTooltipModule,
} from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EvaPipe } from '../shared/pipes/eva.pipe';

import { DEFAULT_THEME } from "../shared/styles/theme.default";
import { COSMIC_THEME } from "../shared/styles/theme.cosmic";
import { CORPORATE_THEME } from "../shared/styles/theme.corporate";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BottomSheetComponent} from "../pages/home/bottom-sheet/bottom-sheet.component";

const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbContextMenuModule,
  NgbModule,
  NbProgressBarModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbStepperModule,
  NbButtonModule,
  NbListModule,
  NbToastrModule,
  NbInputModule,
  NbAccordionModule,
  NbDialogModule,
  NbWindowModule,
  NbAlertModule,
  NbSpinnerModule,
  NbRadioModule,
  NbSelectModule,
  NbTooltipModule,
];

const MAT_MODULES = [
    MatBottomSheetModule,
    MatListModule,
]


const BASE_MODULES = [ CommonModule, HttpClientModule, BrowserAnimationsModule ];

const COMPONENTS = [ ];

const ENTRY_COMPONENTS = [ BottomSheetComponent ];

const PIPES = [ EvaPipe, ];

const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot(
    {
      name: 'default',
    },
    [ DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME ],
  ).providers,
  ...NbSidebarModule.forRoot().providers,
  ...NbMenuModule.forRoot().providers,
  ...NbDialogModule.forRoot().providers,
  ...NbWindowModule.forRoot().providers,
  ...NbToastrModule.forRoot().providers,
];

@NgModule({
  imports: [ AuthModule, ...BASE_MODULES, ...NB_MODULES, ...MAT_MODULES, ],
  exports: [ ...BASE_MODULES, ...NB_MODULES, ...MAT_MODULES, ...COMPONENTS, ...PIPES, ],
  declarations: [...PIPES, ...COMPONENTS  ],
  entryComponents: [...ENTRY_COMPONENTS],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SharedModule,
      providers: [...NB_THEME_PROVIDERS],
    };
  }
}
