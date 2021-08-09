import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../shared/order.service";
import {NgForm} from "@angular/forms";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {OrderItemComponent} from "../order-item/order-item.component";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: []
})
export class OrderComponent implements OnInit {

  constructor(public service: OrderService,
              private dialog: MatDialog) { }

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
    };
    this.service.orderItems = [];
  }

  addOrEditOrderItem(orderItemIndex: number = 1, orderId: number = 1){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { orderItemIndex, orderId };
    this.dialog.open(OrderItemComponent, dialogConfig);
  }
}
