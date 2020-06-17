import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEstabelecimentoPage } from './add-estabelecimento.page';

const routes: Routes = [
  {
    path: '',
    component: AddEstabelecimentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEstabelecimentoPageRoutingModule {}
