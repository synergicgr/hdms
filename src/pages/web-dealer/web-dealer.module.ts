import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WebDealerPage } from './web-dealer';

@NgModule({
  declarations: [
    WebDealerPage,
  ],
  imports: [
    IonicPageModule.forChild(WebDealerPage),
  ],
})
export class WebDealerPageModule {}
