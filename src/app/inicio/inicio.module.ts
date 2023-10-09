import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InputMaskModule } from 'primeng/inputmask';
import { DataTableModule } from 'primeng/datatable';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { GalleriaModule } from 'primeng/galleria';
import { CalendarModule } from 'primeng/calendar';

import { InicioComponent } from './inicio/inicio.component';
import { NovoContatoComponent } from './novo-contato/novo-contato.component';
import { SharedModule } from 'app/shared/shared.module';
import { NavbarInicioComponent } from './navbar-inicio/navbar-inicio.component';
import { EsqueceuSenhaComponent } from './esqueceu-senha/esqueceu-senha.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    PanelModule,
    DialogModule,
    ListboxModule,
    SelectButtonModule,
    GalleriaModule,
    CalendarModule,

    SharedModule
  ],
  declarations: [InicioComponent, NovoContatoComponent, NavbarInicioComponent, EsqueceuSenhaComponent]
})
export class InicioModule { }
