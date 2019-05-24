import {Observable} from "rxjs";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



interface consultarPointsResult {
  points: number;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  base = "https://codeception.yumsys.com"
  numeroFrom =  977434824
  numeroTo =  977434825

  options = {
    headers: {
    "Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
    "Access-Control-Allow-Origin":"*",
    "access-control-allow-methods":"GET,POST,PUT",
    "Content-Type": "application/json"
    }
  };
  constructor(private http: HttpClient) { }

  getProducts() {
    // let header: HttpHeaders = new HttpHeaders();
    // header = header.set('Authorization', ('Token ' + auth));
    // header = header.append("Content-Type", "application/json");
    return this.http.get(`${this.base}/products`, this.options).toPromise();
  }

  getNumberTo():number {
    return this.numeroTo
  }

  transferPoint(numberTo, amount) {
    // let header: HttpHeaders = new HttpHeaders();
    // header = header.set('Authorization', ('Token ' + auth));
    // header = header.append("Content-Type", "application/json");
    const data = {
      amount: parseInt(amount),
      phoneNumberDestination: {code: 56, number: parseInt(numberTo)},
      phoneNumberOrigin: {code: 56, number: this.numeroFrom}
    };
    return this.http.post(`${this.base}/transfer`, data, this.options);
  }

  consultarPoints() {
    // let header: HttpHeaders = new HttpHeaders();
    // header = header.set('Authorization', ('Token ' + auth));
    // header = header.append("Content-Type", "application/json");
    return this.http.get(`${this.base}/users/${this.numeroFrom}/points`, this.options);
  }

  async saveToken( token) {
    const data = {
      token,
      "phoneNumber": this.numeroFrom
    }
    console.log(data)
    const result = await this.http.post(`${this.base}/tokens`, data, this.options).toPromise();
    console.log(result)
  }
}
