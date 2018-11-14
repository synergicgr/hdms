import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CustomersProvider } from '../../providers/customers/customers';
import { CustomersPage } from '../customers/customers';

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
export class InstallerDetailsPage {

  name: string;
  afm: string;
  proffesionalDescription: string;
  insuredAreaAddress: string;
  insuredAreaCity: string;
  insuredAreaPostCode: string;
  insuredAreaFloor: string;
  landlinePhone: string;
  mobilePhone: string;
  fax: string;
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
  customer_phoneNotices: Array<{ name: string, phone: string, editable: boolean }>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private storage: Storage,
    private customersProvider: CustomersProvider,
    private app: App) {
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
          this.customer_phoneNotices = element.phoneNotices;
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
    // this.events.publish('submit', {});
    const d = new Date();

    this.customer_subscriberName = this.customersProvider.subscriberName;
    this.customer_installerName = this.customersProvider.installerName;
    this.customer_customerPass = this.customersProvider.customerPass;
    this.customer_AuxiliaryPass = this.customersProvider.customerAuxiliaryPass;
    this.customer_phoneNotices = this.customersProvider.phoneNotices;    

    this.customersProvider.addCustomer(
      {
        name: this.customer_subscriberName.split(" ")[0],
        surname: this.customer_subscriberName.split(" ")[1],
        city: this.customer_insuredAreaCity,
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
          installerName: this.customer_installerName,
          customerPass: this.customer_customerPass,
          customerAuxiliaryPass: this.customer_AuxiliaryPass,
          duressCode: this.customer_duressCode,
          customerConnectionDate: this.customer_ConnectionDate,
          subscriberName: this.customer_subscriberName,
          insuredAreaAddress: this.customer_insuredAreaAddress,
          insuredAreaCity: this.customer_insuredAreaCity,
          insuredAreaPostCode: this.customer_insuredAreaPostCode,
          insuredAreaFloor: this.customer_insuredAreaFloor,
          insuredAreaDescription: this.customer_insuredAreaDescription,
          insuredAreaType: this.customer_insuredAreaType,
          insuredAreaTypeOther: this.customer_insuredAreaType,
          areaPhone: this.customer_areaPhone,
          alarmUnitType: this.customer_alarmUnitType,
          format: this.customer_format,
          frequency24HourTest: this.customer_frequency24HourTest,
          weeklyTimeMonitoring: this.customer_weeklyTimeMonitoring,
          policeStation: this.customer_policeStation,
          directTransmissionPhones: this.customer_directTransmissionPhones,
          operationControlHours: this.customer_operationControlHours,
          monthlyAlarmList: this.customer_monthlyAlarmList,
          otherRemarks: this.customer_otherRemarks,
          datePublished: new Date(),
          enabled: true,
          // zones: this.customer_zones,
          // alarmUsers: this.customer_alarmUsers,
          phoneNotices: this.customer_phoneNotices,
          installer_name: this.name,
          installer_afm: this.afm,
          installer_proffesionalDescription: this.proffesionalDescription,
          installer_insuredAreaAddress: this.insuredAreaAddress,
          installer_insuredAreaCity: this.insuredAreaCity,
          installer_insuredAreaPostCode: this.insuredAreaPostCode,
          installer_insuredAreaFloor: this.insuredAreaFloor,
          installer_landlinePhone: this.landlinePhone,
          installer_mobilePhone: this.mobilePhone,
          installer_email: this.email,
          installer_website: this.website,
          installer_collectionPolicy: this.collectionPolicy,
          installer_emailInvoice: this.emailInvoice,
          installer_billingAddressOnly: this.billingAddressOnly,
          installer_fax: this.fax
        });

        this.storage.set('customers', value);
        console.log("Local Storage customers before", value);
      }
      else {
        this.storage.set('customers', [{
          installerName: this.customer_installerName,
          customerPass: this.customer_customerPass,
          customerAuxiliaryPass: this.customer_AuxiliaryPass,
          duressCode: this.customer_duressCode,
          customerConnectionDate: this.customer_ConnectionDate,
          subscriberName: this.customer_subscriberName,
          insuredAreaAddress: this.customer_insuredAreaAddress,
          insuredAreaCity: this.customer_insuredAreaCity,
          insuredAreaPostCode: this.customer_insuredAreaPostCode,
          insuredAreaFloor: this.customer_insuredAreaFloor,
          insuredAreaDescription: this.customer_insuredAreaDescription,
          insuredAreaType: this.customer_insuredAreaType,
          insuredAreaTypeOther: this.customer_insuredAreaType,
          areaPhone: this.customer_areaPhone,
          alarmUnitType: this.customer_alarmUnitType,
          format: this.customer_format,
          frequency24HourTest: this.customer_frequency24HourTest,
          weeklyTimeMonitoring: this.customer_weeklyTimeMonitoring,
          policeStation: this.customer_policeStation,
          directTransmissionPhones: this.customer_directTransmissionPhones,
          operationControlHours: this.customer_operationControlHours,
          monthlyAlarmList: this.customer_monthlyAlarmList,
          otherRemarks: this.customer_otherRemarks,
          datePublished: new Date(),
          enabled: true,
          // zones: this.customer_zones,
          // alarmUsers: this.customer_alarmUsers,
          phoneNotices: this.customer_phoneNotices,
          installer_name: this.name,
          installer_afm: this.afm,
          installer_proffesionalDescription: this.proffesionalDescription,
          installer_insuredAreaAddress: this.insuredAreaAddress,
          installer_insuredAreaCity: this.insuredAreaCity,
          installer_insuredAreaPostCode: this.insuredAreaPostCode,
          installer_insuredAreaFloor: this.insuredAreaFloor,
          installer_landlinePhone: this.landlinePhone,
          installer_mobilePhone: this.mobilePhone,
          installer_email: this.email,
          installer_website: this.website,
          installer_collectionPolicy: this.collectionPolicy,
          installer_emailInvoice: this.emailInvoice,
          installer_billingAddressOnly: this.billingAddressOnly,
          installer_fax: this.fax
        }]);
      }
    });

    this.app.getRootNav().setRoot(CustomersPage);
  }

  submitName(): void {
    console.log("ionChange installer-name");
    this.events.publish('installer-details-name', {
      name: this.name
    });
  }

  submitAFM(): void {
    this.events.publish('installer-details-afm', {
      afm: this.afm
    });
  }

  submitProfDescription(): void {
    this.events.publish('installer-details-proffesionalDescription', {
      proffesionalDescription: this.proffesionalDescription
    });
  }

  submitAddrNum(): void {
    this.events.publish('installer-details-addrNum', {
      insuredAreaAddress: this.insuredAreaAddress
    });
  }

  submitCity(): void {
    this.events.publish('installer-details-city', {
      insuredAreaCity: this.insuredAreaCity
    });
  }

  submitPostCode(): void {
    this.events.publish('installer-details-postCode', {
      insuredAreaPostCode: this.insuredAreaPostCode
    });
  }

  submitFloor(): void {
    this.events.publish('installer-details-floor', {
      insuredAreaFloor: this.insuredAreaFloor
    });
  }

  submitLandline(): void {
    this.events.publish('installer-details-landline', {
      landlinePhone: this.landlinePhone
    });
  }

  submitMobile(): void {
    this.events.publish('installer-details-mobile', {
      mobilePhone: this.mobilePhone
    });
  }

  submitEmail(): void {
    this.events.publish('installer-details-email', {
      email: this.email
    });
  }

  submitWebsite(): void {
    this.events.publish('installer-details-website', {
      website: this.website
    });
  }

  submitCollection(): void {
    this.events.publish('installer-details-collection', {
      collectionPolicy: this.collectionPolicy
    });
  }

  submitEmailInvoice(): void {
    this.events.publish('installer-details-invoice', {
      emailInvoice: this.emailInvoice
    });
  }

  submitBilling(): void {
    this.events.publish('installer-details-billing', {
      billingAddressOnly: this.billingAddressOnly
    });
  }

  submitFax(): void {
    this.events.publish('installer-details-fax', {
      fax: this.fax
    });
  }
}
