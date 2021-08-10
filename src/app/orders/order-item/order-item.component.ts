import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderItem} from "../../shared/order-item.model";

import {NgForm} from "@angular/forms";
import {ItemService} from "../../shared/item.service";
import {Item} from "../../shared/item.model";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: []
})
export class OrderItemComponent implements OnInit {
  formData!: OrderItem;
  itemList:  Item[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OrderItemComponent>,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.itemService.getItemList().subscribe(res => this.itemList = res)
    this.formData = {
      id: 1,
      orderID: this.data.orderID,
      itemID: 0,
      price: 0,
      quantity: 0,
      itemName: "",
      total: 0
    }
  }

}
