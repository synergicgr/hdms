import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { CustomersPage } from '../customers/customers';
import { CustomersProvider } from '../../providers/customers/customers';

/**
 * Generated class for the SortPopOverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sort-pop-over',
  templateUrl: 'sort-pop-over.html',
})
export class SortPopOverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private customersProvider:CustomersProvider, private events:Events) {    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SortPopOverPage');
  }

  sortNameAZ():void{
    this.customersProvider.doSort(1);
  }

  sortNameZA():void{
    this.customersProvider.doSort(2);
  }

  sortCityAZ():void{
    this.customersProvider.doSort(3);
  }

  sortCityZA():void{
    this.customersProvider.doSort(4);
  }

  dismiss():void{
    this.events.publish('dismiss', {}, Date.now());
  }
}
