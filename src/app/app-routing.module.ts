import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { InicioComponent } from 'app/inicio/inicio/inicio.component';
import { NovoContatoComponent } from './inicio/novo-contato/novo-contato.component';
import { EsqueceuSenhaComponent } from './inicio/esqueceu-senha/esqueceu-senha.component';

import { InicioModule } from './inicio/inicio.module';

const routes: Routes = [
  { path: 'lancamentos', loadChildren: 'app/lancamentos/lancamentos.module#LancamentosModule' },
  { path: 'portfolio', loadChildren: 'app/portfolio/portfolio.module#PortfolioModule' },
  { path: 'produtos', loadChildren: 'app/produtos/produtos.module#ProdutosModule' },
  { path: 'imobiliarias', loadChildren: 'app/imobiliarias/imobiliarias.module#ImobiliariasModule' },
  { path: 'categorias', loadChildren: 'app/categorias/categorias.module#CategoriasModule' },
  { path: 'contatos', loadChildren: 'app/contatos/contatos.module#ContatosModule' },
  { path: 'usuarios', loadChildren: 'app/usuarios/usuarios.module#UsuariosModule' },

  { path: 'inicio', component: InicioComponent },
  { path: 'novoContato', component: NovoContatoComponent },
  { path: 'esqueceuSenha', component: EsqueceuSenhaComponent },

  { path: '', component: InicioComponent },
  //{ path: '', redirectTo: 'portfolio', pathMatch: 'full' },

  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    InicioModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
