import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Platform, Events } from 'ionic-angular';
import * as $ from 'jquery';
import { Storage } from '@ionic/storage';
import { CustomersProvider } from '../../providers/customers/customers';
import { CustomersPage } from '../customers/customers';
import { updateNodeContext } from 'ionic-angular/umd/components/virtual-scroll/virtual-util';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



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
  enabled: boolean;

  installer_name: string;
  installer_afm: string;
  installer_proffesionalDescription: string;
  installer_insuredAreaAddress: string;
  installer_insuredAreaCity: string;
  installer_insuredAreaPostCode: string;
  installer_insuredAreaFloor: string;
  installer_fax:string;
  installer_landlinePhone: string;
  installer_mobilePhone: string;
  installer_email: string;
  installer_website: string;
  installer_collectionPolicy: string;
  installer_emailInvoice: string;
  installer_billingAddressOnly: string;

  phoneNotices: Array<{ name: string, phone: string, editable: boolean }> = [];

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

  private phoneNoticeSource = new BehaviorSubject<{ name: string, phone: string, editable: boolean }[]>([]);
  phoneNoticeData = this.phoneNoticeSource.asObservable();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private customersProvider: CustomersProvider,
    private app: App,
    private platform: Platform,
    private events: Events
  ) {
    
    // this.phoneNoticesObservable = from(this.phoneNotices)
    // .subscribe(v => {console.log(v)});

    // const phoneNoticesObserver = {
    //   next: data => console.log(this.phoneNotices)
    // }

    // this.phoneNoticesObservable.subscribe(phoneNoticesObserver);

    platform.registerBackButtonAction(() => {
      this.app.getRootNav().setRoot(CustomersPage);
    });
    
    this.phoneNotices = this.customersProvider.phoneNotices;
  }

  onPageWillLeave() {
    this.events.unsubscribe('submit' , ()=>{      
    });
  }

  ngOnInit() {

    this.phoneNoticeData.subscribe(data => {
      this.customersProvider.setPhoneNotices(this.phoneNotices);    
    });

    this.events.subscribe('installer-details-name', (data) =>{
      this.installer_name = data.name;
    });

    this.events.subscribe('installer-details-afm', (data) =>{
      this.installer_afm = data.afm;
    });

    this.events.subscribe('installer-details-proffesionalDescription', (data) =>{
      this.installer_proffesionalDescription = data.proffesionalDescription;
    });
    
    this.events.subscribe('installer-details-addrNum', (data) =>{
      this.installer_insuredAreaAddress = data.insuredAreaAddress;
    });

    this.events.subscribe('installer-details-city', (data) =>{
      this.installer_insuredAreaCity = data.insuredAreaCity;
    });

    this.events.subscribe('installer-details-postCode', (data) =>{
      this.installer_insuredAreaPostCode = data.insuredAreaPostCode;
    });
    
    this.events.subscribe('installer-details-floor', (data) =>{
      this.installer_insuredAreaFloor = data.insuredAreaFloor;
    }); 

    this.events.subscribe('installer-details-landline', (data) =>{
      this.installer_landlinePhone = data.landlinePhone;
    }); 

    this.events.subscribe('installer-details-mobile', (data) =>{
      this.installer_mobilePhone = data.mobilePhone;
    }); 

    this.events.subscribe('installer-details-email', (data) =>{
      this.installer_email = data.email;
    });
    
    this.events.subscribe('installer-details-website', (data) =>{
      this.installer_website = data.website;
    });

    this.events.subscribe('installer-details-collection', (data) =>{
      this.installer_collectionPolicy = data.collectionPolicy;
    });

    this.events.subscribe('installer-details-invoice', (data) =>{
      this.installer_emailInvoice = data.emailInvoice;
    });

    this.events.subscribe('installer-details-billing', (data) =>{
      this.installer_billingAddressOnly = data.billingAddressOnly;
    });

    this.events.subscribe('installer-details-fax', (data) =>{
      this.installer_fax = data.fax;
    });

    this.events.subscribe('submit', (data) =>{
      console.log("Event submit ", data.subscriberName);
      // this.subscriberName = data.subscriberName;
      this.submit();
    });

    if (this.navParams.data) {
      this.getDataStorage().then((value) => {
        value.forEach(element => {
          if (element.subscriberName.split(" ")[0] === this.navParams.data.name && element.subscriberName.split(" ")[1] === this.navParams.data.surname) {
            this.subscriberName = element.subscriberName;
            this.insuredAreaCity = element.insuredAreaCity;
            this.installerName = element.installerName;
            this.customerPass = element.customerPass;
            this.customerAuxiliaryPass = element.customerAuxiliaryPass;
            this.duressCode = element.duressCode;
            this.customerConnectionDate = element.customerConnectionDate;
            this.insuredAreaAddress = element.insuredAreaAddress;
            this.insuredAreaCity = element.insuredAreaCity;
            this.insuredAreaPostCode = element.insuredAreaPostCode;
            this.insuredAreaFloor = element.insuredAreaFloor;
            this.insuredAreaDescription = element.insuredAreaDescription;
            this.insuredAreaType = element.insuredAreaType;
            this.insuredAreaTypeOther = element.insuredAreaTypeOther;
            this.areaPhone = element.areaPhone;
            this.alarmUnitType = element.alarmUnitType;
            this.format = element.format;
            this.frequency24HourTest = element.frequency24HourTest;
            this.weeklyTimeMonitoring = element.weeklyTimeMonitoring;
            this.policeStation = element.policeStation;
            this.directTransmissionPhones = element.directTransmissionPhones;
            this.operationControlHours = element.operationControlHours;
            this.monthlyAlarmList = element.monthlyAlarmList;
            this.otherRemarks = element.otherRemarks;
            this.zones = element.zones;
            this.phoneNotices = element.phoneNotices;
            this.alarmUsers = element.alarmUsers;
            this.enabled = element.enabled;            
          }
        })
      });
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
    this.phoneNoticeSource.next([{ name: "", phone: "", editable: true }]);
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

    console.log('In submit');
    const d = new Date();

    this.subscriberName = this.customersProvider.subscriberName;
    this.installerName = this.customersProvider.installerName;
    this.customerPass = this.customersProvider.customerPass;
    this.customerAuxiliaryPass = this.customersProvider.customerAuxiliaryPass;

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
          enabled: true,
          zones: this.zones,
          alarmUsers: this.alarmUsers,
          phoneNotices: this.phoneNotices,
          installer_name : this.installer_name,
          installer_afm : this.installer_afm,
          installer_proffesionalDescription : this.installer_proffesionalDescription,
          installer_insuredAreaAddress : this.installer_insuredAreaAddress,
          installer_insuredAreaCity : this.installer_insuredAreaCity,
          installer_insuredAreaPostCode : this.installer_insuredAreaPostCode,
          installer_insuredAreaFloor : this.installer_insuredAreaFloor,
          installer_landlinePhone : this.installer_landlinePhone,
          installer_mobilePhone : this.installer_mobilePhone,
          installer_email : this.installer_email,
          installer_website : this.installer_website,
          installer_collectionPolicy : this.installer_collectionPolicy,
          installer_emailInvoice : this.installer_emailInvoice,
          installer_billingAddressOnly : this.installer_billingAddressOnly,
          installer_fax: this.installer_fax
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
          zones: this.zones,
          phoneNotices: this.phoneNotices,
          alarmUsers: this.alarmUsers,
          enabled: true,
          installer_name : this.installer_name,
          installer_afm : this.installer_afm,
          installer_proffesionalDescription : this.installer_proffesionalDescription,
          installer_insuredAreaAddress : this.installer_insuredAreaAddress,
          installer_insuredAreaCity : this.installer_insuredAreaCity,
          installer_insuredAreaPostCode : this.installer_insuredAreaPostCode,
          installer_insuredAreaFloor : this.installer_insuredAreaFloor,
          installer_landlinePhone : this.installer_landlinePhone,
          installer_mobilePhone : this.installer_mobilePhone,
          installer_email : this.installer_email,
          installer_website : this.installer_website,
          installer_collectionPolicy : this.installer_collectionPolicy,
          installer_emailInvoice : this.installer_emailInvoice,
          installer_billingAddressOnly : this.installer_billingAddressOnly,
          installer_fax: this.installer_fax
        }]);
      }
    });

    this.app.getRootNav().setRoot(CustomersPage);
  }

  public async getDataStorage() {
    return await this.storage.get("customers");
  }

  saveSubscriber():void{
    this.customersProvider.setSubscriber(this.subscriberName);    
  }

  saveInstallerName():void{
    this.customersProvider.setInstallerName(this.installerName);
  }

  saveCustomerPass():void{
    this.customersProvider.setCustomerPass(this.customerPass);
  }

  saveAuxiliaryPass():void{
    this.customersProvider.setCustomerAuxiliaryPass(this.customerAuxiliaryPass);
  }
  
  savePhoneNotices():void{
    this.customersProvider.setPhoneNotices(this.phoneNotices);
  }
}
