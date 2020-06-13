import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalheEstabelecimentoPageRoutingModule } from './detalhe-estabelecimento-routing.module';

import { DetalheEstabelecimentoPage } from './detalhe-estabelecimento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalheEstabelecimentoPageRoutingModule
  ],
  declarations: [DetalheEstabelecimentoPage]
})
export class DetalheEstabelecimentoPageModule {}
