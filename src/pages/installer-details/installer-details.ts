import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, App, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CustomersProvider } from '../../providers/customers/customers';
import { CustomersPage } from '../customers/customers';
import { NetworkProvider } from '../../providers/network/network';

// @IonicPage()
@Component({
  selector: 'page-installer-details',
  templateUrl: 'installer-details.html',
})
export class InstallerDetailsPage {

  name: string = "";
  afm: string = "";
  proffesionalDescription: string = "";
  insuredAreaAddress: string = "";
  insuredAreaCity: string = "";
  insuredAreaPostCode: string = "";
  insuredAreaFloor: string = "";
  landlinePhone: string = "";
  mobilePhone: string = "";
  fax: string = "";
  email: string = "";
  website: string = "";
  collectionPolicy: string = "";
  emailInvoice: string = "";
  billingAddressOnly: string = "";
  enabled: boolean;

  customer_installerName: string = "";
  customer_customerPass: string = "";
  customer_AuxiliaryPass: string = "";
  customer_duressCode: string = "";
  customer_ConnectionDate: string = "";
  customer_subscriberName: string = "";
  customer_insuredAreaAddress: string = "";
  customer_insuredAreaCity: string = "";
  customer_insuredAreaPostCode: string = "";
  customer_insuredAreaFloor: string = "";
  customer_insuredAreaDescription: string = "";
  customer_insuredAreaType: string = "";
  customer_insuredAreaTypeOther: string = "";
  customer_areaPhone: string = "";
  customer_alarmUnitType: string = "";
  customer_format: string = "";
  customer_frequency24HourTest: number = 0;
  customer_weeklyTimeMonitoring: string = "";
  customer_policeStation: string = "";
  customer_directTransmissionPhones: string = "";
  customer_operationControlHours: string = "";
  customer_monthlyAlarmList: string = "";
  customer_otherRemarks: string = "";
  customer_enabled: boolean;
  customer_phoneNotices: Array<{ name: string, phone: string, editable: boolean }> = [];
  customer_zones: Array<{ name: string, id: string, editable: boolean }> = [];
  customer_alarmUsers: Array<{ username: string, name: string, editable: boolean }> = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private storage: Storage,
    private customersProvider: CustomersProvider,
    private networkProvider: NetworkProvider,
    private app: App,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

    if (this.isEmptyArray(this.navParams.data)) {
      this.storage.get('installer').then((value) => {
        if (value) {
          this.name = value.name;
          this.afm = value.afm;
          this.proffesionalDescription = value.proffesionalDescription;
          this.insuredAreaAddress = value.insuredAreaAddress;
          this.insuredAreaCity = value.insuredAreaCity;
          this.insuredAreaPostCode = value.insuredAreaPostCode;
          this.insuredAreaFloor = value.insuredAreaFloor;
          this.landlinePhone = value.landlinePhone;
          this.mobilePhone = value.mobilePhone;
          this.email = value.email;
          this.website = value.website;
          this.collectionPolicy = value.collectionPolicy;
          this.emailInvoice = value.emailInvoice;
          this.billingAddressOnly = value.billingAddressOnly;
          this.fax = value.fax;
        }
      });
    }
    else {
      this.storage.get('customers').then((value) => {
        if (value) {
          console.log("Storage Array:", value);
          value.forEach(element => {
            if (element.subscriberName === this.navParams.data.subscriberName) {
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

              this.customer_installerName = element.installerName;
              this.customer_customerPass = element.customerPass;
              this.customer_AuxiliaryPass = element.customerAuxiliaryPass;
              this.customer_duressCode = element.duressCode;
              this.customer_ConnectionDate = element.customerConnectionDate;
              this.customer_subscriberName = element.subscriberName;
              this.customer_insuredAreaAddress = element.insuredAreaAddress;
              this.customer_insuredAreaCity = element.insuredAreaCity;
              this.customer_insuredAreaPostCode = element.insuredAreaPostCode;
              this.customer_insuredAreaFloor = element.insuredAreaFloor;
              this.customer_insuredAreaDescription = element.insuredAreaDescription;
              this.customer_insuredAreaType = element.insuredAreaType;
              this.customer_insuredAreaTypeOther = element.insuredAreaTypeOther;
              this.customer_areaPhone = element.areaPhone;
              this.customer_alarmUnitType = element.alarmUnitType;
              this.customer_format = element.format;
              this.customer_frequency24HourTest = element.frequency24HourTest;
              this.customer_weeklyTimeMonitoring = element.weeklyTimeMonitoring;
              this.customer_policeStation = element.policeStation;
              this.customer_directTransmissionPhones = element.directTransmissionPhones;
              this.customer_operationControlHours = element.operationControlHours;
              this.customer_monthlyAlarmList = element.monthlyAlarmList;
              this.customer_otherRemarks = element.otherRemarks;
              this.customer_phoneNotices = element.phoneNotices;
              this.customer_alarmUsers = element.alarmUsers;
              this.customer_zones = element.zones;
            }
          });
        }
      });
    }
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

