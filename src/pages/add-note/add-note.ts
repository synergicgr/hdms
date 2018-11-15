import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CustomersProvider } from '../../providers/customers/customers';
import { NotesPage } from '../notes/notes';
import { Storage } from '@ionic/storage';
import { DatePicker } from '@ionic-native/date-picker';


/**
 * Generated class for the AddNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-note',
  templateUrl: 'add-note.html',
})
export class AddNotePage {

  title: string;
  content: string;
  date: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private customersProvider: CustomersProvider, private storage: Storage, private datePicker:DatePicker) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNotePage');
  }

  saveNote(): void {    
    this.customersProvider.addNote({ showDate: this.date, title: this.title, content: this.content });    
    // this.customersProvider.addNote({showDate:this.date, title:this.title, content:this.content});
    this.navCtrl.setRoot(NotesPage);
  }  
}
