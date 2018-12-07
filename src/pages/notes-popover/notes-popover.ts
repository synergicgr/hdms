import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { CustomersProvider } from '../../providers/customers/customers';

/**
 * Generated class for the NotesPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notes-popover',
  templateUrl: 'notes-popover.html',
})
export class NotesPopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private events:Events, private customersProvider:CustomersProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesPopoverPage');
  }

  dismissPopover():void{
    this.events.publish('dismissNotesPopover', {}, Date.now());
  }

  sortTitleAZ():void{
    console.log("Sort Notes 1 Called!!!!");
    console.log("Notes before sorting", this.customersProvider.notes);    
    this.customersProvider.sortNotes(1);
    console.log("Notes after sorting", this.customersProvider.notes);    
  }

  sortTitleZA():void{
    console.log("Sort Notes 2 Called!!!!");
    console.log("Notes before sorting", this.customersProvider.notes);    
    this.customersProvider.sortNotes(2);
    console.log("Notes after sorting", this.customersProvider.notes);
  }

  sortDateRecent():void{
    console.log("Sort Notes 3 Called!!!!");
    console.log("Notes before sorting", this.customersProvider.notes);    
    this.customersProvider.sortNotes(3);
    console.log("Notes after sorting", this.customersProvider.notes);    
  }

  sortDateLast():void{
    console.log("Sort Notes 4 Called!!!!");
    console.log("Notes before sorting", this.customersProvider.notes);    
    this.customersProvider.sortNotes(4);
    console.log("Notes after sorting", this.customersProvider.notes);    
  }
}
