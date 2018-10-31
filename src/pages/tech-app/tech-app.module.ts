import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TechAppPage } from './tech-app';

@NgModule({
  declarations: [
    TechAppPage,
  ],
  imports: [
    IonicPageModule.forChild(TechAppPage),
  ],
})
export class TechAppPageModule {}
