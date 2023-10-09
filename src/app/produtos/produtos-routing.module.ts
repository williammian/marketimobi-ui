import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from 'app/seguranca/auth.guard';
import { ProdutosPesquisaComponent } from './produtos-pesquisa/produtos-pesquisa.component';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: ProdutosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMINISTRADOR'] }
  },
  {
    path: 'novo',
    component: ProdutoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMINISTRADOR'] }
  },
  {
    path: ':id',
    component: ProdutoCadastroComponent,
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
export class ProdutosRoutingModule { }