    if (this.networkProvider.isOnline()) {
      if (this.customer_subscriberName.length == 0 ) {
        let toast = this.toastCtrl.create({
          message: 'Παρακαλώ εισάγετε ονοματεπώνυμο συνδρομητή',
          duration: 3000,
          position: 'middle'
        });
        toast.present();
      }
      else if (this.customer_insuredAreaCity.length == 0) {
        let toast = this.toastCtrl.create({
          message: 'Παρακαλώ εισάγετε πόλη συνδρομητή',
          duration: 3000,
          position: 'middle'
        });
        toast.present();
      }
      else {
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

        if (this.navParams.get('subscriberName') ){
          
          let customer = this.customersProvider.getCustomer(this.navParams.data.subscriberName);
          console.log("Found customer ", customer.name);
          customer.draft = false;
          customer.publishedDate = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes());
          customer.enabled = true;

          this.storage.get("customers").then((value) => {
            let temp = [];
            if (value) {
              for (let i = 0; i < value.length; i++) {
                if (value[i].subscriberName == customer.subscriberName) {
                  temp.push({
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
                    insuredAreaTypeOther: this.customer_insuredAreaTypeOther,
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
                    datePublished: d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()),
                    enabled: true,
                    draft: false,
                    zones: this.customer_zones,
                    alarmUsers: this.customer_alarmUsers,
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
                }
                else {
                  temp.push(value[i]);
                }
              }
              this.storage.set("customers", temp);
              this.customersProvider.replaceDraft(customer);
            }
          });


          // this.customersProvider.setSubscriber("");
          // this.customersProvider.setInstallerName("");
          // this.customersProvider.setCustomerPass("");
          // this.customersProvider.setCustomerAuxiliaryPass("");
          // this.customersProvider.setCustomerDuressCode("");
          // this.customersProvider.setCustomerConnectionDate("");
          // this.customersProvider.setCustomerInsuredAreaAddress("");
          // this.customersProvider.setCustomerInsuredAreaCity("");
          // this.customersProvider.setCustomerInsuredAreaPostCode("");
          // this.customersProvider.setCustomerInsuredAreaFloor("");
          // this.customersProvider.setCustomerInsuredAreaDescription("");
          // this.customersProvider.setCustomerInsuredAreaType("");
          // this.customersProvider.setCustomerInsuredAreaTypeOther("")
          // this.customersProvider.setCustomerAreaPhone("")
          // this.customersProvider.setCustomerAlarmUnitType("");
          // this.customersProvider.setCustomerFormat("");
          // this.customersProvider.setCustomerFrequency24HourTest("");
          // this.customersProvider.setCustomerWeeklyTimeMonitoring("");
          // this.customersProvider.setCustomerPoliceStation("");
          // this.customersProvider.setCustomerDirectTransmissionPhones("");
          // this.customersProvider.setCustomerOperationControlHours("");
          // this.customersProvider.setCustomerMonthlyAlarmList("");
          // this.customersProvider.setCustomerOtherRemarks("");
          // this.customersProvider.setZones([]);
          // this.customersProvider.setPhoneNotices([]);
          // this.customersProvider.setAlarmUsers([]);
          // this.name = "";
          // this.afm = "";
          // this.proffesionalDescription = "";
          // this.insuredAreaAddress = "";
          // this.insuredAreaCity = "";
          // this.insuredAreaPostCode = "";
          // this.insuredAreaFloor = "";
          // this.landlinePhone = "";
          // this.mobilePhone = "";
          // this.email = "";
          // this.website = "";
          // this.collectionPolicy = "";
          // this.emailInvoice = "";
          // this.billingAddressOnly = "";
          // this.fax = "";
          this.app.getRootNav().setRoot(CustomersPage)
        } else {
          this.customersProvider.addCustomer(
            {
              subscriberName: this.customersProvider.subscriberName,              
              city: this.customersProvider.customerInsuredAreaCity,
              visible: true,
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
              this.customersProvider.setCustomerInsuredAreaTypeOther("");
              this.customersProvider.setCustomerAreaPhone("");
              this.customersProvider.setCustomerAlarmUnitType("");
              this.customersProvider.setCustomerFormat("");
              this.customersProvider.setCustomerFrequency24HourTest(0);
              this.customersProvider.setCustomerOperationControlHours("");
              this.customersProvider.setCustomerWeeklyTimeMonitoring("");
              this.customersProvider.setCustomerPoliceStation("");
              this.customersProvider.setCustomerDirectTransmissionPhones("");
              this.customersProvider.setCustomerMonthlyAlarmList("");
              this.customersProvider.setCustomerOtherRemarks("");
              this.customersProvider.setAlarmUsers([]);
              this.customersProvider.setZones([]);
              this.customersProvider.setPhoneNotices([]);
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
              this.customersProvider.setCustomerInsuredAreaTypeOther("");
              this.customersProvider.setCustomerAreaPhone("");
              this.customersProvider.setCustomerAlarmUnitType("");
              this.customersProvider.setCustomerFormat("");
              this.customersProvider.setCustomerFrequency24HourTest(0);
              this.customersProvider.setCustomerOperationControlHours("");
              this.customersProvider.setCustomerWeeklyTimeMonitoring("");
              this.customersProvider.setCustomerPoliceStation("");
              this.customersProvider.setCustomerDirectTransmissionPhones("");
              this.customersProvider.setCustomerMonthlyAlarmList("");
              this.customersProvider.setCustomerOtherRemarks("");
              this.customersProvider.setAlarmUsers([]);
              this.customersProvider.setZones([]);
              this.customersProvider.setPhoneNotices([]);
            }
          });
        }

        this.app.getRootNav().setRoot(CustomersPage);
      }
    }
    else {
      let toast = this.toastCtrl.create({
        message: 'Είστε σε offline mode. Συνδεθείτε στο internet για να αποστείλετε τα στοιχεία.',
        duration: 3000,
        position: 'middle',
        cssClass: "toast"
      });
      toast.present();
    }
  }

  save(): void {
    if (this.navParams.get('subscriberName')) {
      // let customer = this.customersProvider.getCustomer(this.navParams.data.name, this.navParams.data.surname);
      console.log("If 1 installer");
      let temp = [];
      this.storage.get("customers").then((value) => {

        console.log("In save");

        if (value) {
          console.log("If 2 installer");
          for (let i = 0; i < value.length; i++) {
            if (value[i].subscriberName == this.navParams.get('subscriberName')) {
              temp.push({
                // installerName: this.customer_installerName,
                // customerPass: this.customer_customerPass,
                // customerAuxiliaryPass: this.customer_AuxiliaryPass,
                // duressCode: this.customer_duressCode,
                // customerConnectionDate: this.customer_ConnectionDate,
                // subscriberName: this.customer_subscriberName,
                // insuredAreaAddress: this.customer_insuredAreaAddress,
                // insuredAreaCity: this.customer_insuredAreaCity,
                // insuredAreaPostCode: this.customer_insuredAreaPostCode,
                // insuredAreaFloor: this.customer_insuredAreaFloor,
                // insuredAreaDescription: this.customer_insuredAreaDescription,
                // insuredAreaType: this.customer_insuredAreaType,
                // insuredAreaTypeOther: this.customer_insuredAreaTypeOther,
                // areaPhone: this.customer_areaPhone,
                // alarmUnitType: this.customer_alarmUnitType,
                // format: this.customer_format,
                // frequency24HourTest: this.customer_frequency24HourTest,
                // weeklyTimeMonitoring: this.customer_weeklyTimeMonitoring,
                // policeStation: this.customer_policeStation,
                // directTransmissionPhones: this.customer_directTransmissionPhones,
                // operationControlHours: this.customer_operationControlHours,
                // monthlyAlarmList: this.customer_monthlyAlarmList,
                // otherRemarks: this.customer_otherRemarks,
                // datePublished: "",
                // enabled: null,
                // draft: true,
                // zones: this.customer_zones,
                // alarmUsers: this.customer_alarmUsers,
                // phoneNotices: this.customersProvider.phoneNotices,
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
                installer_fax: this.fax,
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
              datePublished: "",
              zones: this.customersProvider.zones,
              phoneNotices: this.customersProvider.phoneNotices,
              alarmUsers: this.customersProvider.alarmUsers,
              enabled: null,
              draft: true,
              // installer_name: this.name,
              // installer_afm: this.afm,
              // installer_proffesionalDescription: this.proffesionalDescription,
              // installer_insuredAreaAddress: this.insuredAreaAddress,
              // installer_insuredAreaCity: this.insuredAreaCity,
              // installer_insuredAreaPostCode: this.insuredAreaPostCode,
              // installer_insuredAreaFloor: this.insuredAreaFloor,
              // installer_landlinePhone: this.landlinePhone,
              // installer_mobilePhone: this.mobilePhone,
              // installer_email: this.email,
              // installer_website: this.website,
              // installer_collectionPolicy: this.collectionPolicy,
              // installer_emailInvoice: this.emailInvoice,
              // installer_billingAddressOnly: this.billingAddressOnly,
              // installer_fax: this.fax
              });
            }
            else {
              temp.push(value[i]);
            }
          }
          this.storage.set("customers", temp);
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
            this.customersProvider.setCustomerInsuredAreaTypeOther("");
            this.customersProvider.setCustomerAreaPhone("");
            this.customersProvider.setCustomerAlarmUnitType("");
            this.customersProvider.setCustomerFormat("");
            this.customersProvider.setCustomerFrequency24HourTest(0);
            this.customersProvider.setCustomerOperationControlHours("");
            this.customersProvider.setCustomerWeeklyTimeMonitoring("");
            this.customersProvider.setCustomerPoliceStation("");
            this.customersProvider.setCustomerDirectTransmissionPhones("");
            this.customersProvider.setCustomerMonthlyAlarmList("");
            this.customersProvider.setCustomerOtherRemarks("");
            this.customersProvider.setAlarmUsers([]);
            this.customersProvider.setZones([]);
            this.customersProvider.setPhoneNotices([]);
          this.app.getRootNav().setRoot(CustomersPage);
        }
      });
    }
    else {
      console.log("Else 1 installer");
      if (this.customersProvider.subscriberName.length == 0) {
        let toast = this.toastCtrl.create({
          message: 'Παρακαλώ είσαγετε ονοματεπώνυμο συνδρομητή',
          duration: 3000,
          position: 'middle'
        });

        toast.present();
      }
      else if (this.customersProvider.customerInsuredAreaCity.length == 0) {
        let toast = this.toastCtrl.create({
          message: 'Παρακαλώ είσαγετε πόλη συνδρομητή',
          duration: 3000,
          position: 'middle'
        });

        toast.present();
      }
      else {
        console.log("Else 2 installer");
        let d = new Date();
        this.customersProvider.addCustomer(
          {
            subscriberName: this.customersProvider.subscriberName,          
            city: this.customersProvider.customerInsuredAreaCity,
            visible: true,
            draft: true,
            publishedDate: "",
            enabled: null
          }
        );

        this.storage.get('customers').then((value) => {

          let temp = value;

          console.log("Local Storage customers before", value);

          if (temp != null) {
            console.log("If 3 installer");
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
              datePublished: "",
              zones: this.customersProvider.zones,
              phoneNotices: this.customersProvider.phoneNotices,
              alarmUsers: this.customersProvider.alarmUsers,
              enabled: null,
              draft: true,
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

            // this.customersProvider.setSubscriber("");
            // this.customersProvider.setInstallerName("");
            // this.customersProvider.setCustomerPass("");
            // this.customersProvider.setCustomerAuxiliaryPass("");
            // this.customersProvider.setCustomerDuressCode("");
            // this.customersProvider.setCustomerConnectionDate("");
            // this.customersProvider.setCustomerInsuredAreaAddress("");
            // this.customersProvider.setCustomerInsuredAreaCity("");
            // this.customersProvider.setCustomerInsuredAreaPostCode("");
            // this.customersProvider.setCustomerInsuredAreaFloor("");
            // this.customersProvider.setCustomerInsuredAreaDescription("");
            // this.customersProvider.setCustomerInsuredAreaType("");
            // this.customersProvider.setCustomerInsuredAreaTypeOther("");
            // this.customersProvider.setCustomerAreaPhone("");
            // this.customersProvider.setCustomerAlarmUnitType("");
            // this.customersProvider.setCustomerFormat("");
            // this.customersProvider.setCustomerFrequency24HourTest(0);
            // this.customersProvider.setCustomerOperationControlHours("");
            // this.customersProvider.setCustomerWeeklyTimeMonitoring("");
            // this.customersProvider.setCustomerPoliceStation("");
            // this.customersProvider.setCustomerDirectTransmissionPhones("");
            // this.customersProvider.setCustomerMonthlyAlarmList("");
            // this.customersProvider.setCustomerOtherRemarks("");
            // this.customersProvider.setAlarmUsers([]);
            // this.customersProvider.setZones([]);
            // this.customersProvider.setPhoneNotices([]);

            this.storage.set("customers", temp).then((data) => {
              console.log("Stored ", data)
            });
          }
          else {
            console.log("Else 1 installer");
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
              enabled: null,
              draft: true,
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

            // this.customersProvider.setSubscriber("");
            // this.customersProvider.setInstallerName("");
            // this.customersProvider.setCustomerPass("");
            // this.customersProvider.setCustomerAuxiliaryPass("");
            // this.customersProvider.setCustomerDuressCode("");
            // this.customersProvider.setCustomerConnectionDate("");
            // this.customersProvider.setCustomerInsuredAreaAddress("");
            // this.customersProvider.setCustomerInsuredAreaCity("");
            // this.customersProvider.setCustomerInsuredAreaPostCode("");
            // this.customersProvider.setCustomerInsuredAreaFloor("");
            // this.customersProvider.setCustomerInsuredAreaDescription("");
            // this.customersProvider.setCustomerInsuredAreaType("");
            // this.customersProvider.setCustomerInsuredAreaTypeOther("");
            // this.customersProvider.setCustomerAreaPhone("");
            // this.customersProvider.setCustomerAlarmUnitType("");
            // this.customersProvider.setCustomerFormat("");
            // this.customersProvider.setCustomerFrequency24HourTest(0);
            // this.customersProvider.setCustomerOperationControlHours("");
            // this.customersProvider.setCustomerWeeklyTimeMonitoring("");
            // this.customersProvider.setCustomerPoliceStation("");
            // this.customersProvider.setCustomerDirectTransmissionPhones("");
            // this.customersProvider.setCustomerMonthlyAlarmList("");
            // this.customersProvider.setCustomerOtherRemarks("");
            // this.customersProvider.setAlarmUsers([]);
            // this.customersProvider.setZones([]);
            // this.customersProvider.setPhoneNotices([]);
          }
        });
        this.app.getRootNav().setRoot(CustomersPage);
      }
    }   
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
