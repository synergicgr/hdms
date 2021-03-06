import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Platform, Events, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CustomersProvider } from '../../providers/customers/customers';
import { CustomersPage } from '../customers/customers';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NetworkProvider } from '../../providers/network/network';
import { InstallerProvider } from '../../providers/installer/installer';


// @IonicPage()
@Component({
  selector: 'page-new-customer',
  templateUrl: 'new-customer.html',
})
export class NewCustomerPage implements OnInit {

  installerName: string = "";
  customerPass: string = "";
  customerAuxiliaryPass: string = "";
  duressCode: string = "";
  customerConnectionDate: string = "";
  subscriberName: string = "";
  insuredAreaAddress: string = "";
  insuredAreaCity: string = "";
  insuredAreaPostCode: string = "";
  insuredAreaFloor: string = "";
  insuredAreaDescription: string = "";
  insuredAreaType: string = "";
  insuredAreaTypeOther: string = "";
  areaPhone: string = "";
  alarmUnitType: string = "";
  format: string = "";
  frequency24HourTest: number = 0;
  weeklyTimeMonitoring: string = "";
  policeStation: string = "";
  directTransmissionPhones: string = "";
  operationControlHours: string = "";
  monthlyAlarmList: string = "";
  otherRemarks: string = "";
  enabled: boolean = null;

  installer_name: string = "";
  installer_afm: string = "";
  installer_proffesionalDescription: string = "";
  installer_insuredAreaAddress: string = "";
  installer_insuredAreaCity: string = "";
  installer_insuredAreaPostCode: string = "";
  installer_insuredAreaFloor: string = "";
  installer_fax: string = "";
  installer_landlinePhone: string = "";
  installer_mobilePhone: string = "";
  installer_email: string = "";
  installer_website: string = "";
  installer_collectionPolicy: string = "";
  installer_emailInvoice: string = "";
  installer_billingAddressOnly: string = "";

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

  private zonesSource = new BehaviorSubject<{ name: string, id: string, editable: boolean }[]>([]);
  zonesData = this.zonesSource.asObservable();

  private alarmUsersSource = new BehaviorSubject<{ username: string, name: string, editable: boolean }[]>([]);
  alarmUsersData = this.alarmUsersSource.asObservable();

