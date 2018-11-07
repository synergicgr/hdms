import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, PopoverController, ViewController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { PopOverPage } from '../pop-over/pop-over';


/**
 * Generated class for the HellasDmsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hellas-dms',
  templateUrl: 'hellas-dms.html',
})
export class HellasDmsPage {

  private popover;
  open:boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    public popoverCtrl: PopoverController,
    private viewCtrl: ViewController
  ) {
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
    console.log('ionViewDidLoad HellasDmsPage');
  }
}
