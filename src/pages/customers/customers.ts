import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Platform, Events } from 'ionic-angular';
import { SortPopOverPage } from '../sort-pop-over/sort-pop-over';
import { CustomersProvider } from '../../providers/customers/customers';
import { DashboardPage } from '../dashboard/dashboard';
import { CustomerInfoPage } from '../customer-info/customer-info';


@IonicPage()
@Component({
  selector: 'page-customers',
  templateUrl: 'customers.html',
})
export class CustomersPage {

  private popover;
  private static popOverController;
  open: boolean;

  customers: Array<{ name: string, surname: string, city: string }>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private popOverController: PopoverController,
    customersProvider: CustomersProvider,
    platform: Platform,
    private events:Events
    ) {

    events.subscribe('dismiss', (data, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.popover.dismiss();
    });
    this.customers = customersProvider.getCustomers();

    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        if (this.open === true) {
          this.popover.dismiss();
          this.open = false;
        }
        else {
          navCtrl.setRoot(DashboardPage);
        }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomersPage');
  }

  presentPopover(myEvent) {
    this.popover = this.popOverController.create(SortPopOverPage, [], {cssClass: 'ion-popover'});
    this.popover.present({
      ev: myEvent
    });
    this.open = true;
  }

  openCustomer(index:number):void{
    console.log("Customer ", this.customers[index].name);
    this.navCtrl.push(CustomerInfoPage, this.customers[index]);
  }
}
