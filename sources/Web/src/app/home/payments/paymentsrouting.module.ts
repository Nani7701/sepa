import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCounterpartyComponent } from './add-counterparty/add-counterparty.component';
import { PaymentsTabComponent } from './payments-tab/payments-tab.component';
import { SmsComponent } from './sms/sms.component';
import { SingleMoneyTransferComponent } from './single-money-transfer/single-money-transfer.component';
import { AddBulkPaymentsComponent } from './add-bulk-payments/add-bulk-payments.component';
import { BulkMoneyTransferComponent } from './bulk-money-transfer/bulk-money-transfer.component';
import { AuthGuard } from 'src/app/core/gaurds/auth.guard';

export const paymentsRoute: Routes = [
  { path: '', component: PaymentsTabComponent, canActivate:[AuthGuard] },
  { path: 'add-counterparty', component:AddCounterpartyComponent, canActivate:[AuthGuard] },
  { path: 'sms', component:SmsComponent, canActivate:[AuthGuard] },
  { path: 'money-transfer', component:SingleMoneyTransferComponent, canActivate:[AuthGuard] },
  { path: 'bulk-money-transfer', component:AddBulkPaymentsComponent, canActivate:[AuthGuard] },
  { path: 'bulk_transfer', component:BulkMoneyTransferComponent, canActivate:[AuthGuard] }
]

 @NgModule({
     imports: [RouterModule.forChild(paymentsRoute)],
     exports:[RouterModule]
   })
export class PaymentsroutingModule { }
