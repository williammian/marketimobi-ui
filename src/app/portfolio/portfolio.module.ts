import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';

import { SharedModule } from './../shared/shared.module';
import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioComponent } from './portfolio/portfolio';
import { PortfolioSemAcessoComponent } from './portfolio-sem-acesso/portfolio-sem-acesso.component';
import { DesignPlaceComponent } from './design-place/design-place.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ButtonModule,
    DataViewModule,
    PanelModule,
    TooltipModule,
    DialogModule,
    CardModule,
    InputTextModule,
    FileUploadModule,
    ProgressSpinnerModule,
    DropdownModule,

    SharedModule,
    PortfolioRoutingModule
  ],
  declarations: [
    PortfolioComponent,
    PortfolioSemAcessoComponent,
    DesignPlaceComponent
  ]
})
export class PortfolioModule { }
