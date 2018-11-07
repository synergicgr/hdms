import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Platform, Events } from 'ionic-angular';
import { SortPopOverPage } from '../sort-pop-over/sort-pop-over';
import { CustomersProvider } from '../../providers/customers/customers';
import { DashboardPage } from '../dashboard/dashboard';
import { CustomerInfoPage } from '../customer-info/customer-info';
import { PopOverPage } from '../pop-over/pop-over';


@IonicPage()
@Component({
  selector: 'page-customers',
  templateUrl: 'customers.html',
})
export class CustomersPage {

  private popover;
  private popover2;
  openPopOver1: boolean;
  openPopOver2: boolean;

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

    events.subscribe('dismiss2', (data, time) => {
      this.popover2.dismiss();
    });

    this.customers = customersProvider.getCustomers();

    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        if (this.openPopOver1 === true) {
          this.popover.dismiss();
          this.openPopOver1 = false;
        }
        else if(this.openPopOver2 === true)
        {
          this.popover2.dismiss();
          this.openPopOver2 = false;
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
    this.openPopOver1 = true;
  }

  presentPopover2(myEvent){
    this.popover2 = this.popOverController.create(PopOverPage);
    this.popover2.present({
      ev: myEvent
    });
    this.openPopOver2 = true;
  }

  openCustomer(index:number):void{
    console.log("Customer ", this.customers[index].name);
    this.navCtrl.push(CustomerInfoPage, this.customers[index]);
  }
}
