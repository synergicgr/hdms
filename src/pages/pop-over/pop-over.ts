import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, App, Platform } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { HomePage } from '../home/home';

/**
 * Generated class for the PopOverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pop-over',
  templateUrl: 'pop-over.html',
})
export class PopOverPage {

  private open:boolean = false;  

  constructor(public viewCtrl: ViewController, public app:App, public platform:Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopOverPage');
  }

  openAccount():void{
    this.viewCtrl.dismiss();
  }

  openChangePassword():void{
    this.viewCtrl.dismiss();
  }

  disconnect():void{
    this.viewCtrl.dismiss();
  }

  public dismiss():void{
    this.viewCtrl.dismiss();
  }
}
