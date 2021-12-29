import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoveryEmailComponent } from './recovery-email.component';

const routes: Routes = [{ path: '', component: RecoveryEmailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoveryEmailRoutingModule { }
