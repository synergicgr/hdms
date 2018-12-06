import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CustomersProvider } from '../../providers/customers/customers';
import { NotesPage } from '../notes/notes';
import { Storage } from '@ionic/storage';
import { DatePicker } from '@ionic-native/date-picker';
import * as $ from 'jquery';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the AddNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-add-note',
  templateUrl: 'add-note.html',
})
export class AddNotePage {

  private popover;
  openPopOver1:boolean = false;

  title: string;
  content: string;
  date: string;
  maximumDate:string = (new Date().getFullYear()+30)+"-12-31";

  constructor(public navCtrl: NavController, public navParams: NavParams, private customersProvider: CustomersProvider, private storage: Storage, private datePicker:DatePicker, private platform:Platform) {
    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        if(this.openPopOver1 === true)
        {
          this.popover.dismiss();
          this.openPopOver1 = false;
        }
        else{
          navCtrl.setRoot(NotesPage);
        }        
      });
    });   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNotePage');
  }

  saveNote(): void {    
    this.customersProvider.addNote({ showDate: this.date, title: this.title, content: this.content });    
    // this.customersProvider.addNote({showDate:this.date, title:this.title, content:this.content});
    this.navCtrl.setRoot(NotesPage);
  }  

  presentPopover(myEvent) {
    this.popover.present({
      ev: myEvent
    });
    this.openPopOver1 = true;
    this.popover.onDidDismiss(() => {
      this.openPopOver1 = false;
    });
  }
}
