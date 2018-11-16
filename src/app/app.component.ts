import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events, ViewController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CustomersPage } from '../pages/customers/customers';
import { NotesPage } from '../pages/notes/notes';
import { ConnectionInfoPage } from '../pages/connection-info/connection-info';
import { TechAppPage } from '../pages/tech-app/tech-app';
import { ContactPage } from '../pages/contact/contact';
import { WebDealerPage } from '../pages/web-dealer/web-dealer';
import { UltraSyncAppPage } from '../pages/ultra-sync-app/ultra-sync-app';
import { HellasDmsPage } from '../pages/hellas-dms/hellas-dms';
import { Network } from '@ionic-native/network';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FileOpener } from '@ionic-native/file-opener'
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { DocumentViewer, DocumentViewerOptions} from '@ionic-native/document-viewer';
import { DashboardPage } from '../pages/dashboard/dashboard';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  online: boolean;
  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any, icon: string }>;
 

  constructor(
    private alertCtrl: AlertController,
    private network: Network,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private inAppBrowser: InAppBrowser,
    private fileOpener: FileOpener,
    private file: File,
    private filePath: FilePath,
    private document: DocumentViewer
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Hellas DMS', component: HellasDmsPage, icon: "assets/imgs/icon1.png" },
      { title: 'Οι πελατες μας', component: CustomersPage, icon: "assets/imgs/icon2.png" },
      { title: 'Σημειωσεις', component: NotesPage, icon: "assets/imgs/icon3.png" },
      { title: 'Πληροφοριες συνδεσης', component: ConnectionInfoPage, icon: "assets/imgs/icon4.png" },
      { title: 'Tech App', component: TechAppPage, icon: "assets/imgs/icon5.png" },
      { title: 'Επικοινωνια', component: ContactPage, icon: "assets/imgs/icon6.png" },
      { title: 'Web Dealer', component: WebDealerPage, icon: "assets/imgs/icon7.png" },
      { title: 'Ultra Sync App', component: UltraSyncAppPage, icon: "assets/imgs/icon8.png" },
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

  openPage(page, index) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    if (index == 4 || index == 6 || index == 7) {
      this.inAppBrowser.create("http://www.hellasdms.com/");
    }
    else {
      this.nav.setRoot(page.component);
    }
  }

  downloadPriceList(): void {
    console.log(this.file.applicationDirectory);

    this.file.copyFile(this.file.applicationDirectory+ 'www/assets/', 'HDMS.pdf', this.file.dataDirectory, 'HDMS.pdf');

    this.file.listDir(this.file.dataDirectory,'').then((listing) => {
      console.log(listing);
    });

    this.fileOpener.open(this.file.dataDirectory+'HDMS.pdf', 'application/pdf');
    
  }

  public isOnline(): boolean {
    return this.online == true;
  }

  public isOffline(): boolean {
    return this.online == false;
  }

  goToDashboard():void{
    this.nav.setRoot(DashboardPage);    
  }
}
