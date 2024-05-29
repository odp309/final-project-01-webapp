import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchReservationsComponent } from './page/branch-reservations/branch-reservations.component';

const routes: Routes = [
  { path: '', component: BranchReservationsComponent, title: 'Branch Reservations' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchReservationsRoutingModule { }
