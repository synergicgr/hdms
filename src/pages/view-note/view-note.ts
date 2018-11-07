import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, PopoverController } from 'ionic-angular';
import { NotesPage } from '../notes/notes';
import { PopOverPage } from '../pop-over/pop-over';

/**
 * Generated class for the ViewNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-note',
  templateUrl: 'view-note.html',
})
export class ViewNotePage {

  open:boolean;
  private popover;
  note:Array<{ creationDate:string, showDate: string, content: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform:Platform, private popoverCtrl:PopoverController) {
    this.note = this.navParams.get('note');
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
}
