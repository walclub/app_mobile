import { Component } from '@angular/core';
import { ApiService } from './../services/api.service'
import numeral from 'numeral';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  saldo;
  scheduled = [];

  constructor(private apiService:ApiService) {
    this.initializeApp();
  }
  
  ionViewWillEnter(){
    this.initializeApp()
  }

  async initializeApp() {
    this.apiService.consultarPoints().subscribe( data => {
      if (data["success"] == false){
        this.saldo = 0
      }else {
        this.saldo = numeral(data["message"]).format('0,0')
      }
    })
  }

  milesNumeros(numero) {
    const result = numero.toString().replace(/(\d)(?:(?=\d+(?=[^\d.]))(?=(?:[0-9]{3})+\b)|(?=\d+(?=\.))(?=(?:[0-9]{3})+(?=\.)))/g, "$1,");
    console.log(result, numero)
    return result
};
}
