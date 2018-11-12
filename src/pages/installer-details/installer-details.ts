import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InstallerDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-installer-details',
  templateUrl: 'installer-details.html',
})
export class InstallerDetailsPage {
  
  name:string;
  afm:string;
  proffesionalDescription:string;
  insuredAreaAddress:string;
  insuredAreaCity:string;
  insuredAreaPostCode:string;
  insuredAreaFloor:string;
  landlinePhone:string;
  mobilePhone:string;
  email:string;
  website:string;
  collectionPolicy:string;
  emailInvoice:string;
  billingAddressOnly:string;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstallerDetailsPage');
  }

  isEmptyArray(data): any {
    for (var key in data) {
      if (data.hasOwnProperty(key))
        return false;
    }
    return true;
  }
}
