import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Platform, Events, AlertController } from 'ionic-angular';
import { SortPopOverPage } from '../sort-pop-over/sort-pop-over';
import { CustomersProvider } from '../../providers/customers/customers';
import { DashboardPage } from '../dashboard/dashboard';
import { CustomerInfoPage } from '../customer-info/customer-info';
import { PopOverPage } from '../pop-over/pop-over';
import { templateJitUrl } from '@angular/compiler';

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
  searchInput:string;

  customers: Array<{ name: string, surname: string, city: string, visible:boolean }>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private popOverController: PopoverController,
    private customersProvider: CustomersProvider,
    private platform: Platform,
    private events:Events,
    private alertCtrl:AlertController
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

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Προσθήκη πελάτη',
      inputs: [
        {
          name: 'name',
          placeholder: 'Όνομα'
        },
        {
          name: 'surname',
          placeholder: 'Επίθετο',
        },
        {
          name: 'city',
          placeholder: 'Πόλη',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {

          }
        },
        {
          text: 'Προσθηκη',
          handler: data => {
            this.customersProvider.addCustomer({name:data.name, surname:data.surname, city:data.city});
          }
        }
      ]
    });
    alert.present();
  }

  onInput(event):void{
    let value = event.target.value;

    for(let i = 0; i < this.customers.length; i++)
    {
      if(value === "")
      {
        this.customers[i].visible = true;
      }
      else if(this.customers[i].name.startsWith(value) || this.customers[i].surname.startsWith(value) || this.customers[i].city.startsWith(value))
      {
        this.customers[i].visible = true;
      }
      else{
        this.customers[i].visible = false;
      }
    }
  }

  onCancel(event):void{
    for(let i = 0; i < this.customers.length; i++)
    {
      this.customers[i].visible = true;
    }
  }

  getVisibleCustomersCount(){
    let count = 0;

    for(let i = 0; i < this.customers.length; i++)
    {
      if(this.customers[i].visible === true)
      {
        count += 1;
      }
    }

    return count;
  }

  public getVisibleCustomers(){
    let temp = [];

    for(let i = 0; i < this.customers.length; i++)
    {
      if(this.customers[i].visible === true)
      {
        temp.push(this.customers[i]);
      }
    }

    return temp;
  }
}
