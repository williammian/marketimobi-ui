import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { SharedModule } from './../shared/shared.module';
import { ImobiliariasRoutingModule } from './imobiliarias-routing.module';
import { ImobiliariasPesquisaComponent } from './imobiliarias-pesquisa/imobiliarias-pesquisa.component';
import { ImobiliariaCadastroComponent } from './imobiliaria-cadastro/imobiliaria-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    CalendarModule,
    DropdownModule,
    SelectButtonModule,
    FileUploadModule,
    ProgressSpinnerModule,

    SharedModule,
    ImobiliariasRoutingModule
  ],
  declarations: [
    ImobiliariasPesquisaComponent,
    ImobiliariaCadastroComponent
  ]
})
export class ImobiliariasModule { }
