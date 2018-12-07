import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, PopoverController, AlertController } from 'ionic-angular';
import { NotesPage } from '../notes/notes';
import { PopOverPage } from '../pop-over/pop-over';
import { CustomersProvider } from '../../providers/customers/customers';
import { Storage } from '@ionic/storage';

// @IonicPage()
@Component({
  selector: 'page-view-note',
  templateUrl: 'view-note.html',
})
export class ViewNotePage {

  open: boolean;
  private popover;
  private note;
  private status;
  private index;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private popoverCtrl: PopoverController, private customersProvider: CustomersProvider, private alertCtrl:AlertController, private storage:Storage) {
    this.note = this.navParams.get('note');
    this.index = this.navParams.get('index');

    this.status = this.note.status;
    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        if (this.open === true) {
          this.popover.dismiss();
          this.open = false;
        }
        else {
          navCtrl.setRoot(NotesPage);
        }
      });
    });
  }

  presentPopover(myEvent) {
    this.popover = this.popoverCtrl.create(PopOverPage);
    this.popover.present({
      ev: myEvent,
    });
    this.open = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewNotePage');
  }

  saveNote(): void {
    this.storage.get('notes').then((value) => {
      let temp = value;
      temp[this.index] = this.note;
      this.storage.set('notes',temp);
    });
    this.navCtrl.setRoot(NotesPage);    
  }

  deleteNote(): void {
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
            this.customersProvider.deleteNote(this.note);
            this.navCtrl.setRoot(NotesPage);
          }
        }
      ]
    });
    alert.present();
  }
}
