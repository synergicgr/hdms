import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Platform, Events, AlertController, MenuController, App } from 'ionic-angular';
import { SortPopOverPage } from '../sort-pop-over/sort-pop-over';
import { CustomersProvider } from '../../providers/customers/customers';
import { DashboardPage } from '../dashboard/dashboard';
import { CustomerInfoPage } from '../customer-info/customer-info';
import { PopOverPage } from '../pop-over/pop-over';
import { Storage } from '@ionic/storage';
import { Facebook } from 'ionic-native';

// @IonicPage()
@Component({
  selector: 'page-customers',
  templateUrl: 'customers.html',
})
export class CustomersPage implements OnInit {

  private popover;
  private popover2;
  openPopOver1: boolean = false;
  openPopOver2: boolean = false;
  searchInput: string;

  customers: Array<{ name: string, surname: string, city: string, visible: boolean, draft: boolean, publishedDate: string, enabled: boolean }> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private popOverController: PopoverController,
    private customersProvider: CustomersProvider,
    private platform: Platform,
    private events: Events,
    private alertCtrl: AlertController,
    private storage: Storage,
    private menuCtrl: MenuController,
  ) {
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        
        console.log("Back button popOver1:", this.openPopOver1, " popOver2:", this.openPopOver2);
        if (this.openPopOver1 === true) {
          this.popover.dismiss();
        }
        else if (this.openPopOver2 === true) {
          this.popover2.dismiss();
        }
        else {
          this.navCtrl.setRoot(DashboardPage);
        }
      });
    });
  }

  ngOnInit() {    

    let enabled = this.customersProvider.enabled;
    let disabled = this.customersProvider.disabled;
    let ordering = this.customersProvider.order;

    // this.customers = this.customersProvider.getCustomers();
    if (this.navParams.get("back") != null) {
      // this.customers = this.customersProvider.getCustomers();
      // console.log('In navparams check');

      console.log('In go back');
      
      this.storage.get("customers").then((value) => {
        this.customers = [];
        if (value) {
          value.forEach(element => {
            if ((element.enabled == true && enabled == true) || (element.enabled == false && disabled == true) || (element.draft == true)) {
              this.customers.push({ name: element.subscriberName.split(" ")[0], surname: element.subscriberName.split(" ")[1], city: element.insuredAreaCity, visible: true, draft: element.draft, publishedDate: element.datePublished, enabled: element.enabled });
            }
            else {
              this.customers.push({ name: element.subscriberName.split(" ")[0], surname: element.subscriberName.split(" ")[1], city: element.insuredAreaCity, visible: false, draft: element.draft, publishedDate: element.datePublished, enabled: element.enabled });
            }
          });
        }
        this.customersProvider.setCustomers(this.customers);
      });
    }
    else {
      this.customers = this.customersProvider.getCustomers();

      // for (let i = 0; i < this.customers.length; i++) {
      //   if (this.customers[i].enabled == true && enabled == true) {
      //     this.customers[i].visible = true;
      //   }
      //   else if (this.customers[i].enabled == false && disabled == true) {
      //     this.customers[i].visible = true;
      //   }
      //   else if (this.customers[i].draft == true) {
      //     this.customers[i].visible = true;
      //   }
      //   else {
      //     this.customers[i].visible = false;
      //   }
      // }
    }
    console.log('On init');

    // if (ordering == "nameAZ") {
    //   this.customersProvider.doSort(1);
    // }
    // else if (ordering == "nameZA") {
    //   this.customersProvider.doSort(2);
    // }
    // else if (ordering == "cityAZ") {
    //   this.customersProvider.doSort(3);
    // }
    // else if (ordering == "cityZA") {
    //   this.customersProvider.doSort(4);
    // }

    this.popover = this.popOverController.create(SortPopOverPage, {}, { cssClass: 'ion-popover' });
    this.popover2 = this.popOverController.create(PopOverPage);

    this.events.subscribe('dismiss', (data, time) => {
      this.popover.dismiss();
    });

    this.events.subscribe('dismiss2', (data, time) => {
      this.popover2.dismiss();
    });    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomersPage');
  }

  presentPopover(myEvent) {
    this.popover.present({
      ev: myEvent
    });
    this.openPopOver1 = true;
    this.popover.onDidDismiss(() => {
      this.openPopOver1 = false;
    });
  }

  presentPopover2(myEvent) {

    this.popover2.present({
      ev: myEvent
    });
    this.openPopOver2 = true;
    this.popover2.onDidDismiss(() => {
      this.openPopOver2 = false;
    })

  }

  openCustomer(index: number): void {
    console.log("Customer ", this.customers[index].name);
    this.navCtrl.push(CustomerInfoPage, this.customers[index]);
  }

  onInput(event): void {
    let value = event.target.value;
    let enabled = undefined;
    let disabled = undefined;

    this.customers = this.readCustomers(value);

    enabled = this.customersProvider.enabled;
    disabled = this.customersProvider.disabled;

    for (let i = 0; i < this.customers.length; i++) {
      if ((value === "" && this.customers[i].enabled == true && enabled == true) || (value === "" && this.customers[i].enabled === false && disabled == true)) {
        this.customers[i].visible = true;
      }
      else if (
        (
          (this.customers[i].name.startsWith(value)
            || this.customers[i].surname.startsWith(value)
            || this.customers[i].city.startsWith(value)
          )
          && this.customers[i].enabled == true
          && enabled == true
        )
        ||
        (
          (this.customers[i].name.startsWith(value)
            || this.customers[i].surname.startsWith(value)
            || this.customers[i].city.startsWith(value)
          )
          && this.customers[i].enabled == false
          && disabled == true
        )
      ) {
        this.customers[i].visible = true;
      }
      else {
        this.customers[i].visible = false;
      }
    }
    
    this.customersProvider.setCustomers(this.customers);
  }

  onCancel(event): void {
    event.target.value = "";
    this.onInput(event);
  }

  onClear(event): void {
    event.target.value = "";
    this.onInput(event);
  }

  getVisibleCustomersCount() {
    // let count = 0;
    // let enabled = this.customersProvider.enabled;
    // let disabled = this.customersProvider.disabled;

    // for (let i = 0; i < this.customers.length; i++) {
    //   if (this.customers[i].enabled == true && enabled == true && this.customers[i].visible == true) {
    //     count += 1;
    //   }
    //   else if (this.customers[i].enabled == false && disabled == true && this.customers[i].visible == true) {
    //     count += 1;
    //   }
    //   else if (this.customers[i].draft == true) {
    //     count += 1;
    //   }
    // }

    // return count;

    return this.getVisibleCustomers().length;
  }

  public getVisibleCustomers() {

    let enabled = this.customersProvider.enabled;
    let disabled = this.customersProvider.disabled;

    let temp = [];

    this.customers = this.customersProvider.getCustomers();

    this.customers.forEach(element => {
      if (element.enabled == true && enabled == true) {
        element.visible = true;
        temp.push(element);
      }
      else if (element.enabled == false && disabled == true) {
        element.visible = true;
        temp.push(element);
      }
      else if (element.draft == true) {
        element.visible = true;
        temp.push(element);
      }      
    }
    );

    this.customers = temp;

    // this.customersProvider.setCustomers(temp);

    return temp;
  }

  public goToNewCustomer(): void {
    this.navCtrl.push(CustomerInfoPage);
  }

  onPageWillLeave() {
    this.events.unsubscribe('dismiss', () => { });
    this.events.unsubscribe('dismiss2', () => { });
  }

  readCustomers(searchString): Array<{ name: string, surname: string, city: string, visible: boolean, draft: boolean, publishedDate: string, enabled: boolean }> {
    let enabled = this.customersProvider.enabled;
    let disabled = this.customersProvider.disabled;

    let temp = [];
    this.storage.get("customers").then((value) => {
      if (value) {
        value.forEach(element => {
          if (element.subscriberName.split(" ")[0].startsWith(searchString) || element.subscriberName.split(" ")[1].startsWith(searchString) || element.insuredAreaCity.startsWith(searchString)) {
            if((element.enabled == true && enabled == true) || (element.enabled == false && disabled == true) || element.draft == true)
            {
              temp.push({ name: element.subscriberName.split(" ")[0], surname: element.subscriberName.split(" ")[1], city: element.insuredAreaCity, visible: true, draft: element.draft, publishedDate: element.datePublished, enabled: element.enabled });
            }
            else{
              temp.push({ name: element.subscriberName.split(" ")[0], surname: element.subscriberName.split(" ")[1], city: element.insuredAreaCity, visible: false, draft: element.draft, publishedDate: element.datePublished, enabled: element.enabled });
            }
          }
        });
      }
    });
    return temp;
  }

  goToDashboard(): void {
    this.navCtrl.setRoot(DashboardPage);
  }
}
