import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderItem} from "../../shared/order-item.model";

import {NgForm} from "@angular/forms";
import {ItemService} from "../../shared/item.service";
import {Item} from "../../shared/item";
import {Hero} from "../../shared/hero";
import {HeroService} from "../../shared/hero.service";
import {OrderService} from "../../shared/order.service";

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
    private itemService: ItemService,
    private heroService: HeroService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.itemService.getItemList().subscribe((itemList: Item[]) => this.itemList = itemList);
    if(this.data.orderItemIndex == null){
      this.formData = {
        id: 0,
        orderId: this.data.orderId,
        itemId: 0,
        price: 0,
        quantity: 0,
        itemName: "Fuck you",
        total: 0
      }
    } else {
      this.formData = Object.assign({}, this.orderService.orderItems[this.data.orderItemIndex]);
    }

  }

  updatePrice(ctrl: number) {
    if (ctrl == 0) {
      this.formData.price = 0;
      this.formData.itemName = '';
    }
    else {
      this.formData.price = this.itemList[ctrl - 1].price;
      this.formData.itemName = this.itemList[ctrl - 1].name;
    }
    //this.updateTotal();
  }
  updateTotal(){
    this.formData.total = parseFloat((this.formData.quantity * this.formData.price).toFixed(2));
  }

  onSubmit(form: NgForm){
    if(!this.validateForm(form.value)) return;
    if (this.data.orderItemIndex == null)
      this.orderService.orderItems.push(form.value);
    else
      this.orderService.orderItems[this.data.orderItemIndex] = form.value
    this.dialogRef.close();
  }
  validateForm(formData: OrderItem){
    return !(formData.itemId == 0 || formData.quantity == 0);
  }
}
