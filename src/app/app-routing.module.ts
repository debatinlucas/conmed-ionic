import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'medico',
    pathMatch: 'full'
  },
  {
    path: 'medico',
    loadChildren: () => import('./pages/medico/medico.module').then( m => m.MedicoPageModule)
  },
  {
    path: 'paciente',
    loadChildren: () => import('./pages/paciente/paciente.module').then( m => m.PacientePageModule)
  },
  {
    path: 'consulta',
    loadChildren: () => import('./pages/consulta/consulta.module').then( m => m.ConsultaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
