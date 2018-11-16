import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, PopoverController, AlertController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { PopOverPage } from '../pop-over/pop-over';
import { ViewNotePage } from '../view-note/view-note';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AddNotePage } from '../add-note/add-note';
import { CustomersProvider } from '../../providers/customers/customers';


/**
 * Generated class for the NotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {

  private popover;
  open: boolean;

  notes: Array<{ showDate: string, title: string, content: string }> = [
    // {showDate:"21-07-1986 16:50", title:"Title", content:"Content"}    
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, private platform: Platform, private storage: Storage, private customersProvider: CustomersProvider, private alertCtrl: AlertController) {
    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        if (this.open === true) {
          this.popover.dismiss();
          this.open = false;
        }
        else {
          navCtrl.setRoot(DashboardPage);
        }
      });
    });

    this.storage.get('notes').then((value) => {
      if (value) {
        this.notes = value;
      }
    });
    console.log(this.notes.length + " notes in the array");
  }

  presentPopover(myEvent) {
    this.popover = this.popoverCtrl.create(PopOverPage);
    this.popover.present({
      ev: myEvent,
    });
    this.open = true;
  }

  openNote(index): void {
    this.navCtrl.setRoot(ViewNotePage, { note: this.notes[index] });
  }

  deleteNote(index): void {
    let alert = this.alertCtrl.create({
      title: 'Επιβεβαίωση διαγραφής',
      message: 'Θέλετε όντως να διαγράψετε την σημείωση?',
      buttons: [
        {
          text: 'Ακυρο',
          role: 'cancel',        
        },
        {
          text: 'ΟΚ',
          handler: () => {
            this.customersProvider.deleteNoteAt(index);
            this.notes = this.customersProvider.getNotes();
          }
        }
      ]
    });
    alert.present();
  }

  addNote(): void {
    this.navCtrl.setRoot(AddNotePage);
  }
}
