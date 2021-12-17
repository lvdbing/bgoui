import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BigscreenComponent } from './bigscreen.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  {
    path: 'big',
    component: BigscreenComponent,
    children: [
      { path: 'show', component: ShowComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BigscreenRoutingModule { }
