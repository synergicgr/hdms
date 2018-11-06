import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { ContactFormPage } from '../contact-form/contact-form';
import { GoogleMapsPage } from '../google-maps/google-maps';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  tab1Root = ContactFormPage;
  tab2Root = GoogleMapsPage;

  @ViewChild('myTab') tabRef: Tabs;
  
  message:string = '';

  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  sendMessage():void{
    
  }


}