  maximumDate: string = (new Date().getFullYear() + 30) + "-12-31"

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private customersProvider: CustomersProvider,
    private app: App,
    private platform: Platform,
    private events: Events,
    private toastCtrl: ToastController,
    private networkProvider: NetworkProvider,
    private installerProvider: InstallerProvider
  ) {

    platform.registerBackButtonAction(() => {
      this.app.getRootNav().setRoot(CustomersPage, { back: true });
    });
  }

  ngOnInit() {

    console.log(this.navParams);

    this.phoneNoticeData.subscribe(data => {
      this.customersProvider.setPhoneNotices(this.phoneNotices);
    });

    this.zonesData.subscribe(data => {
      this.customersProvider.setZones(this.zones);
    });

    this.alarmUsersData.subscribe(data => {
      this.customersProvider.setAlarmUsers(this.alarmUsers);
    });

    this.events.subscribe('installer-details-name', (data) => {
      this.installer_name = data.name;
    });

    this.events.subscribe('installer-details-afm', (data) => {
      this.installer_afm = data.afm;
    });

    this.events.subscribe('installer-details-proffesionalDescription', (data) => {
      this.installer_proffesionalDescription = data.proffesionalDescription;
    });

    this.events.subscribe('installer-details-addrNum', (data) => {
      this.installer_insuredAreaAddress = data.insuredAreaAddress;
    });

    this.events.subscribe('installer-details-city', (data) => {
      this.installer_insuredAreaCity = data.insuredAreaCity;
    });

    this.events.subscribe('installer-details-postCode', (data) => {
      this.installer_insuredAreaPostCode = data.insuredAreaPostCode;
    });

    this.events.subscribe('installer-details-floor', (data) => {
      this.installer_insuredAreaFloor = data.insuredAreaFloor;
    });

    this.events.subscribe('installer-details-landline', (data) => {
      this.installer_landlinePhone = data.landlinePhone;
    });

    this.events.subscribe('installer-details-mobile', (data) => {
      this.installer_mobilePhone = data.mobilePhone;
    });

    this.events.subscribe('installer-details-email', (data) => {
      this.installer_email = data.email;
    });

    this.events.subscribe('installer-details-website', (data) => {
      this.installer_website = data.website;
    });

    this.events.subscribe('installer-details-collection', (data) => {
      this.installer_collectionPolicy = data.collectionPolicy;
    });

    this.events.subscribe('installer-details-invoice', (data) => {
      this.installer_emailInvoice = data.emailInvoice;
    });

    this.events.subscribe('installer-details-billing', (data) => {
      this.installer_billingAddressOnly = data.billingAddressOnly;
    });

    this.events.subscribe('installer-details-fax', (data) => {
      this.installer_fax = data.fax;
    });

    if (this.navParams.get('subscriberName')) {
      this.getDataStorage().then((value) => {
        console.log("Storage array " + JSON.stringify(value));
        if (value) {
          value.forEach(element => {
            console.log("Storage loop");
            console.log("Element in Storage ", element);
            if (element.subscriberName == this.navParams.get('subscriberName')) {
              console.log("In Storage loop");
              this.subscriberName = element.subscriberName;
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
              this.installer_name = element.installerName;
              this.installer_afm = element.installer_afm;
              this.installer_proffesionalDescription = element.installer_proffesionalDescription;
              this.installer_insuredAreaAddress = element.installer_insuredAreaAddress;
              this.installer_insuredAreaCity = element.installer_insuredAreaCity;
              this.installer_insuredAreaPostCode = element.installer_insuredAreaPostCode;
              this.installer_insuredAreaFloor = element.installer_insuredAreaFloor;
              this.installer_fax = element.installer_fax;
              this.installer_landlinePhone = element.installer_landlinePhone;
              this.installer_mobilePhone = element.installer_mobilePhone;
              this.installer_email = element.installer_email;
              this.installer_website = element.installer_website;
              this.installer_collectionPolicy = element.installer_collectionPolicy;
              this.installer_emailInvoice = element.installer_emailInvoice;
              this.installer_billingAddressOnly = element.installer_billingAddressOnly;
            }
          })
        }
      });
    }
    else {

      this.storage.get('installer').then((value) => {
        this.installer_name = value.installerName;
        this.installer_afm = value.afm;
        this.installer_proffesionalDescription = value.proffesionalDescription;
        this.installer_insuredAreaAddress = value.insuredAreaAddress;
        this.installer_insuredAreaCity = value.insuredAreaCity;
        this.installer_insuredAreaPostCode = value.insuredAreaPostCode;
        this.installer_insuredAreaFloor = value.insuredAreaFloor;
        this.installer_fax = value.fax;
        this.installer_landlinePhone = value.landlinePhone;
        this.installer_mobilePhone = value.mobilePhone;
        this.installer_email = value.email;
        this.installer_website = value.website;
        this.installer_collectionPolicy = value.collectionPolicy;
        this.installer_emailInvoice = value.emailInvoice;
        this.installer_billingAddressOnly = value.billingAddressOnly;
      });
    }
  }

  removeZone(index): void {
    this.zones.splice(index, 1);
    this.zonesSource.next([]);
  }

  removeAlarmUser(index): void {
    this.alarmUsers.splice(index, 1);
    this.alarmUsersSource.next([]);
  }

  removePhoneNotice(index): void {
    this.phoneNotices.splice(index, 1);
    this.phoneNoticeSource.next([]);
  }

  addPhoneNotices(): void {
    this.phoneNotices.push({ name: "", phone: "", editable: true });
    this.phoneNoticeSource.next([{ name: "", phone: "", editable: true }]);
  }

  addZone(): void {
    this.zones.push({ name: "", id: "", editable: true });
    this.zonesSource.next([{ name: "", id: "", editable: true }]);
  }

  addAlarmUser(): void {
    this.alarmUsers.push({ username: "", name: "", editable: true });
    this.alarmUsersSource.next([{ username: "", name: "", editable: true }]);
  }

  isEmptyArray(data): any {
    for (var key in data) {
      if (data.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  submit(): void {

    if (this.networkProvider.isOnline()) {

      if (this.subscriberName.length == 0) {
        let toast = this.toastCtrl.create({
          message: 'Παρακαλώ εισάγετε ονοματεπώνυμο συνδρομητή',
          duration: 3000,
          position: 'middle'
        });

        toast.present();
      }
      else if (this.insuredAreaCity.length == 0) {
        let toast = this.toastCtrl.create({
          message: 'Παρακαλώ εισάγετε πόλη συνδρομητή',
          duration: 3000,
          position: 'middle'
        });

        toast.present();
      }
      else {
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

        if (this.navParams.get('subscriberName')) {
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
                    datePublished: d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()),
                    zones: this.zones,
                    phoneNotices: this.phoneNotices,
                    alarmUsers: this.alarmUsers,
                    enabled: true,
                    draft: false,
                    installer_name: this.installer_name,
                    installer_afm: this.installer_afm,
                    installer_proffesionalDescription: this.installer_proffesionalDescription,
                    installer_insuredAreaAddress: this.installer_insuredAreaAddress,
                    installer_insuredAreaCity: this.installer_insuredAreaCity,
                    installer_insuredAreaPostCode: this.installer_insuredAreaPostCode,
                    installer_insuredAreaFloor: this.installer_insuredAreaFloor,
                    installer_landlinePhone: this.installer_landlinePhone,
                    installer_mobilePhone: this.installer_mobilePhone,
                    installer_email: this.installer_email,
                    installer_website: this.installer_website,
                    installer_collectionPolicy: this.installer_collectionPolicy,
                    installer_emailInvoice: this.installer_emailInvoice,
                    installer_billingAddressOnly: this.installer_billingAddressOnly,
                    installer_fax: this.installer_fax
                  });

                }
                else {
                  temp.push(value[i]);
                }
              }
              this.storage.set("customers", temp);
            }
          });

          this.customersProvider.replaceDraft(customer);
          this.app.getRootNav().setRoot(CustomersPage)
        } else {
          this.customersProvider.addCustomer(
            {
              subscriberName: this.subscriberName,
              city: this.insuredAreaCity,
              visible: true,
              draft: false,
              publishedDate: d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()),
              enabled: true
            }
          );

          this.getDataStorage().then((value) => {

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
                installer_name: this.installer_name,
                installer_afm: this.installer_afm,
                installer_proffesionalDescription: this.installer_proffesionalDescription,
                installer_insuredAreaAddress: this.installer_insuredAreaAddress,
                installer_insuredAreaCity: this.installer_insuredAreaCity,
                installer_insuredAreaPostCode: this.installer_insuredAreaPostCode,
                installer_insuredAreaFloor: this.installer_insuredAreaFloor,
                installer_landlinePhone: this.installer_landlinePhone,
                installer_mobilePhone: this.installer_mobilePhone,
                installer_email: this.installer_email,
                installer_website: this.installer_website,
                installer_collectionPolicy: this.installer_collectionPolicy,
                installer_emailInvoice: this.installer_emailInvoice,
                installer_billingAddressOnly: this.installer_billingAddressOnly,
                installer_fax: this.installer_fax
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
                installer_name: this.installer_name,
                installer_afm: this.installer_afm,
                installer_proffesionalDescription: this.installer_proffesionalDescription,
                installer_insuredAreaAddress: this.installer_insuredAreaAddress,
                installer_insuredAreaCity: this.installer_insuredAreaCity,
                installer_insuredAreaPostCode: this.installer_insuredAreaPostCode,
                installer_insuredAreaFloor: this.installer_insuredAreaFloor,
                installer_landlinePhone: this.installer_landlinePhone,
                installer_mobilePhone: this.installer_mobilePhone,
                installer_email: this.installer_email,
                installer_website: this.installer_website,
                installer_collectionPolicy: this.installer_collectionPolicy,
                installer_emailInvoice: this.installer_emailInvoice,
                installer_billingAddressOnly: this.installer_billingAddressOnly,
                installer_fax: this.installer_fax
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

  public async getDataStorage() {
    return await this.storage.get("customers");
  }

  saveSubscriber(): void {
    this.customersProvider.setSubscriber(this.subscriberName);
  }

  saveInstallerName(): void {
    this.customersProvider.setInstallerName(this.installerName);
  }

  saveCustomerPass(): void {
    this.customersProvider.setCustomerPass(this.customerPass);
  }

  saveAuxiliaryPass(): void {
    this.customersProvider.setCustomerAuxiliaryPass(this.customerAuxiliaryPass);
  }

  saveDuressCode(): void {
    this.customersProvider.setCustomerDuressCode(this.duressCode);
  }

  saveConnectionDate(): void {
    console.log("Connection Date:" + this.customerConnectionDate);
    this.customersProvider.setCustomerConnectionDate(this.customerConnectionDate);
  }

  saveInsuredAreaAddress(): void {
    this.customersProvider.setCustomerInsuredAreaAddress(this.insuredAreaAddress);
  }

  saveInsuredAreaCity(): void {
    this.customersProvider.setCustomerInsuredAreaCity(this.insuredAreaCity);
  }

  saveInsuredAreaPostCode(): void {
    this.customersProvider.setCustomerInsuredAreaPostCode(this.insuredAreaPostCode);
  }

  saveInsuredAreaFloor(): void {
    this.customersProvider.setCustomerInsuredAreaFloor(this.insuredAreaFloor);
  }

  saveInsuredAreaDescription(): void {
    this.customersProvider.setCustomerInsuredAreaDescription(this.insuredAreaDescription);
  }

  saveInsuredAreaType(): void {
    this.customersProvider.setCustomerInsuredAreaType(this.insuredAreaType);
  }

  saveInsuredAreaTypeOther(): void {
    this.customersProvider.setCustomerInsuredAreaTypeOther(this.insuredAreaTypeOther);
  }

  saveAreaPhone(): void {
    this.customersProvider.setCustomerAreaPhone(this.areaPhone);
  }

  saveAlarmUnitType(): void {
    this.customersProvider.setCustomerAlarmUnitType(this.alarmUnitType);
  }

  saveFormat(): void {
    this.customersProvider.setCustomerFormat(this.format);
  }

  saveFrequency24HourTest(): void {
    this.customersProvider.setCustomerFrequency24HourTest(this.frequency24HourTest);
  }

  saveWeeklyTimeMonitoring(): void {
    this.customersProvider.setCustomerWeeklyTimeMonitoring(this.weeklyTimeMonitoring);
  }

  savePoliceStation(): void {
    this.customersProvider.setCustomerPoliceStation(this.policeStation);
  }

  saveDirectTransmissionPhones(): void {
    this.customersProvider.setCustomerDirectTransmissionPhones(this.directTransmissionPhones);
  }

  saveOperationControlHours(): void {
    this.customersProvider.setCustomerOperationControlHours(this.operationControlHours);
  }

  saveMonthlyAlarmList(): void {
    this.customersProvider.setCustomerMonthlyAlarmList(this.monthlyAlarmList);
  }

  saveOtherRemarks(): void {
    this.customersProvider.setCustomerOtherRemarks(this.otherRemarks);
  }

  savePhoneNotices(): void {
    this.customersProvider.setPhoneNotices(this.phoneNotices);
  }

  saveAlarmUsers(): void {
    this.customersProvider.setAlarmUsers(this.alarmUsers);
  }

  saveZones(): void {
    this.customersProvider.setZones(this.zones);
  }

  save(): void {
    if (this.subscriberName.length == 0) {
      let toast = this.toastCtrl.create({
        message: 'Παρακαλώ εισάγετε ονοματεπώνυμο συνδρομητή',
        duration: 3000,
        position: 'middle'
      });

      toast.present();
    }
    else if (this.insuredAreaCity.length == 0) {
      let toast = this.toastCtrl.create({
        message: 'Παρακαλώ εισάγετε πόλη συνδρομητή',
        duration: 3000,
        position: 'middle'
      });

      toast.present();
    }
    else {
      console.log("Else 1");
      if (this.navParams.get('subscriberName')) {
        let customer = this.customersProvider.getCustomer(this.navParams.data.subscriberName);
        this.storage.get("customers").then((value) => {
          let temp = [];
          if (value) {
            for (let i = 0; i < value.length; i++) {
              if (value[i].subscriberName == this.navParams.get('subscriberName')) {

                console.log("Subscriber ", this.customersProvider.subscriberName);

                temp.push({
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
                  datePublished: "",
                  enabled: null,
                  draft: true,
                  zones: this.zones,
                  alarmUsers: this.alarmUsers,
                  phoneNotices: this.phoneNotices,
                  installer_name: this.installer_name,
                  installer_afm: this.installer_afm,
                  installer_proffesionalDescription: this.installer_proffesionalDescription,
                  installer_insuredAreaAddress: this.installer_insuredAreaAddress,
                  installer_insuredAreaCity: this.installer_insuredAreaCity,
                  installer_insuredAreaPostCode: this.installer_insuredAreaPostCode,
                  installer_insuredAreaFloor: this.installer_insuredAreaFloor,
                  installer_landlinePhone: this.installer_landlinePhone,
                  installer_mobilePhone: this.installer_mobilePhone,
                  installer_email: this.installer_email,
                  installer_website: this.installer_website,
                  installer_collectionPolicy: this.installer_collectionPolicy,
                  installer_emailInvoice: this.installer_emailInvoice,
                  installer_billingAddressOnly: this.installer_billingAddressOnly,
                  installer_fax: this.installer_fax
                });
              }
              else {
                temp.push(value[i]);
              }
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

            this.storage.set("customers", temp);
            this.app.getRootNav().setRoot(CustomersPage)
          }
        });
      }
      else {
        console.log("Else 2")
        let d = new Date();
        this.customersProvider.addCustomer(
          {
            subscriberName: this.subscriberName,
            city: this.insuredAreaCity,
            visible: true,
            draft: true,
            publishedDate: d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()),
            enabled: null
          }
        );

        this.getDataStorage().then((value) => {

          let temp = value;

          console.log("Local Storage customers before", value);

          if (temp != null) {
            console.log("If 1");
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
              enabled: null,
              draft: true,
              installer_name: this.installer_name,
              installer_afm: this.installer_afm,
              installer_proffesionalDescription: this.installer_proffesionalDescription,
              installer_insuredAreaAddress: this.installer_insuredAreaAddress,
              installer_insuredAreaCity: this.installer_insuredAreaCity,
              installer_insuredAreaPostCode: this.installer_insuredAreaPostCode,
              installer_insuredAreaFloor: this.installer_insuredAreaFloor,
              installer_landlinePhone: this.installer_landlinePhone,
              installer_mobilePhone: this.installer_mobilePhone,
              installer_email: this.installer_email,
              installer_website: this.installer_website,
              installer_collectionPolicy: this.installer_collectionPolicy,
              installer_emailInvoice: this.installer_emailInvoice,
              installer_billingAddressOnly: this.installer_billingAddressOnly,
              installer_fax: this.installer_fax
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
            console.log("Else 3");
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
              installer_name: this.installer_name,
              installer_afm: this.installer_afm,
              installer_proffesionalDescription: this.installer_proffesionalDescription,
              installer_insuredAreaAddress: this.installer_insuredAreaAddress,
              installer_insuredAreaCity: this.installer_insuredAreaCity,
              installer_insuredAreaPostCode: this.installer_insuredAreaPostCode,
              installer_insuredAreaFloor: this.installer_insuredAreaFloor,
              installer_landlinePhone: this.installer_landlinePhone,
              installer_mobilePhone: this.installer_mobilePhone,
              installer_email: this.installer_email,
              installer_website: this.installer_website,
              installer_collectionPolicy: this.installer_collectionPolicy,
              installer_emailInvoice: this.installer_emailInvoice,
              installer_billingAddressOnly: this.installer_billingAddressOnly,
              installer_fax: this.installer_fax
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
        this.app.getRootNav().setRoot(CustomersPage);
      }
    }
  }
}
