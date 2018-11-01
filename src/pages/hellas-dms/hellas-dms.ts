import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform:Platform) {
    platform.ready().then(() => {
      platform.registerBackButtonAction(()=>{
        this.navCtrl.setRoot(DashboardPage);
      });
    });  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HellasDmsPage');
  }
}
