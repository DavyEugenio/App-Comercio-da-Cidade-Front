import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProdutoServicoPage } from './add-produto-servico.page';

const routes: Routes = [
  {
    path: '',
    component: AddProdutoServicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddProdutoServicoPageRoutingModule {}
