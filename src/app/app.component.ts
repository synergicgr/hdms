import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CustomersPage } from '../pages/customers/customers';
import { NotesPage } from '../pages/notes/notes';
import { ConnectionInfoPage } from '../pages/connection-info/connection-info';
import { TechAppPage } from '../pages/tech-app/tech-app';
import { ContactPage } from '../pages/contact/contact';
import { WebDealerPage } from '../pages/web-dealer/web-dealer';
import { UltraSyncAppPage } from '../pages/ultra-sync-app/ultra-sync-app';
import { HellasDmsPage } from '../pages/hellas-dms/hellas-dms';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Hellas DMS', component: HellasDmsPage},
      {title: 'Οι πελατες μας', component: CustomersPage},
      {title: 'Σημειωσεις', component: NotesPage},
      {title: 'Πληροφοριες συνδεσης', component: ConnectionInfoPage},
      {title: 'Tech App', component: TechAppPage},
      {title: 'Επικοινωνια', component: ContactPage},
      {title:'Web Dealer', component: WebDealerPage}, 
      {title: 'Ultra Sync App', component: UltraSyncAppPage},     
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  downloadPriceList():void{
    
  }
}
