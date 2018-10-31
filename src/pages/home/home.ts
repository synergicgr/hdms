import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  rememberMe: boolean = false;
  registerCredentials = { email: '', password: '' };

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
    this.menuCtrl.enable(false, 'menu');
  }

  signIn() {
    this.navCtrl.setRoot(DashboardPage);
  }

  signUp() {

  }

  forgotPassword() {

  }

}
