import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalheProdutoServicoPageRoutingModule } from './detalhe-produto-servico-routing.module';

import { DetalheProdutoServicoPage } from './detalhe-produto-servico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalheProdutoServicoPageRoutingModule
  ],
  declarations: [DetalheProdutoServicoPage]
})
export class DetalheProdutoServicoPageModule {}
