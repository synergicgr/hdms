import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';

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
  public barChartOptions:any = {
    legend:{display:false},
    scaleShowVerticalLines: false,
    responsive: true
  };

  //Chart Labels
  public barChartLabels:string[] = ['Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ', 'Κυρ'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  notificationIcon:string = 'ios-arrow-dropright';
  notesIcon:string = 'ios-arrow-dropdown';
 
  //Chart data
  public barChartData:any[] = [
    {data: [66, 55, 83, 82, 56, 51, 43], label:"Ημέρες"},
  ];

  barChartColors: any [] =[
    {
        backgroundColor:'rgba(6, 6, 57, 1)',
        borderWidth: 0
    },
    
]

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, private platform: Platform) {
    this.menuCtrl.enable(true, 'menu');

    platform.ready().then(()=>{
      platform.registerBackButtonAction(()=>{
        navCtrl.setRoot(HomePage);
      });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  ionViewWillEnter() { this.menuCtrl.enable(true, "menu"); }

  public toggle():void{
    if(this.showNotification == true)
    {
      this.notificationIcon = 'ios-arrow-dropright';
      this.notesIcon = 'ios-arrow-dropdown';      
    }
    else{
      this.notificationIcon = 'ios-arrow-dropdown';
      this.notesIcon = 'ios-arrow-dropright';
    }
    this.showNotification = !this.showNotification;    
  }
}
