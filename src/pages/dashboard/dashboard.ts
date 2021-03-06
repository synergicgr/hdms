import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform, PopoverController, Events, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NotesPage } from '../notes/notes';
import { NotificationsPage } from '../notifications/notifications';
import { PopOverPage } from '../pop-over/pop-over';
import { NetworkProvider } from '../../providers/network/network';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  showNotification: boolean = false;
  public barChartOptions: any = {
    legend: { display: false },
    scaleShowVerticalLines: false,
    responsive: true
  };

  //Chart Labels
  public barChartLabels: string[] = ['Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ', 'Κυρ'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  notificationIcon: string = 'ios-arrow-dropright';
  notesIcon: string = 'ios-arrow-dropdown';

  private popover;
  open: boolean;

  //Chart data
  public barChartData: any[] = [
    { data: [2, 2, 5, 5, 2, 3, 2], label: "Ημέρες" },
  ];

  barChartColors: any[] = [
    {
      backgroundColor: 'rgba(6, 6, 57, 1)',
      borderWidth: 0
    },

  ]

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public menuCtrl: MenuController,
    private platform: Platform,
    private events: Events,
    private networkProvider:NetworkProvider,
    private toastCtrl: ToastController) {
    this.menuCtrl.enable(true, 'menu');

    events.subscribe('logout', (user, time) => {
      this.logout();
    });


    platform.registerBackButtonAction(() => {
      if (this.open === true) {
        this.popover.dismiss();
        this.open = false;
      }
      else {
        navCtrl.setRoot(HomePage);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  ionViewWillEnter() { 
    // this.menuCtrl.enable(true, "menu"); 
  }

  public goToNotes(): void {
    this.navCtrl.setRoot(NotesPage);
  }

  public goToNotifications(): void {
    this.navCtrl.setRoot(NotificationsPage);
  }

  presentPopover(myEvent) {
    this.popover = this.popoverCtrl.create(PopOverPage);
    this.popover.present({
      ev: myEvent,
    });
    this.open = true;
  }

  logout(): void {
    this.navCtrl.setRoot(HomePage);
  }

  goToDashboard():void{
    this.navCtrl.setRoot(DashboardPage);
  }

  displayConnectionToast():void{

    let message = "";
    if(this.networkProvider.isOnline())
    {
      message = "You are in online mode!!!";
    }
    else{
      message = "You are in offline mode!!!";
    }

    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle',
      cssClass: "toast"
    });

    toast.present();
  }
}
