import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DataTableModule } from 'primeng/datatable';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { SharedModule } from 'app/shared/shared.module';
import { LancamentosRoutingModule } from './lancamentos-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    CalendarModule,
    DropdownModule,
    DataTableModule,
    TableModule,
    TooltipModule,

    SharedModule,
    LancamentosRoutingModule
  ],
  declarations: [LancamentosPesquisaComponent]
})
export class LancamentosModule { }
