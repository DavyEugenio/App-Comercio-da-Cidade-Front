import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GerenciarEstabelecimentoPage } from './gerenciar-estabelecimento.page';

const routes: Routes = [
  {
    path: '',
    component: GerenciarEstabelecimentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GerenciarEstabelecimentoPageRoutingModule {}
