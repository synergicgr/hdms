import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController, ViewController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CustomersPage } from '../pages/customers/customers';
import { NotesPage } from '../pages/notes/notes';
import { ConnectionInfoPage } from '../pages/connection-info/connection-info';
import { TechAppPage } from '../pages/tech-app/tech-app';
import { ContactPage } from '../pages/contact/contact';
import { WebDealerPage } from '../pages/web-dealer/web-dealer';
import { UltraSyncAppPage } from '../pages/ultra-sync-app/ultra-sync-app';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { HellasDmsPage } from '../pages/hellas-dms/hellas-dms';
import { ContactFormPage } from '../pages/contact-form/contact-form';
import { GoogleMapsPage } from '../pages/google-maps/google-maps';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PopOverPage } from '../pages/pop-over/pop-over';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HellasDmsPage,
    CustomersPage,
    NotesPage,
    ConnectionInfoPage,
    TechAppPage,
    ContactPage,
    WebDealerPage,
    UltraSyncAppPage,
    DashboardPage,
    ContactFormPage,
    GoogleMapsPage,
    PopOverPage
  ],
  imports: [
    BrowserModule,    
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false } ),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HellasDmsPage,
    CustomersPage,
    NotesPage,
    ConnectionInfoPage,
    TechAppPage,
    ContactPage,
    WebDealerPage,
    UltraSyncAppPage,
    DashboardPage,
    ContactFormPage,
    GoogleMapsPage,
    PopOverPage
  ],
  providers: [
    Network,
    StatusBar,
    SplashScreen,
    InAppBrowser,
    PopOverPage,
    NativePageTransitions,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
