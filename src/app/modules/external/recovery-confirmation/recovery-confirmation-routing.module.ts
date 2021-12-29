import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoveryConfirmationComponent } from './recovery-confirmation.component';

const routes: Routes = [{ path: '', component: RecoveryConfirmationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoveryConfirmationRoutingModule { }
