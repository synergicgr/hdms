import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewCustomerPage } from './new-customer';

@NgModule({
  declarations: [
    NewCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(NewCustomerPage),
  ],
})
export class NewCustomerPageModule {}
