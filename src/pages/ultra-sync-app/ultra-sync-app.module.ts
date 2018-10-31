import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UltraSyncAppPage } from './ultra-sync-app';

@NgModule({
  declarations: [
    UltraSyncAppPage,
  ],
  imports: [
    IonicPageModule.forChild(UltraSyncAppPage),
  ],
})
export class UltraSyncAppPageModule {}
