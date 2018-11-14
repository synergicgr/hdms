import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomersPage } from '../../pages/customers/customers';
import { Storage } from '@ionic/storage';

@Injectable()
export class CustomersProvider {

  public enabled: boolean = true;
  public disabled: boolean = false;
  public subscriberName:string;
  public installerName:string;
  public customerPass:string;
  public customerAuxiliaryPass:string;

  customers: Array<{ name: string, surname: string, city: string, visible: boolean, draft: boolean, publishedDate: string, enabled: boolean }> = [
    // {name:'Γρηγόρης', surname:'Σαμαράς', city:'Αθήνα', visible:true, draft:true, publishedDate:"", enabled:true}, 
    // {name:'Χάρης', surname:'Γεωργακόπουλος', city:'Θεσσαλονίκη', visible:true, draft:true, publishedDate:"", enabled:true},
    // {name:'Ελένη', surname:'Ψαθά', city:'Χαλάνδρι', visible:true, draft:false, publishedDate:"2018-11-07", enabled:true},
  ];

  phoneNotices: Array<{ name: string, phone: string, editable: boolean }> = [];

  constructor(public http: HttpClient, private storage: Storage) {
    this.storage.get('customers').then((value) => {
      if (value) {
        value.forEach(element => {
          let name = element.subscriberName.split(" ")[0];
          let surname = element.subscriberName.split(" ")[1];
          let city = element.insuredAreaCity;
          let visible = true;
          let draft = false;
          let publishedDate = element.publishedDate;
          let enabled = element.enabled;

          this.customers.push({ name: name, surname: surname, city: city, visible: visible, draft: draft, publishedDate: publishedDate, enabled: enabled });
        });
        console.log('Local storage customers', value);
      }
    });

    console.log('Service Provider customers', this.customers);
  }

  getCustomers(): Array<{ name: string, surname: string, city: string, visible: boolean, draft: boolean, publishedDate: string, enabled: boolean }> {
    return this.customers;
  }

  public doSort(code: number): void {
    if (code == 1) {
      this.customers.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        else {
          return -1;
        }
      });
    }
    else if (code === 2) {
      this.customers.sort(function (a, b) {
        if (a.name < b.name) {
          return 1;
        }
        else {
          return -1;
        }
      });
    }
    else if (code === 3) {
      this.customers.sort(function (a, b) {
        if (a.city > b.city) {
          return 1;
        }
        else {
          return -1;
        }
      });
    }
    else if (code === 4) {
      this.customers.sort(function (a, b) {
        if (a.city < b.city) {
          return 1;
        }
        else {
          return -1;
        }
      });
    }
  }

  public addCustomer(customer): void {
    console.log("Customer to add ", customer);
    this.customers.push(customer);
  }

  public delete(data): void {
    let index = 0;
    for (let i = 0; i < this.customers.length; i++) {
      console.log("data name ", data.name, " data surname ", data.surname);
      console.log("Customer: ", this.customers[i].name, " ", this.customers[i].surname);
      if (this.customers[i].name === data.name && this.customers[i].surname === data.surname) {
        index = i;
      }
    }

    console.log("Index to delete ", index);

    this.customers.splice(index, 1);
  }

  public setEnabled(enabled): void {
    this.enabled = enabled;
  }

  public setDisabled(disabled) {
    this.disabled = disabled;
  } 
  
  setSubscriber(name):void
  {
    this.subscriberName = name;
  }

  setInstallerName(name):void{
    this.installerName = name;
  }
  
  setCustomerPass(pass):void{
    this.customerPass = pass;
  }

  setCustomerAuxiliaryPass(pass):void{
    this.customerAuxiliaryPass = pass;
  }

  setPhoneNotices(phoneNotices:Array<{ name: string, phone: string, editable: boolean }>):void{
    this.phoneNotices = phoneNotices;
  }
}
