import { Component } from '@angular/core';
import { NavController, MenuController, Platform } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { Storage } from '@ionic/storage';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Keyboard]
})
export class HomePage {

  rememberMe: boolean = false;
  username: string = "";
  password: string = "";

  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    private platform: Platform,
    private storage: Storage) {

    this.menuCtrl.enable(false, 'menu');

    platform.ready().then(() => {

      platform.registerBackButtonAction(() => {
        this.platform.exitApp();
      });

      storage.get('rememberMe').then((val) => {
        if (val === true) {
          this.rememberMe = val;
          storage.get('username').then((storageUsername) => { this.username = storageUsername });
          storage.get('password').then((storagePassword) => { this.password = storagePassword });
        }
        else {
          this.username = "";
          this.password = "";
          this.rememberMe = false;
        }
      });
    });
  }

  signIn() {
    // this.storage.clear();
    if (this.rememberMe == true) {
      this.storage.set('rememberMe', true);
      this.storage.set('username', this.username);
      this.storage.set('password', this.password);
    }
    else {
      this.storage.set('rememberMe', false);
    }
    
    this.navCtrl.setRoot(DashboardPage, {}, {animate:true, animation:'android-transition', duration:500, direction:'back'});
  }

  forgotPassword() {
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      Keyboard.disableScroll(true);
    });
  }

  ionViewWillLeave() {
    this.platform.ready().then(() => {
      Keyboard.disableScroll(false);
    });
  }

  moveFocus(nextElement): void {
    nextElement.setFocus();
  }
}
