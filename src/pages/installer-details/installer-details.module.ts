import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstallerDetailsPage } from './installer-details';

@NgModule({
  declarations: [
    InstallerDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(InstallerDetailsPage),
  ],
})
export class InstallerDetailsPageModule {}
