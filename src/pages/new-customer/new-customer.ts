import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Platform } from 'ionic-angular';
import * as $ from 'jquery';
import { Storage } from '@ionic/storage';
import { CustomersProvider } from '../../providers/customers/customers';
import { CustomersPage } from '../customers/customers';
import { updateNodeContext } from 'ionic-angular/umd/components/virtual-scroll/virtual-util';

@IonicPage()
@Component({
  selector: 'page-new-customer',
  templateUrl: 'new-customer.html',
})
export class NewCustomerPage implements OnInit {

  installerName: string;
  customerPass: string;
  customerAuxiliaryPass: string;
  duressCode: string;
  customerConnectionDate: string;
  subscriberName: string;
  insuredAreaAddress: string;
  insuredAreaCity: string;
  insuredAreaPostCode: string;
  insuredAreaFloor: string;
  insuredAreaDescription: string;
  insuredAreaType: string;
  insuredAreaTypeOther: string;
  areaPhone: string;
  alarmUnitType: string;
  format: string;
  frequency24HourTest: number;
  weeklyTimeMonitoring: string;
  policeStation: string;
  directTransmissionPhones: string;
  operationControlHours: string;
  monthlyAlarmList: string;
  otherRemarks: string;


  phoneNotices: Array<{ name: string, phone: string, editable: boolean }> = [
    // { name: "Ελένη Γεωργίου", phone: "211 45 55 456", editable:false },
    // { name: "Βαγγέλης Γεωργίου", phone: "687 64 52 354", editable:false },
    // { name: "Αγγελική Γεωργίου", phone: "687 64 52 354", editable:false },
  ];

  zones: Array<{ name: string, id: string, editable: boolean }> = [
    // { name: "ΖΩΝΗ 1", id: "ΑΒ1128336", editable:false },
    // { name: "ΖΩΝΗ 2", id: "ΑΒ1128336" , editable:false },
    // { name: "ΖΩΝΗ 3", id: "ΑΒ1128336" , editable:false },
    // { name: "ΖΩΝΗ 4", id: "ΑΒ1128336" , editable:false },
    // { name: "ΖΩΝΗ 5", id: "ΑΒ1128336" , editable:false },
    // { name: "ΖΩΝΗ 6", id: "ΑΒ1128336" , editable:false },
    // { name: "ΖΩΝΗ 7", id: "ΑΒ1128336" , editable:false },
    // { name: "ΖΩΝΗ 8", id: "ΑΒ1128336" , editable:false },
  ];

  alarmUsers: Array<{ username: string, name: string, editable: boolean }> = [
    // { username: "K25LS", name: "Μαρία", editable:false },
    // { username: "MARY1", name: "Μαρία" , editable:false},
    // { username: "USERKF", name: "Μαρία" , editable:false},
    // { username: "K25LS", name: "Μαρία" , editable:false},
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private customersProvider: CustomersProvider,
    private app: App,
    private platform: Platform
  ) {

    platform.registerBackButtonAction(() => {
      this.app.getRootNav().setRoot(CustomersPage);
    });

    $(function () {

      $('ion-item #textinput').focus(function () {
        $('input:radio[id=radioSelection]').prop('checked', true);
      });

      $('ion-item #textinput').blur(function () {
        $('input:radio[id=radioSelection]').prop('checked', false);
      });

      //Suggestion: You can add this so that when user clicks on the radio btn, it will fucos on the textbox      
      $('input:radio[id=radioSelection]').click(function () {
        $('ion-item #textinput').focus();
        console.log("Selected");
      });

    });
  }

  ionViewDidLoad(){
    let customers;

    customers = this.getDataStorage().then((value) => {
      value.forEach(element => {
        if (element.subscriberName.split(" ")[0] === this.navParams.data.name && element.subscriberName.split(" ")[1] === this.navParams.data.surname) {
          this.subscriberName = element.subscriberName;
          this.insuredAreaCity = element.insuredAreaCity;
        }
      })
    });    

    console.log("New customer Page customers from Storage ", customers);
  }

