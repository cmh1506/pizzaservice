import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../shared/order.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: []
})
export class OrderComponent implements OnInit {

  constructor(public service: OrderService) { }

  ngOnInit(): void {
    this.resetForm();
  }
  resetForm(form?:NgForm){
    if(form != null)
      form.resetForm();
    this.service.formData = {
      id: 0,
      orderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      customerID: 0,
      pMethod: 'huhu',
      gTotal: 0,
      deletedOrderItemIDs: 'huhu'
    }

  }
}
