import { Component, OnInit } from '@angular/core';
import {OrderService} from "../shared/order.service";
import {Item} from "../shared/item";
import {Order} from "../shared/order.model";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: []
})
export class OrdersComponent implements OnInit {
  orderList: Order[] = [];

  constructor(private service: OrderService) { }

  ngOnInit(): void {
    this.service.getOrderList().subscribe((orderList: Order[]) => this.orderList = orderList );
  }

}
