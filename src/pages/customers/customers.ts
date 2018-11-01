import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CustomersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customers',
  templateUrl: 'customers.html',
})
export class CustomersPage {

 customers:Array<{name: string, surname: string, city: string}> = [
   {name:'Γρηγόρης', surname:'Σαμαράς', city:'Αθήνα'}, 
   {name:'Χάρης', surname:'Γεωργακόπουλος', city:'Θεσσαλονίκη'},
   {name:'Ελένη', surname:'Ψαθά', city:'Χαλάνδρι'},
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomersPage');
  }

}
