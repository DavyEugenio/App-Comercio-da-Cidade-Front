import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalheEstabelecimentoPage } from './detalhe-estabelecimento.page';

const routes: Routes = [
  {
    path: '',
    component: DetalheEstabelecimentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalheEstabelecimentoPageRoutingModule {}
