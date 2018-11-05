import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-customer',
  templateUrl: 'new-customer.html',
})
export class NewCustomerPage {

  phoneNotices: Array<{ name: string, phone: string }> = [
    { name: "Ελένη Γεωργίου", phone: "211 45 55 456" },
    { name: "Βαγγέλης Γεωργίου", phone: "687 64 52 354" },
    { name: "Αγγελική Γεωργίου", phone: "687 64 52 354" },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCustomerPage');
  }

}
