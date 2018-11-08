import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomersPage } from '../../pages/customers/customers';
import { visitAll } from '@angular/compiler';

@Injectable()
export class CustomersProvider {

  customers:Array<{name: string, surname: string, city: string, visible:boolean, draft:boolean}> = [
    {name:'Γρηγόρης', surname:'Σαμαράς', city:'Αθήνα', visible:true, draft:true}, 
    {name:'Χάρης', surname:'Γεωργακόπουλος', city:'Θεσσαλονίκη', visible:true, draft:true},
    {name:'Ελένη', surname:'Ψαθά', city:'Χαλάνδρι', visible:true, draft:false},
   ];

  constructor(public http: HttpClient) {
    console.log('Hello CustomersProvider Provider');
  }

  getCustomers():Array<{name: string, surname: string, city: string, visible:boolean, draft:boolean}>{
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
