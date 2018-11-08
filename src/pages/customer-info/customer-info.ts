import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { TechAppPage } from '../tech-app/tech-app';
import { WebDealerPage } from '../web-dealer/web-dealer';
import { NewCustomerPage } from '../new-customer/new-customer';
import { InstallerDetailsPage } from '../installer-details/installer-details';

/**
 * Generated class for the CustomerInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-info',
  templateUrl: 'customer-info.html',
})
export class CustomerInfoPage {

  tab1Root = NewCustomerPage;
  tab2Root = InstallerDetailsPage;  

  @ViewChild('tabs') tabRef: Tabs;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.data.draft);
  }

  ionViewDidLoad() {
    this.tabRef.select(0);
    console.log('ionViewDidLoad CustomerInfoPage');
  }  
}
