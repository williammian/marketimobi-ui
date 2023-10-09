import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UsuariosPesquisaComponent } from './usuarios-pesquisa/usuarios-pesquisa.component';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioAlterarSenhaComponent } from './usuario-alterar-senha/usuario-alterar-senha.component';
import { UsuarioSetarSenhaComponent } from './usuario-setar-senha/usuario-setar-senha.component';
import { AuthGuard } from 'app/seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UsuariosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMINISTRADOR'] }
  },
  {
    path: 'novo',
    component: UsuarioCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMINISTRADOR'] }
  },
  {
    path: ':id',
    component: UsuarioCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMINISTRADOR', 'ROLE_MEUS_DADOS'] }
  },
  {
    path: 'alterarSenha/:id',
    component: UsuarioAlterarSenhaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ALTERAR_SENHA'] }
  },
  {
    path: ':id/setarSenha',
    component: UsuarioSetarSenhaComponent,
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
export class UsuariosRoutingModule { }
