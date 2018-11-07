import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, PopoverController, Platform } from 'ionic-angular';
import { ContactFormPage } from '../contact-form/contact-form';
import { GoogleMapsPage } from '../google-maps/google-maps';
import { PopOverPage } from '../pop-over/pop-over';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  private popover;
  open: boolean;

  tab1Root = ContactFormPage;
  tab2Root = GoogleMapsPage;

  @ViewChild('myTab') tabRef: Tabs;
  
  message:string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private popoverCtrl:PopoverController, private platform:Platform) {
    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        if (this.open === true) {
          this.popover.dismiss();
          this.open = false;
        }
        else {
          navCtrl.setRoot(DashboardPage);
        }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  sendMessage():void{
    
  }

  presentPopover(myEvent) {
    this.popover = this.popoverCtrl.create(PopOverPage);
    this.popover.present({
      ev: myEvent,
    });
    this.open = true;
  }

}
