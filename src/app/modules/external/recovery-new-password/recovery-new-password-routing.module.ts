import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoveryNewPasswordComponent } from './recovery-new-password.component';

const routes: Routes = [{ path: '', component: RecoveryNewPasswordComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoveryNewPasswordRoutingModule { }
