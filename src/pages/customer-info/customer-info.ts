import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { TechAppPage } from '../tech-app/tech-app';
import { WebDealerPage } from '../web-dealer/web-dealer';

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

  tab1Root = TechAppPage;
  tab2Root = WebDealerPage;
  tab3Root = TechAppPage;

  @ViewChild('tabs') tabRef: Tabs;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.tabRef.select(0);
    console.log('ionViewDidLoad CustomerInfoPage');
  }  
}
