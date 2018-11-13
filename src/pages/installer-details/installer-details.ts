import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the InstallerDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-installer-details',
  templateUrl: 'installer-details.html',
})
export class InstallerDetailsPage{

  name: string;
  afm: string;
  proffesionalDescription: string;
  insuredAreaAddress: string;
  insuredAreaCity: string;
  insuredAreaPostCode: string;
  insuredAreaFloor: string;
  landlinePhone: string;
  mobilePhone: string;
  fax:string;
  email: string;
  website: string;
  collectionPolicy: string;
  emailInvoice: string;
  billingAddressOnly: string;

  customer_installerName: string;
  customer_customerPass: string;
  customer_AuxiliaryPass: string;
  customer_duressCode: string;
  customer_ConnectionDate: string;
  customer_subscriberName: string;
  customer_insuredAreaAddress: string;
  customer_insuredAreaCity: string;
  customer_insuredAreaPostCode: string;
  customer_insuredAreaFloor: string;
  customer_insuredAreaDescription: string;
  customer_insuredAreaType: string;
  customer_insuredAreaTypeOther: string;
  customer_areaPhone: string;
  customer_alarmUnitType: string;
  customer_format: string;
  customer_frequency24HourTest: number;
  customer_weeklyTimeMonitoring: string;
  customer_policeStation: string;
  customer_directTransmissionPhones: string;
  customer_operationControlHours: string;
  customer_monthlyAlarmList: string;
  customer_otherRemarks: string;
  customer_enabled: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events, private storage: Storage) {
  }

  ionViewDidLoad() {

    this.storage.get('customers').then((value) => {
      value.forEach(element => {
        if (element.subscriberName.split(" ")[0] === this.navParams.data.name && element.subscriberName.split(" ")[1] === this.navParams.data.surname) {
          this.name = element.installer_name;
          this.afm = element.installer_afm;
          this.proffesionalDescription = element.installer_proffesionalDescription;
          this.insuredAreaAddress = element.installer_insuredAreaAddress;
          this.insuredAreaCity = element.installer_insuredAreaCity;
          this.insuredAreaPostCode = element.installer_insuredAreaPostCode;
          this.insuredAreaFloor = element.installer_insuredAreaFloor;
          this.landlinePhone = element.installer_landlinePhone;
          this.mobilePhone = element.installer_mobilePhone;
          this.email = element.installer_email;
          this.website = element.installer_website;
          this.collectionPolicy = element.installer_collectionPolicy;
          this.emailInvoice = element.installer_emailInvoice;
          this.billingAddressOnly = element.installer_billingAddressOnly;
          this.fax = element.installer_fax;
        }
      });
    });
  }

  isEmptyArray(data): any {
    for (var key in data) {
      if (data.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  submit(): void {
    this.events.publish('submit', {subscriberName:this.customer_subscriberName});
  }

  submitName():void{
    console.log("ionChange installer-name");
    this.events.publish('installer-details-name', {
      name:this.name
    });    
  }

  submitAFM():void{
    this.events.publish('installer-details-afm', {
      afm:this.afm
    });  
  }

  submitProfDescription():void{
    this.events.publish('installer-details-proffesionalDescription', {
      proffesionalDescription:this.proffesionalDescription
    }); 
  }

  submitAddrNum():void{
    this.events.publish('installer-details-addrNum', {
      insuredAreaAddress:this.insuredAreaAddress
    }); 
  }

  submitCity():void{
    this.events.publish('installer-details-city', {
      insuredAreaCity:this.insuredAreaCity
    });
  }

  submitPostCode():void{
    this.events.publish('installer-details-postCode', {
      insuredAreaPostCode:this.insuredAreaPostCode
    });
  }

  submitFloor():void{
    this.events.publish('installer-details-floor', {
      insuredAreaFloor:this.insuredAreaFloor
    });
  }

  submitLandline():void{
    this.events.publish('installer-details-landline', {
      landlinePhone:this.landlinePhone
    });
  }

  submitMobile():void{
    this.events.publish('installer-details-mobile', {
      mobilePhone:this.mobilePhone
    });
  }

  submitEmail():void{
    this.events.publish('installer-details-email', {
      email:this.email
    });
  }
  
  submitWebsite():void{
    this.events.publish('installer-details-website', {
      website:this.website
    });
  }

  submitCollection():void{
    this.events.publish('installer-details-collection', {
      collectionPolicy:this.collectionPolicy
    });
  }

  submitEmailInvoice():void{
    this.events.publish('installer-details-invoice', {
      emailInvoice:this.emailInvoice
    });
  }

  submitBilling():void{
    this.events.publish('installer-details-billing', {
      billingAddressOnly:this.billingAddressOnly
    });
  }

  submitFax():void{
    this.events.publish('installer-details-fax', {
      fax:this.fax
    });
  }
}
