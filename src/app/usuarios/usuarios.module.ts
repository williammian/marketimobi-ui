import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputMaskModule } from 'primeng/inputmask';
import { DataTableModule } from 'primeng/datatable';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ListboxModule } from 'primeng/listbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { UsuariosPesquisaComponent } from './usuarios-pesquisa/usuarios-pesquisa.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioAlterarSenhaComponent } from './usuario-alterar-senha/usuario-alterar-senha.component';
import { UsuarioSetarSenhaComponent } from './usuario-setar-senha/usuario-setar-senha.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
    ListboxModule,
    SelectButtonModule,
    FileUploadModule,
    ProgressSpinnerModule,

    SharedModule,
    UsuariosRoutingModule
  ],
  declarations: [UsuariosPesquisaComponent, UsuarioCadastroComponent, UsuarioAlterarSenhaComponent, UsuarioSetarSenhaComponent]
})
export class UsuariosModule { }
