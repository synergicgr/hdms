import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform, PopoverController, AlertController, Events } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { PopOverPage } from '../pop-over/pop-over';
import { ViewNotePage } from '../view-note/view-note';
import { Storage } from '@ionic/storage';
import { AddNotePage } from '../add-note/add-note';
import { CustomersProvider } from '../../providers/customers/customers';
import { NotesPopoverPage } from '../notes-popover/notes-popover';

// @IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage implements OnInit {

  private popover;
  open: boolean;
  private popover2;
  open2: boolean;

  notes: Array<{ showDate: string, title: string, content: string, status: string }> = [
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

  ngOnInit() {
    this.events.subscribe('dismissNotesPopover', (user, time) => {
      if (this.popover2) {
        this.popover2.dismiss();
      }
    });
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

  presentNotesPopover(event) {
    this.popover2 = this.popoverCtrl.create(NotesPopoverPage, {}, { cssClass: "notes-popover" });
    this.popover2.present({
      ev: event,
    });
    this.open2 = true;

    this.popover2.onDidDismiss(() => {
      this.open2 = false;
    })
  }

  openNote(index): void {
    this.navCtrl.setRoot(ViewNotePage, { note: this.customersProvider.notes[index], index:index });
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
