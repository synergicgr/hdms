import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomersPage } from '../../pages/customers/customers';
import { Storage } from '@ionic/storage';
import { NotesPage } from '../../pages/notes/notes';


@Injectable()
export class CustomersProvider {

  public enabled: boolean = true;
  public disabled: boolean = false;
  public subscriberName: string = "";
  public installerName: string = "";
  public customerPass: string = "";
  public customerAuxiliaryPass: string = "";
  public customerDuressCode: string = "";
  public customerConnectionDate: string = "";
  public customerInsuredAreaAddress: string = "";
  public customerInsuredAreaCity: string = "";
  public customerInsuredAreaPostCode: string = "";
  public customerInsuredAreaFloor: string = "";
  public customerInsuredAreaDescription: string = "";
  public customerInsuredAreaType: string = "";
  public customerInsuredAreaTypeOther: string = "";
  public customerAreaPhone: string = "";
  public customerAlarmUnitType: string = "";
  public customerFormat: string = "";
  public customerFrequency24HourTest: number = 0;
  public customerWeeklyTimeMonitoring: string = "";
  public customerPoliceStation: string = "";
  public customerDirectTransmissionPhones: string = "";
  public customerOperationControlHours: string = "";
  public customerMonthlyAlarmList: string = "";
  public customerOtherRemarks: string = "";

  customers: Array<{ subscriberName: string, city: string, visible: boolean, draft: boolean, publishedDate: string, enabled: boolean }> = [
    // {name:'Γρηγόρης', surname:'Σαμαράς', city:'Αθήνα', visible:true, draft:true, publishedDate:"", enabled:true}, 
    // {name:'Χάρης', surname:'Γεωργακόπουλος', city:'Θεσσαλονίκη', visible:true, draft:true, publishedDate:"", enabled:true},
    // {name:'Ελένη', surname:'Ψαθά', city:'Χαλάνδρι', visible:true, draft:false, publishedDate:"2018-11-07", enabled:true},
  ];

  phoneNotices: Array<{ name: string, phone: string, editable: boolean }> = [];
  zones: Array<{ name: string, id: string, editable: boolean }> = [];
  alarmUsers: Array<{ username: string, name: string, editable: boolean }> = [];
  notes: Array<{ showDate: string, title: string, content: string, status:string }> = [];

  order: string = "none";

  constructor(public http: HttpClient, private storage: Storage) {
    this.storage.get('customers').then((value) => {
      if (value) {
        value.forEach(element => {         
          let subscriberName = element.subscriberName;
          let city = element.insuredAreaCity;
          let visible = true;
          let draft = element.draft;
          let publishedDate = element.datePublished;
          let enabled = element.enabled;

          this.customers.push({ subscriberName:subscriberName, city: city, visible: visible, draft: draft, publishedDate: publishedDate, enabled: enabled });
        });
        console.log('Local storage customers', value);
      }
    });


    this.storage.get('notes').then((value) => {
      if (value) {
        this.notes = value;
      }
    });

    console.log('Service Provider customers', this.customers);
  }

  setOrder(order): void {
    this.order = order;
  }

  setCustomers(customers): void {
    this.customers = customers;
  }

  getCustomers(): Array<{ subscriberName: string, city: string, visible: boolean, draft: boolean, publishedDate: string, enabled: boolean }> {
    return this.customers;
  }

