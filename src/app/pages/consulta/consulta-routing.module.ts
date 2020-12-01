import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaPage } from './consulta.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaPage
  },
  {
    path: 'adicionar',
    loadChildren: () => import('./adicionar/adicionar.module').then( m => m.AdicionarPageModule)
  },
  {
    path: 'editar/:key',
    loadChildren: () => import('./editar/editar.module').then( m => m.EditarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaPageRoutingModule {}
