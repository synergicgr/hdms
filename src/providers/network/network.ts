import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';

/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkProvider {

  online: boolean;

  constructor(private network: Network) {
    console.log('Hello NetworkProvider Provider');

    if(network.type != "none")
    {
      this.online = true;
    }
    else{
      this.online = false;
    }

    this.network.onConnect().subscribe(() => {
      this.online = true;
    });

    this.network.onDisconnect().subscribe(() => {
      this.online = false;
    });
  }

  public isOnline():boolean{    
    return this.online == true;
  }
}
