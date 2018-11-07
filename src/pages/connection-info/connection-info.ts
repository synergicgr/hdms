import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, PopoverController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { PopOverPage } from '../pop-over/pop-over';

/**
 * Generated class for the ConnectionInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connection-info',
  templateUrl: 'connection-info.html',
})
export class ConnectionInfoPage {

  private popover;
  open:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform:Platform, private popoverCtrl:PopoverController) {
    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        if(this.open === true)
        {
          this.popover.dismiss();
          this.open = false;
        }
        else{
          navCtrl.setRoot(DashboardPage);
        }        
      });
    });   
  }

  presentPopover(myEvent) {
    this.popover = this.popoverCtrl.create(PopOverPage);
    this.popover.present({
      ev: myEvent,
    });
    this.open = true;    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectionInfoPage');
  }

}
