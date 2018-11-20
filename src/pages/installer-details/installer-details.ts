import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CustomersProvider } from '../../providers/customers/customers';
import { CustomersPage } from '../customers/customers';

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
  enabled: boolean;

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
      if (value) {
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
            this.enabled = element.enabled;
          }
        });
      }
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
    console.log('In submit');
    const d = new Date();

    let visible = undefined;
    let enabled = this.customersProvider.enabled;
    let disabled = this.customersProvider.disabled;

    if (enabled == true && this.enabled == true) {
      visible = true;
    }
    else if (disabled == true && this.enabled == false) {
      visible = true;
    }
    else {
      visible = false;
    }

    if (this.navParams.get('name') && this.navParams.get('surname')) {
      console.log("NAV PARAMS", this.navParams.data);
      let customer = this.customersProvider.getCustomer(this.navParams.data.name, this.navParams.data.surname);
      console.log("Found customer ", customer.name);
      customer.draft = false;
      customer.publishedDate = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes());
      customer.enabled = true;

      this.storage.get("customers").then((value) => {
        let temp = [];
        if (value) {
          for (let i = 0; i < value.length; i++) {
            if (value[i].subscriberName.split(" ")[0] == customer.name && value[i].subscriberName.split(" ")[1] == customer.surname) {
              temp.push({
                installerName: this.customersProvider.installerName,
                customerPass: this.customersProvider.customerPass,
                customerAuxiliaryPass: this.customersProvider.customerAuxiliaryPass,
                duressCode: this.customersProvider.customerDuressCode,
                customerConnectionDate: this.customersProvider.customerConnectionDate,
                subscriberName: this.customersProvider.subscriberName,
                insuredAreaAddress: this.customersProvider.customerInsuredAreaAddress,
                insuredAreaCity: this.customersProvider.customerInsuredAreaCity,
                insuredAreaPostCode: this.customersProvider.customerInsuredAreaPostCode,
                insuredAreaFloor: this.customersProvider.customerInsuredAreaFloor,
                insuredAreaDescription: this.customersProvider.customerInsuredAreaDescription,
                insuredAreaType: this.customersProvider.customerInsuredAreaType,
                insuredAreaTypeOther: this.customersProvider.customerInsuredAreaTypeOther,
                areaPhone: this.customersProvider.customerAreaPhone,
                alarmUnitType: this.customersProvider.customerAlarmUnitType,
                format: this.customersProvider.customerFormat,
                frequency24HourTest: this.customersProvider.customerFrequency24HourTest,
                weeklyTimeMonitoring: this.customersProvider.customerWeeklyTimeMonitoring,
                policeStation: this.customersProvider.customerPoliceStation,
                directTransmissionPhones: this.customersProvider.customerDirectTransmissionPhones,
                operationControlHours: this.customersProvider.customerOperationControlHours,
                monthlyAlarmList: this.customersProvider.customerMonthlyAlarmList,
                otherRemarks: this.customersProvider.customerOtherRemarks,
                datePublished: d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()),
                enabled: true,
                draft: false,
                zones: this.customersProvider.zones,
                alarmUsers: this.customersProvider.alarmUsers,
                phoneNotices: this.customersProvider.phoneNotices,
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
            }
            else {
              temp.push(value[i]);
            }
          }
          this.storage.set("customers", temp);
        }

        this.customersProvider.setSubscriber("");
        this.customersProvider.setInstallerName("");
        this.customersProvider.setCustomerPass("");
        this.customersProvider.setCustomerAuxiliaryPass("");
        this.customersProvider.setCustomerDuressCode("");
        this.customersProvider.setCustomerConnectionDate("");
        this.customersProvider.setCustomerInsuredAreaAddress("");
        this.customersProvider.setCustomerInsuredAreaCity("");
        this.customersProvider.setCustomerInsuredAreaPostCode("");
        this.customersProvider.setCustomerInsuredAreaFloor("");
        this.customersProvider.setCustomerInsuredAreaDescription("");
        this.customersProvider.setCustomerInsuredAreaType("");
        this.customersProvider.setCustomerInsuredAreaTypeOther("")
        this.customersProvider.setCustomerAreaPhone("")
        this.customersProvider.setCustomerAlarmUnitType("");
        this.customersProvider.setCustomerFormat("");
        this.customersProvider.setCustomerFrequency24HourTest("");
        this.customersProvider.setCustomerWeeklyTimeMonitoring("");
        this.customersProvider.setCustomerPoliceStation("");
        this.customersProvider.setCustomerDirectTransmissionPhones("");
        this.customersProvider.setCustomerOperationControlHours("");
        this.customersProvider.setCustomerMonthlyAlarmList("");
        this.customersProvider.setCustomerOtherRemarks("");
        this.customersProvider.setZones([]);
        this.customersProvider.setPhoneNotices([]);
        this.customersProvider.setAlarmUsers([]);
        // // this.name = "";
        // // this.afm = "";
        // // this.installer_proffesionalDescription = "";
        // // this.installer_insuredAreaAddress = "";
        // // this.installer_insuredAreaCity = "";
        // // this.installer_insuredAreaPostCode = "";
        // // this.installer_insuredAreaFloor = "";
        // // this.installer_landlinePhone = "";
        // // this.installer_mobilePhone = "";
        // // this.installer_email = "";
        // // this.installer_website = "";
        // // this.installer_collectionPolicy = "";
        // // this.installer_emailInvoice = "";
        // // this.installer_billingAddressOnly = "";
        // // this.installer_fax = "";
      });

      this.customersProvider.replaceDraft(customer);
      this.app.getRootNav().setRoot(CustomersPage)
    } else {
      this.customersProvider.addCustomer(
        {
          name: this.customersProvider.subscriberName.split(" ")[0],
          surname: this.customersProvider.subscriberName.split(" ")[1],
          city: this.insuredAreaCity,
          visible: visible,
          draft: false,
          publishedDate: d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()),
          enabled: true
        }
      );

      this.storage.get("customers").then((value) => {

        let temp = value;

        console.log("Local Storage customers before", value);

        if (temp != null) {
          temp.push({
            installerName: this.customersProvider.installerName,
            customerPass: this.customersProvider.customerPass,
            customerAuxiliaryPass: this.customersProvider.customerAuxiliaryPass,
            duressCode: this.customersProvider.customerDuressCode,
            customerConnectionDate: this.customersProvider.customerConnectionDate,
            subscriberName: this.customersProvider.subscriberName,
            insuredAreaAddress: this.customersProvider.customerInsuredAreaAddress,
            insuredAreaCity: this.customersProvider.customerInsuredAreaCity,
            insuredAreaPostCode: this.customersProvider.customerInsuredAreaPostCode,
            insuredAreaFloor: this.customersProvider.customerInsuredAreaFloor,
            insuredAreaDescription: this.customersProvider.customerInsuredAreaDescription,
            insuredAreaType: this.customersProvider.customerInsuredAreaType,
            insuredAreaTypeOther: this.customersProvider.customerInsuredAreaTypeOther,
            areaPhone: this.customersProvider.customerAreaPhone,
            alarmUnitType: this.customersProvider.customerAlarmUnitType,
            format: this.customersProvider.customerFormat,
            frequency24HourTest: this.customersProvider.customerFrequency24HourTest,
            weeklyTimeMonitoring: this.customersProvider.customerWeeklyTimeMonitoring,
            policeStation: this.customersProvider.customerPoliceStation,
            directTransmissionPhones: this.customersProvider.customerDirectTransmissionPhones,
            operationControlHours: this.customersProvider.customerOperationControlHours,
            monthlyAlarmList: this.customersProvider.customerMonthlyAlarmList,
            otherRemarks: this.customersProvider.customerOtherRemarks,
            datePublished: d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()),
            zones: this.customersProvider.zones,
            phoneNotices: this.customersProvider.phoneNotices,
            alarmUsers: this.customersProvider.alarmUsers,
            enabled: true,
            draft: false,
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

          this.storage.set("customers", temp).then((data) => {
            console.log("Stored ", data)
          });
        }
        else {
          console.log("Local Storage Else");
          this.storage.set("customers", [{
            installerName: this.customersProvider.installerName,
            customerPass: this.customersProvider.customerPass,
            customerAuxiliaryPass: this.customersProvider.customerAuxiliaryPass,
            duressCode: this.customersProvider.customerDuressCode,
            customerConnectionDate: this.customersProvider.customerConnectionDate,
            subscriberName: this.customersProvider.subscriberName,
            insuredAreaAddress: this.customersProvider.customerInsuredAreaAddress,
            insuredAreaCity: this.customersProvider.customerInsuredAreaCity,
            insuredAreaPostCode: this.customersProvider.customerInsuredAreaPostCode,
            insuredAreaFloor: this.customersProvider.customerInsuredAreaFloor,
            insuredAreaDescription: this.customersProvider.customerInsuredAreaDescription,
            insuredAreaType: this.customersProvider.customerInsuredAreaType,
            insuredAreaTypeOther: this.customersProvider.customerInsuredAreaTypeOther,
            areaPhone: this.customersProvider.customerAreaPhone,
            alarmUnitType: this.customersProvider.customerAlarmUnitType,
            format: this.customersProvider.customerFormat,
            frequency24HourTest: this.customersProvider.customerFrequency24HourTest,
            weeklyTimeMonitoring: this.customersProvider.customerWeeklyTimeMonitoring,
            policeStation: this.customersProvider.customerPoliceStation,
            directTransmissionPhones: this.customersProvider.customerDirectTransmissionPhones,
            operationControlHours: this.customersProvider.customerOperationControlHours,
            monthlyAlarmList: this.customersProvider.customerMonthlyAlarmList,
            otherRemarks: this.customersProvider.customerOtherRemarks,
            datePublished: d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()),
            zones: this.customersProvider.zones,
            phoneNotices: this.customersProvider.phoneNotices,
            alarmUsers: this.customersProvider.alarmUsers,
            enabled: true,
            draft: false,
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
          }]).then((data) => {
            console.log("Stored ", data);
          });
        }
      });
    }

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
