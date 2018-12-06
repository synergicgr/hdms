import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network/network';
import { InstallerProvider } from '../../providers/installer/installer';
import { DashboardPage } from '../dashboard/dashboard';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private networkProvider: NetworkProvider,
    private installerProvider: InstallerProvider,
    private storage: Storage) {
  }

  ionViewDidLoad() {
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
        this.fax = value.fax;
        this.email = value.email;
        this.website = value.website;
        this.collectionPolicy = value.collectionPolicy;
        this.emailInvoice = value.emailInvoice;
        this.billingAddressOnly = value.billingAddressOnly;
      }
    });
  }

  saveName(): void {
    this.installerProvider.saveName(this.name);
  }

  saveAFM(): void {
    this.installerProvider.saveAFM(this.afm);
  }

  saveProfDescription(): void {
    this.installerProvider.saveProfDescription(this.proffesionalDescription);
  }

  saveAddrNum(): void {
    this.installerProvider.saveAddrNum(this.insuredAreaAddress);
  }

  saveCity(): void {
    this.installerProvider.saveCity(this.insuredAreaCity);
  }

  savePostCode(): void {
    this.installerProvider.savePostCode(this.insuredAreaPostCode);
  }

  saveFloor(): void {
    this.installerProvider.saveFloor(this.insuredAreaFloor);
  }

  saveLandline(): void {
    this.installerProvider.saveLandline(this.landlinePhone);
  }

  saveMobile(): void {
    this.installerProvider.saveMobile(this.mobilePhone);
  }

  saveEmail(): void {
    this.installerProvider.saveEmail(this.email);
  }

  saveWebsite(): void {
    this.installerProvider.saveWebsite(this.website);
  }

  saveCollection(): void {
    this.installerProvider.saveCollection(this.collectionPolicy);
  }

  saveEmailInvoice(): void {
    this.installerProvider.saveEmailInvoice(this.emailInvoice);
  }

  saveBilling(): void {
    this.installerProvider.saveBilling(this.billingAddressOnly);
  }

  saveFax(): void {
    this.installerProvider.saveFax(this.fax);
  }

  save(): void {
    this.saveName();
    this.saveAFM();
    this.saveProfDescription();
    this.saveAddrNum();
    this.saveCity();
    this.savePostCode();
    this.saveFloor();
    this.saveLandline();
    this.saveMobile();
    this.saveEmail();
    this.saveWebsite();
    this.saveCollection();
    this.saveEmailInvoice();
    this.saveBilling();
    this.saveFax();

    this.storage.set('installer', {
      name: this.name,
      afm: this.afm,
      proffesionalDescription: this.proffesionalDescription,
      insuredAreaAddress: this.insuredAreaAddress,
      insuredAreaCity: this.insuredAreaCity,
      insuredAreaPostCode: this.insuredAreaPostCode,
      insuredAreaFloor: this.insuredAreaFloor,
      landlinePhone: this.landlinePhone,
      mobilePhone: this.mobilePhone,
      email: this.email,
      website: this.website,
      collectionPolicy: this.collectionPolicy,
      emailInvoice: this.emailInvoice,
      billingAddressOnly: this.billingAddressOnly,
      fax: this.fax
    });

    this.navCtrl.setRoot(DashboardPage);
  }
}
