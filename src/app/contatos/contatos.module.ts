import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';

import { SharedModule } from './../shared/shared.module';
import { ContatosPesquisaComponent } from './contatos-pesquisa/contatos-pesquisa.component';
import { ContatosRoutingModule } from './contatos-routing.module';
import { ContatoCadastroComponent } from './contato-cadastro/contato-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    CalendarModule,
    DropdownModule,
    SelectButtonModule,

    SharedModule,
    ContatosRoutingModule
  ],
  declarations: [
    ContatosPesquisaComponent,
    ContatoCadastroComponent
  ]
})
export class ContatosModule { }
