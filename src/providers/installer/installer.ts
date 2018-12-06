import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the InstallerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InstallerProvider {

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

  constructor(public http: HttpClient) {
  }

  saveName(name): void {
    this.name = name;
  }

  saveAFM(afm): void {
    this.afm = afm;
  }

  saveProfDescription(proffesionalDescription): void {
    this.proffesionalDescription = proffesionalDescription;
  }

  saveAddrNum(insuredAreaAddress): void {
    this.insuredAreaAddress = insuredAreaAddress;
  }

  saveCity(insuredAreaCity): void {
    this.insuredAreaCity = insuredAreaCity;
  }

  savePostCode(insuredAreaPostCode): void {
    this.insuredAreaPostCode = insuredAreaPostCode;
  }

  saveFloor(insuredAreaFloor): void {
    this.insuredAreaFloor = insuredAreaFloor;
  }

  saveLandline(landlinePhone): void {
    this.landlinePhone = landlinePhone;
  }

  saveMobile(mobilePhone): void {
    this.mobilePhone = mobilePhone;
  }

  saveEmail(email): void {
    this.email = email;

  }

  saveWebsite(website): void {
    this.website = website;
  }

  saveCollection(collectionPolicy): void {
    this.collectionPolicy = collectionPolicy;
  }

  saveEmailInvoice(emailInvoice): void {
    this.emailInvoice = emailInvoice;
  }

  saveBilling(billingAddressOnly): void {
    this.billingAddressOnly = billingAddressOnly;
  }

  saveFax(fax): void {
    this.fax = fax;
  }
}
