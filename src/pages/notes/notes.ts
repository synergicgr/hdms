import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, PopoverController, AlertController, Events } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { PopOverPage } from '../pop-over/pop-over';
import { ViewNotePage } from '../view-note/view-note';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AddNotePage } from '../add-note/add-note';
import { CustomersProvider } from '../../providers/customers/customers';
import { NotesPopoverPage } from '../notes-popover/notes-popover';


/**
 * Generated class for the NotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {

  private popover;
  open: boolean;
  private popover2;
  open2: boolean;

  notes: Array<{ showDate: string, title: string, content: string }> = [
    // {showDate:"21-07-1986 16:50", title:"Title", content:"Content"}    
  ];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private platform: Platform,
    private storage: Storage,
    private customersProvider: CustomersProvider,
    private alertCtrl: AlertController,
    private events: Events) {

    this.events.subscribe("dismissNotesPopover", (user, time) => {
      this.popover2.dismiss();
    });

    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        if (this.open === true) {
          this.popover.dismiss();
        }

        if (this.open2 === true) {
          this.popover2.dismiss();
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

    this.popover.onDidDismiss(() => {
      this.open = false;
    })

    this.open = true;
  }

  presentPopover2(myEvent) {
    this.popover2 = this.popoverCtrl.create(NotesPopoverPage, {}, { cssClass: "notes-popover" });
    this.popover2.present({
      ev: myEvent,
    });
    this.open2 = true;

    this.popover2.onDidDismiss(() => {
      this.open2 = false;
    })
  }

  openNote(index): void {
    this.navCtrl.setRoot(ViewNotePage, { note: this.customersProvider.notes[index] });
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
