import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Platform, Events, AlertController, MenuController, App } from 'ionic-angular';
import { SortPopOverPage } from '../sort-pop-over/sort-pop-over';
import { CustomersProvider } from '../../providers/customers/customers';
import { DashboardPage } from '../dashboard/dashboard';
import { CustomerInfoPage } from '../customer-info/customer-info';
import { PopOverPage } from '../pop-over/pop-over';
import { templateJitUrl, unescapeIdentifier } from '@angular/compiler';
import { Storage, StorageConfigToken } from '@ionic/storage';

@IonicPage()
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

  customers: Array<{ name: string, surname: string, city: string, visible: boolean, draft: boolean, publishedDate: string, enabled: boolean }>;

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

  }

  ngOnInit() {
    this.customers = this.customersProvider.getCustomers();

    this.popover = this.popOverController.create(SortPopOverPage, [], { cssClass: 'ion-popover' });
    this.popover2 = this.popOverController.create(PopOverPage);

    this.events.subscribe('dismiss', (data, time) => {
      this.popover.dismiss();
    });

    this.events.subscribe('dismiss2', (data, time) => {
      this.popover2.dismiss();
    });

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
    let count = 0;
    let enabled = this.customersProvider.enabled;
    let disabled = this.customersProvider.disabled;

    for (let i = 0; i < this.customers.length; i++) {
      if (this.customers[i].enabled == true && enabled == true && this.customers[i].visible == true) {
        count += 1;
      }
      else if (this.customers[i].enabled == false && disabled == true && this.customers[i].visible == true) {
        count += 1;
      }
    }

    return count;
  }

  public getVisibleCustomers() {
    let temp = [];

    let enabled = this.customersProvider.enabled;
    let disabled = this.customersProvider.disabled;

    for (let i = 0; i < this.customers.length; i++) {

      if (this.customers[i].enabled == true && enabled == true && this.customers[i].visible == true) {
        temp.push(this.customers[i]);
      }
      else if (this.customers[i].enabled == false && disabled == true && this.customers[i].visible == true) {
        temp.push(this.customers[i]);
      }

      // if (this.customers[i].visible === true) {
      //   temp.push(this.customers[i]);
      // }
    }

    return temp;
  }

  public goToNewCustomer(): void {
    this.navCtrl.push(CustomerInfoPage);
  }

  handleClick(event) {
    // console.log(event.target.id);
    // if (event.target.id == "filter") {
    //   this.openPopOver1 = true;
    // }
    // else if (event.target.id == "account") {
    //   this.openPopOver2 = true;
    // }
  }

  onPageWillLeave() {
    this.events.unsubscribe('dismiss', () => { });
    this.events.unsubscribe('dismiss2', () => { });
  }
}
