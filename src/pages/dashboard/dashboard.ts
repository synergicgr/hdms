import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform, PopoverController, Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NotesPage } from '../notes/notes';
import { NotificationsPage } from '../notifications/notifications';
import { PopOverPage } from '../pop-over/pop-over';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
    { data: [66, 55, 83, 82, 56, 51, 43], label: "Ημέρες" },
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
    private events: Events) {
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
}
