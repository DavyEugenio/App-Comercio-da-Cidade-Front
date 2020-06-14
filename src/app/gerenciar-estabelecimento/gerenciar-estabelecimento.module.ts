import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GerenciarEstabelecimentoPageRoutingModule } from './gerenciar-estabelecimento-routing.module';

import { GerenciarEstabelecimentoPage } from './gerenciar-estabelecimento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GerenciarEstabelecimentoPageRoutingModule
  ],
  declarations: [GerenciarEstabelecimentoPage]
})
export class GerenciarEstabelecimentoPageModule {}
