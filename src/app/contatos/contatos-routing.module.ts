import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ContatosPesquisaComponent } from './contatos-pesquisa/contatos-pesquisa.component';
import { ContatoCadastroComponent } from './contato-cadastro/contato-cadastro.component';
import { AuthGuard } from 'app/seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ContatosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMINISTRADOR'] }
  },
  {
    path: 'novo',
    component: ContatoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMINISTRADOR'] }
  },
  {
    path: ':id',
    component: ContatoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMINISTRADOR'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ContatosRoutingModule { }
