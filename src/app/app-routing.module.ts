import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioComponent } from './core/inventario/inventario/inventario.component';

const routes: Routes = [
  {
    path: "", redirectTo: "inventario", pathMatch: "full"
  },
  {
      path: "inventario", component: InventarioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
