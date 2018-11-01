import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController, private platform:Platform) {
    this.menuCtrl.enable(true, 'menu');
    platform.ready().then(() => {
      platform.registerBackButtonAction(()=>{
        this.navCtrl.push(HomePage);
      });
    });    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

}
