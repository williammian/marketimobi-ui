import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ImobiliariasPesquisaComponent } from './imobiliarias-pesquisa/imobiliarias-pesquisa.component';
import { ImobiliariaCadastroComponent } from './imobiliaria-cadastro/imobiliaria-cadastro.component';
import { AuthGuard } from 'app/seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ImobiliariasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMINISTRADOR'] }
  },
  {
    path: 'nova',
    component: ImobiliariaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMINISTRADOR'] }
  },
  {
    path: ':id',
    component: ImobiliariaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMINISTRADOR', 'ROLE_MINHA_IMOBILIARIA'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ImobiliariasRoutingModule { }
