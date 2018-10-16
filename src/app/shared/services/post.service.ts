import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(protected http: HttpClient) { }
  baseUrl = 'http://localhost:9000';

  getAllPosts() {
    return this.http.get<any>(this.baseUrl + '/posts');
  }
  getAllTodos() {
    return this.http.get<any>(this.baseUrl + '/todos');
  }

  getAllCars() {
   return [
        {year: 1997, maker: 'Ford', model: 'E350', desc: 'ac, abs, moon', price: 3000.00},
        {year: 1999, maker: 'Chevy', model: 'Venture "Extended Edition"', price: 4900.00},
        {year: 1999, maker: 'Checy', model: 'Venture "Extended Edition, Very Large"', price: 5000.00},
        {year: 1996, maker: 'Jeep', model: 'Grand Cherokee', desc: 'air, moon roof, loaded', price: 4799.00}
      ];
  }
}
