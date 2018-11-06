import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-new-customer',
  templateUrl: 'new-customer.html',
})
export class NewCustomerPage {

  phoneNotices: Array<{ name: string, phone: string, editable:boolean}> = [
    { name: "Ελένη Γεωργίου", phone: "211 45 55 456", editable:false },
    { name: "Βαγγέλης Γεωργίου", phone: "687 64 52 354", editable:false },
    { name: "Αγγελική Γεωργίου", phone: "687 64 52 354", editable:false },
  ];

  zones: Array<{ name: string, id: string, editable:boolean }> = [
    { name: "ΖΩΝΗ 1", id: "ΑΒ1128336", editable:false },
    { name: "ΖΩΝΗ 2", id: "ΑΒ1128336" , editable:false },
    { name: "ΖΩΝΗ 3", id: "ΑΒ1128336" , editable:false },
    { name: "ΖΩΝΗ 4", id: "ΑΒ1128336" , editable:false },
    { name: "ΖΩΝΗ 5", id: "ΑΒ1128336" , editable:false },
    { name: "ΖΩΝΗ 6", id: "ΑΒ1128336" , editable:false },
    { name: "ΖΩΝΗ 7", id: "ΑΒ1128336" , editable:false },
    { name: "ΖΩΝΗ 8", id: "ΑΒ1128336" , editable:false },
  ];

  alarmUsers: Array<{ username: string, name: string, editable:boolean }> = [
    { username: "K25LS", name: "Μαρία", editable:false },
    { username: "MARY1", name: "Μαρία" , editable:false},
    { username: "USERKF", name: "Μαρία" , editable:false},
    { username: "K25LS", name: "Μαρία" , editable:false},
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCustomerPage');
  }

  removeZone(index):void{
    this.zones.splice(index, 1);
  }

  removeAlarmUser(index):void{
    this.alarmUsers.splice(index, 1);
  }

  removePhoneNotice(index):void{
    this.phoneNotices.splice(index, 1);
  }

  addPhoneNotices():void{
    this.phoneNotices.push({ name: "", phone: "", editable:true });
  }

  addZone():void{
    this.zones.push({ name: "", id: "", editable:true });
  }

  addAlarmUser():void{
    this.alarmUsers.push({ username: "", name: "", editable:true },);
  }
}
