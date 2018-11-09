import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomersPage } from '../../pages/customers/customers';
import { visitAll } from '@angular/compiler';

@Injectable()
export class CustomersProvider {

  customers:Array<{name: string, surname: string, city: string, visible:boolean, draft:boolean, publishedDate:string}> = [
    {name:'Γρηγόρης', surname:'Σαμαράς', city:'Αθήνα', visible:true, draft:true, publishedDate:""}, 
    {name:'Χάρης', surname:'Γεωργακόπουλος', city:'Θεσσαλονίκη', visible:true, draft:true, publishedDate:""},
    {name:'Ελένη', surname:'Ψαθά', city:'Χαλάνδρι', visible:true, draft:false, publishedDate:"2018-11-07"},
   ];

  constructor(public http: HttpClient) {
    console.log('Hello CustomersProvider Provider');
  }

  getCustomers():Array<{name: string, surname: string, city: string, visible:boolean, draft:boolean, publishedDate:string}>{
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

  public delete(data):void{
    let index = 0;
    for(let i = 0; i < this.customers.length; i++)
    {
      console.log("data name ",data.name, " data surname ", data.surname);
      console.log("Customer: ",this.customers[i].name," ",this.customers[i].surname);
      if(this.customers[i].name === data.name && this.customers[i].surname === data.surname)
      {
        index = i;
      }
    }

    console.log("Index to delete ", index);

    this.customers.splice(index, 1);
  }
}
