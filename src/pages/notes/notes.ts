import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, PopoverController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { PopOverPage } from '../pop-over/pop-over';
import { ViewNotePage } from '../view-note/view-note';


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
  open:boolean;

  notes: Array<{ creationDate:string, showDate: string, content: string}> = [
    {creationDate:new Date().toDateString(), showDate: "2018-12-12 15:00", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, ipsum non facilisis luctus, libero urna ullamcorper erat, nec suscipit nisl dui id justo. Sed venenatis congue mi sed consectetur. Proin et nisl ac enim fringilla facilisis. Vestibulum posuere mi eget pulvinar sollicitudin. Aliquam lacus elit, venenatis eget risus a, aliquam suscipit magna. Morbi sem nunc, feugiat id nulla at, pretium tincidunt tortor. Quisque porta eget mauris vitae finibus. Curabitur libero sapien, lobortis at sodales ut, pulvinar et turpis. Nulla fringilla lectus id ultricies faucibus. Curabitur vel varius augue. Praesent iaculis nec augue nec finibus."},
    {creationDate:new Date().toDateString(), showDate: "2018-12-12 15:00", content:"Testing 1"},
    {creationDate:new Date().toDateString(), showDate: "2018-12-12 15:00", content:"Testing 2"}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,     public popoverCtrl: PopoverController, private platform:Platform) {    
    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        if(this.open === true)
        {
          this.popover.dismiss();
          this.open = false;
        }
        else{
          navCtrl.setRoot(DashboardPage);
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
    console.log('ionViewDidLoad NotesPage');     
    console.log(this.notes.slice(1,-1));
  }

  openNote(index):void{
    this.navCtrl.setRoot(ViewNotePage, {note:this.notes[index]});
  }

  deleteNote(index):void{
    console.log("Deleting", this.notes[index]);
    this.notes.splice(index, 1);
  }
}