  public doSort(code: number): void {
    if (code == 1) {
      this.customers.sort(function (a, b) {
        if (a.subscriberName > b.subscriberName) {
          return 1;
        }
        else {
          return -1;
        }
      });
    }
    else if (code === 2) {
      this.customers.sort(function (a, b) {
        if (a.subscriberName < b.subscriberName) {
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

  public sortNotes(code:number):void
  {
    if(code == 1)
    {
      this.notes.sort(
        function(a,b){
          if(a.title > b.title)
          {
            return 1;
          }
          else{
            return -1;
          }
      });
    }
    else if(code == 2)
    {
      this.notes.sort(
        function(a,b){
          if(a.title < b.title)
          {
            return 1;
          }
          else{
            return -1;
          }
        }
      )
    }
    else if(code == 3)
    {
      this.notes.sort(
        function(a,b){
          let aTemp = a.showDate.split('-').reverse().join('');
          let bTemp = b.showDate.split('-').reverse().join('');
          return aTemp > bTemp ? 1 : aTemp < bTemp ? -1 : 0;
        }
      )
    }
    else if(code == 4)
    {
      this.notes.sort(
        function(a,b){
          let aTemp = a.showDate.split('-').reverse().join('');
          let bTemp = b.showDate.split('-').reverse().join('');
          return aTemp < bTemp ? 1 : aTemp > bTemp ? -1 : 0;
        }
      )
    }
  }

  public addCustomer(customer): void {
    console.log("Customer to add ", customer);
    this.customers.push(customer);
  }

  public delete(data): void {
    let index = 0;
    for (let i = 0; i < this.customers.length; i++) {
      if (this.customers[i].subscriberName === data.subscriberName ) {
        console.log("Found customer to delete at index ", i);
        index = i;
      }
    }

    console.log("Index to delete ", index);

    this.customers.splice(index, 1);
  }

  public setEnabled(enabled): void {
    this.enabled = enabled;

    let temp = [];

    this.storage.get('customers').then((value) => {
      if (value) {
        value.forEach(element => {
          if (element.enabled == true && enabled == true) {
            temp.push({ subscriberName: element.subscriberName, city: element.insuredAreaCity, visible: true, draft: element.draft, publishedDate: element.datePublished, enabled: element.enabled });
          }
          else if (element.enabled == false && this.disabled == true) {

            temp.push({ subscriberName: element.subscriberName, city: element.insuredAreaCity, visible: true, draft: element.draft, publishedDate: element.datePublished, enabled: element.enabled });
          }
          else if (element.enabled == null) {
            temp.push({ subscriberName:element.subscriberName, city: element.insuredAreaCity, visible: true, draft: element.draft, publishedDate: element.datePublished, enabled: element.enabled });
          }
          else {
            temp.push({ subscriberName:element.subscriberName, city: element.insuredAreaCity, visible: false, draft: element.draft, publishedDate: element.datePublished, enabled: element.enabled });
          }
        });
      }
    });

    this.setCustomers(temp);
  }

  public setDisabled(disabled) {
    this.disabled = disabled;

    let temp = [];
    this.storage.get('customers').then((value) => {
      if (value) {
        value.forEach(element => {
          if ((element.enabled == true && this.enabled == true) || element.enabled == null) {
            temp.push({ subscriberName:element.subscriberName, city: element.insuredAreaCity, visible: true, draft: element.draft, publishedDate: element.datePublished, enabled: element.enabled });
          }
          else if ((element.enabled == false && this.disabled == true) || element.enabled == null) {
            temp.push({ subscriberName:element.subscriberName, city: element.insuredAreaCity, visible: true, draft: element.draft, publishedDate: element.datePublished, enabled: element.enabled });
          }
        });
      }
    });

    this.setCustomers(temp);
  }

  setSubscriber(name): void {
    this.subscriberName = name;
  }

  setInstallerName(name): void {
    this.installerName = name;
  }

  setCustomerPass(pass): void {
    this.customerPass = pass;
  }

  setCustomerAuxiliaryPass(pass): void {
    this.customerAuxiliaryPass = pass;
  }

  setCustomerDuressCode(code): void {
    this.customerDuressCode = code;
  }

  setCustomerConnectionDate(date): void {
    this.customerConnectionDate = date;
  }

  setCustomerInsuredAreaAddress(address): void {
    this.customerInsuredAreaAddress = address;
  }

  setCustomerInsuredAreaCity(city): void {
    this.customerInsuredAreaCity = city;
  }

  setCustomerInsuredAreaPostCode(code): void {
    this.customerInsuredAreaPostCode = code;
  }

  setCustomerInsuredAreaFloor(floor): void {
    this.customerInsuredAreaFloor = floor;
  }

  setCustomerInsuredAreaDescription(description): void {
    this.customerInsuredAreaDescription = description;
  }

  setCustomerInsuredAreaType(type): void {
    this.customerInsuredAreaType = type;
  }

  setCustomerInsuredAreaTypeOther(other): void {
    this.customerInsuredAreaTypeOther = other;
  }

  setCustomerAreaPhone(phone): void {
    this.customerAreaPhone = phone;
  }

  setCustomerAlarmUnitType(type): void {
    this.customerAlarmUnitType = type;
  }

  setCustomerFormat(format): void {
    this.customerFormat = format;
  }

  setCustomerFrequency24HourTest(frequencyTest): void {
    this.customerFrequency24HourTest = frequencyTest;
  }

  setCustomerWeeklyTimeMonitoring(weeklyTimeMonitoring): void {
    this.customerWeeklyTimeMonitoring = weeklyTimeMonitoring;
  }

  setCustomerPoliceStation(station): void {
    this.customerPoliceStation = station;
  }

  setCustomerDirectTransmissionPhones(phones): void {
    this.customerDirectTransmissionPhones = phones;
  }

  setCustomerOperationControlHours(hours): void {
    this.customerOperationControlHours = hours;
  }

  setCustomerMonthlyAlarmList(list): void {
    this.customerMonthlyAlarmList = list;
  }

  setCustomerOtherRemarks(remarks): void {
    this.customerOtherRemarks = remarks;
  }

  setPhoneNotices(phoneNotices: Array<{ name: string, phone: string, editable: boolean }>): void {
    this.phoneNotices = phoneNotices;
  }

  setZones(zones: Array<{ name: string, id: string, editable: boolean }>): void {
    this.zones = zones;
  }

  setAlarmUsers(alarmUsers: Array<{ username: string, name: string, editable: boolean }>): void {
    this.alarmUsers = alarmUsers;
  }

  setNotes(notes) {
    this.notes = notes;
  }

  addNote(note) {
    this.notes.push(note);
    this.storage.set('notes', this.notes);
  }

  deleteNote(note): void {
    let indexFound = undefined;
    this.notes.forEach(function (element, index) {
      if (note.title == element.title && note.content == element.content && note.showDate == element.showDate) {
        indexFound = index;
      }
    }
    );

    this.deleteNoteAt(indexFound);
  }

  deleteNoteAt(index): void {
    this.notes.splice(index, 1);
    this.storage.set('notes', this.notes);
  }

  getNotes(): Array<{ showDate: string, title: string, content: string, status:string }> {
    return this.notes;
  }

  setCustomerEnabled(subscriberName, enabled): void {
    this.customers.forEach(element => {
      if (element.subscriberName == subscriberName) {
        element.enabled = enabled;
      }
    });
  }

  getCustomer(subscriberName:string): any {    

    for(let i = 0; i < this.customers.length; i++)
    {
      if (this.customers[i].subscriberName == subscriberName) {
        console.log("CUSTOMER FOUND");
        return this.customers[i];
      }
    }    
  }

  replaceDraft(customer): void {

    for(let i = 0; i < this.customers.length; i++)
    {
      if (this.customers[i].subscriberName == customer.subscriberName) {
        this.customers[i] = customer;
      }
    }
  }
}
