import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PaymentsroutingModule } from './paymentsrouting.module';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
  ],
  imports: [
    PaymentsroutingModule,
    FormsModule
  ]
})
export class PaymentsModule { 
  constructor(){
    console.log("payments module")
  }
}

