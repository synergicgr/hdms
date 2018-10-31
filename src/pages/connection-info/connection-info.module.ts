import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConnectionInfoPage } from './connection-info';

@NgModule({
  declarations: [
    ConnectionInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ConnectionInfoPage),
  ],
})
export class ConnectionInfoPageModule {}
