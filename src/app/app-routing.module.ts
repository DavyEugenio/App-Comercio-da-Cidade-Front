import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'detalhe-estabelecimento',
    loadChildren: () => import('./detalhe-estabelecimento/detalhe-estabelecimento.module').then( m => m.DetalheEstabelecimentoPageModule)
  },
  {
    path: 'gerenciar-estabelecimento',
    loadChildren: () => import('./gerenciar-estabelecimento/gerenciar-estabelecimento.module').then( m => m.GerenciarEstabelecimentoPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
