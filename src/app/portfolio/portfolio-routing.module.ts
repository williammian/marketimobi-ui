import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { PortfolioComponent } from './portfolio/portfolio';
import { PortfolioSemAcessoComponent } from './portfolio-sem-acesso/portfolio-sem-acesso.component';
import { DesignPlaceComponent } from './design-place/design-place.component';

const routes: Routes = [
  {
    path: 'portfolio-sem-acesso',
    component: PortfolioSemAcessoComponent
  },
  {
    path: 'principais',
    component: PortfolioComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMINISTRADOR', 'ROLE_PORTFOLIO'] }
  },
  {
    path: ':id',
    component: PortfolioComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMINISTRADOR', 'ROLE_PORTFOLIO'] }
  },
  {
    path: 'design-place/:id',
    component: DesignPlaceComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMINISTRADOR', 'ROLE_PORTFOLIO'] }
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
