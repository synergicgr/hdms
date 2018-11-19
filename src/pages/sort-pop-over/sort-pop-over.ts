import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { CustomersPage } from '../customers/customers';
import { CustomersProvider } from '../../providers/customers/customers';
import { Storage } from '@ionic/storage';

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

  enabled:boolean = true;
  disabled:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private customersProvider:CustomersProvider, private events:Events) {
    this.enabled = customersProvider.enabled;
    this.disabled = customersProvider.disabled;        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SortPopOverPage');
  }

  sortNameAZ():void{
    this.customersProvider.setOrder("nameAZ");
    this.customersProvider.doSort(1);
  }

  sortNameZA():void{
    this.customersProvider.setOrder("nameZA");
    this.customersProvider.doSort(2);
  }

  sortCityAZ():void{
    this.customersProvider.setOrder("cityAZ");
    this.customersProvider.doSort(3);
  }

  sortCityZA():void{
    this.customersProvider.setOrder("cityZA");
    this.customersProvider.doSort(4);
  }

  dismiss():void{
    this.events.publish('dismiss', {}, Date.now());
  }

  changedDisabled():void{
    this.customersProvider.setDisabled(this.disabled); 
  }

  changedEnabled():void{
    this.customersProvider.setEnabled(this.enabled);
  }
}