  ngOnInit() {
    if (this.navParams.data) {
      console.log("Nav Param data in NewCustomerPage", this.navParams.data);

      
      // for(let i = 0; i < customers.length; i++)
      // {
      //   if (customers[i].subscriberName.split(" ")[0] === this.navParams.data.name && customers[i].subscriberName.split(" ")[1] === this.navParams.data.surname) {
      //     this.subscriberName = customers[i].subscriberName;
      //     this.insuredAreaCity = customers[i].insuredAreaCity;
      //   }
      // }

      // customers.forEach(element => {
      //   if (element.subscriberName.split(" ")[0] === this.navParams.data.name && element.subscriberName.split(" ")[1] === this.navParams.data.surname) {
      //     console.log(element);
      //     this.subscriberName = element.subscriberName;
      //     this.insuredAreaCity = element.insuredAreaCity;
      //   }
      // })
    }
  }

  removeZone(index): void {
    this.zones.splice(index, 1);
  }

  removeAlarmUser(index): void {
    this.alarmUsers.splice(index, 1);
  }

  removePhoneNotice(index): void {
    this.phoneNotices.splice(index, 1);
  }

  addPhoneNotices(): void {
    this.phoneNotices.push({ name: "", phone: "", editable: true });
  }

  addZone(): void {
    this.zones.push({ name: "", id: "", editable: true });
  }

  addAlarmUser(): void {
    this.alarmUsers.push({ username: "", name: "", editable: true });
  }

  isEmptyArray(data): any {
    for (var key in data) {
      if (data.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  submit(): void {

    const d = new Date();

    this.customersProvider.addCustomer(
      {
        name: this.subscriberName.split(" ")[0],
        surname: this.subscriberName.split(" ")[1],
        city: this.insuredAreaCity,
        visible: true,
        draft: false,
        publishedDate: d.getFullYear() + " " + d.getMonth() + " " + d.getDate() + " " + d.getHours() + " " + d.getMinutes(),
        enabled: true
      }
    );

    this.storage.get('customers').then((value) => {

      console.log("Local Storage customers before", value);

      if (value) {
        value.push({
          installerName: this.installerName,
          customerPass: this.customerPass,
          customerAuxiliaryPass: this.customerAuxiliaryPass,
          duressCode: this.duressCode,
          customerConnectionDate: this.customerConnectionDate,
          subscriberName: this.subscriberName,
          insuredAreaAddress: this.insuredAreaAddress,
          insuredAreaCity: this.insuredAreaCity,
          insuredAreaPostCode: this.insuredAreaPostCode,
          insuredAreaFloor: this.insuredAreaFloor,
          insuredAreaDescription: this.insuredAreaDescription,
          insuredAreaType: this.insuredAreaType,
          insuredAreaTypeOther: this.insuredAreaTypeOther,
          areaPhone: this.areaPhone,
          alarmUnitType: this.alarmUnitType,
          format: this.format,
          frequency24HourTest: this.frequency24HourTest,
          weeklyTimeMonitoring: this.weeklyTimeMonitoring,
          policeStation: this.policeStation,
          directTransmissionPhones: this.directTransmissionPhones,
          operationControlHours: this.operationControlHours,
          monthlyAlarmList: this.monthlyAlarmList,
          otherRemarks: this.otherRemarks,
          datePublished: new Date(),
          enabled: true
        });

        this.storage.set('customers', value);
        console.log("Local Storage customers before", value);
      }
      else {
        this.storage.set('customers', [{
          installerName: this.installerName,
          customerPass: this.customerPass,
          customerAuxiliaryPass: this.customerAuxiliaryPass,
          duressCode: this.duressCode,
          customerConnectionDate: this.customerConnectionDate,
          subscriberName: this.subscriberName,
          insuredAreaAddress: this.insuredAreaAddress,
          insuredAreaCity: this.insuredAreaCity,
          insuredAreaPostCode: this.insuredAreaPostCode,
          insuredAreaFloor: this.insuredAreaFloor,
          insuredAreaDescription: this.insuredAreaDescription,
          insuredAreaType: this.insuredAreaType,
          insuredAreaTypeOther: this.insuredAreaTypeOther,
          areaPhone: this.areaPhone,
          alarmUnitType: this.alarmUnitType,
          format: this.format,
          frequency24HourTest: this.frequency24HourTest,
          weeklyTimeMonitoring: this.weeklyTimeMonitoring,
          policeStation: this.policeStation,
          directTransmissionPhones: this.directTransmissionPhones,
          operationControlHours: this.operationControlHours,
          monthlyAlarmList: this.monthlyAlarmList,
          otherRemarks: this.otherRemarks,
          datePublished: new Date(),
          enabled: true
        }]);
      }
    });

    this.app.getRootNav().setRoot(CustomersPage);
  }

  public async getDataStorage() {        
    return await this.storage.get("customers");
}
}
