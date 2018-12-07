import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, PopoverController, AlertController } from 'ionic-angular';
import { NotesPage } from '../notes/notes';
import { PopOverPage } from '../pop-over/pop-over';
import { CustomersProvider } from '../../providers/customers/customers';

/**
 * Generated class for the ViewNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private popoverCtrl: PopoverController, private customersProvider: CustomersProvider, private alertCtrl:AlertController) {
    this.note = this.navParams.get('note');
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
