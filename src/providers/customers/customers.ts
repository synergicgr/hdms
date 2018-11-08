import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomersPage } from '../../pages/customers/customers';

/*
  Generated class for the CustomersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomersProvider {

  customers:Array<{name: string, surname: string, city: string}> = [
    {name:'Γρηγόρης', surname:'Σαμαράς', city:'Αθήνα'}, 
    {name:'Χάρης', surname:'Γεωργακόπουλος', city:'Θεσσαλονίκη'},
    {name:'Ελένη', surname:'Ψαθά', city:'Χαλάνδρι'},
   ];

  constructor(public http: HttpClient) {
    console.log('Hello CustomersProvider Provider');
  }

  getCustomers():Array<{name: string, surname: string, city: string}>{
    return this.customers;
  }

  public doSort(code:number):void{    
    if(code == 1)
    {
      this.customers.sort(function(a,b){
        if(a.name > b.name)
        {
          return 1;
        }
        else{
          return -1;
        }
      });
    }
    else if(code === 2)
    {
      this.customers.sort(function(a,b){
        if(a.name < b.name)
        {
          return 1;
        }
        else{
          return -1;
        }
      });
    }
    else if(code === 3)
    {
      this.customers.sort(function(a,b){
        if(a.city > b.city)
        {
          return 1;
        }
        else{
          return -1;
        }
      });
    }
    else if(code === 4)
    {
      this.customers.sort(function(a,b){
        if(a.city < b.city)
        {
          return 1;
        }
        else{
          return -1;
        }
      });
    }     
  }

  public addCustomer(customer):void{
    this.customers.push(customer);
  }
}
