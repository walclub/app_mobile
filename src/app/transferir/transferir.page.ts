import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { InfoService } from '../services/info.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Transaction, Contact } from '../models/transaction';
import numeral from 'numeral';

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.page.html',
  styleUrls: ['./transferir.page.scss'],
})

export class TransferirPage{
  contacts = [];
  transaction: Transaction;
  information = null;
  numberFrom = null;
  numberTo = null;
  amount = null;
  saldo = 0;
  contact: Contact;
  message = {
    success: false,
    error: false
  };
  constructor(
    private apiService: ApiService,
    private infoService: InfoService,
    private router: Router,
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    const defaultNumber = this.apiService.getNumberTo()
    this.contacts = [
      {name: 'Daniela Jeldres', number: defaultNumber, code: 56},
      {name: 'Joaquin ', number: defaultNumber, code: 56},
      {name: 'Santiago Larrain', number: defaultNumber, code: 56},
      {name: 'Homero ', number: defaultNumber, code: 56}
    ]
    this.contact = this.contacts[1];
    this.apiService.consultarPoints().subscribe( data => {
      if (data["success"] === false) {
        this.saldo = 0;
      } else {
        this.saldo = numeral(data["message"]).format('0,0')
      }
    });
  }

  transferir() {
    this.setDefaultParams();
    this.transaction = {amount: this.amount, from: this.contact, to: this.contact, name: 'op 1'};
    this.apiService.transferPoint(this.contact.number, this.amount).subscribe(
      response => {
        console.log(response);
        this.message.success = true;
        this.apiService.consultarPoints().subscribe(
        data => {
          this.saldo = data['message']
          this.infoService.setTransactionInfo(this.transaction);
          this.router.navigate(['confirm-transfer']);
        });
      }, error => this.message.error = true
    );
  }

  setDefaultParams() {
    this.message.error = false;
    this.message.success = false;
  }
}
