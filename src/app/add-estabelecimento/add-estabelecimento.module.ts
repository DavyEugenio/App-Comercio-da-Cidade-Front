import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEstabelecimentoPageRoutingModule } from './add-estabelecimento-routing.module';

import { AddEstabelecimentoPage } from './add-estabelecimento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    AddEstabelecimentoPageRoutingModule
  ],
  declarations: [AddEstabelecimentoPage]
})
export class AddEstabelecimentoPageModule {}
