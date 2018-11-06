import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  zones: Array<{ name: string, id: string }> = [
    { name: "ΖΩΝΗ 1", id: "ΑΒ1128336" },
    { name: "ΖΩΝΗ 2", id: "ΑΒ1128336" },
    { name: "ΖΩΝΗ 3", id: "ΑΒ1128336" },
    { name: "ΖΩΝΗ 4", id: "ΑΒ1128336" },
    { name: "ΖΩΝΗ 5", id: "ΑΒ1128336" },
    { name: "ΖΩΝΗ 6", id: "ΑΒ1128336" },
    { name: "ΖΩΝΗ 7", id: "ΑΒ1128336" },
    { name: "ΖΩΝΗ 8", id: "ΑΒ1128336" },
  ];

  alarmUsers: Array<{ username: string, name: string }> = [
    { username: "K25LS", name: "Μαρία" },
    { username: "MARY1", name: "Μαρία" },
    { username: "USERKF", name: "Μαρία" },
    { username: "K25LS", name: "Μαρία" },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCustomerPage');
  }

}
