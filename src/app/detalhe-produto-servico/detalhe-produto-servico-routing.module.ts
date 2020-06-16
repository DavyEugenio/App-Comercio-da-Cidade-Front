import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalheProdutoServicoPage } from './detalhe-produto-servico.page';

const routes: Routes = [
  {
    path: '',
    component: DetalheProdutoServicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalheProdutoServicoPageRoutingModule {}
