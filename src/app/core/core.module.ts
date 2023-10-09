import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice'
import { GrowlModule } from 'primeng/growl';

import { JwtHelperService } from '@auth0/angular-jwt';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoriaService } from 'app/categorias/categoria.service';
import { ContatoService } from 'app/contatos/contato.service';
import { UsuarioService } from './../usuarios/usuario.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { AuthService } from 'app/seguranca/auth.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { MoneyHttp } from './../seguranca/money-http';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,

    GrowlModule,
    ConfirmDialogModule
  ],
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent, NaoAutorizadoComponent],
  exports: [
    NavbarComponent,
    GrowlModule,
    ConfirmDialogModule
  ],
  providers: [
    CategoriaService,
    ContatoService,
    UsuarioService,
    ErrorHandlerService,
    AuthService,
    MoneyHttp,

    ConfirmationService,
    MessageService,
    JwtHelperService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
