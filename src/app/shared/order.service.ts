import { Injectable } from '@angular/core';
import {Order} from "./order.model";
import {OrderItem} from "./order-item.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "./customer.service";
import {Customer} from "./customer.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData!: Order;
  orderItems!: OrderItem[];
  customers!: Customer[];

  constructor(private http: HttpClient, private cs: CustomerService) { }

  saveOrUpdateOrder(){
    for (let item of this.orderItems){
      item.orderId = this.formData.id
    }
    var body = {
      id: this.formData.id,
      customerId: this.formData.customerId,
      pMethod: this.formData.pMethod,
      gTotal: this.formData.gTotal,
      orderItems: this.orderItems
    }
    return this.http.post(environment.apiURL + "addOrder", body);
  }

  getOrderList(): Observable<Order[]> {
    return this.http.get<Order[]>(environment.apiURL + "orders");
  }

}
