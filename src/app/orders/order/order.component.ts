import { Component, OnInit} from '@angular/core';
import {OrderService} from "../../shared/order.service";
import {NgForm} from "@angular/forms";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {OrderItemComponent} from "../order-item/order-item.component";
import {CustomerService} from "../../shared/customer.service";
import {Customer} from "../../shared/customer.model";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
  constructor(public service: OrderService,
              private dialog: MatDialog,
              private customerService: CustomerService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.resetForm();
    this.customerService.getCustomerList().then(res => this.service.customers = res as Customer[]);
  }
  resetForm(form?:NgForm){
    if(form != null)
      form.resetForm();
    this.service.formData = {
      id: 0,
      customerId: 0,
      customer: 'Paco Heinrich',
      pMethod: 'huhu',
      gTotal: 0,
      deletedOrderItemIds: 'huhu'
    };
    this.service.orderItems = [];
  }

  addOrEditOrderItem(orderItemIndex?: number, orderId?: number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { orderItemIndex, orderId };
    this.dialog.open(OrderItemComponent, dialogConfig).afterClosed().subscribe(res => this.updateGrandTotal());
  }

  onDeleteOrderItem(itemId: number, i: number){
    this.service.orderItems.splice(i, 1);
    this.updateGrandTotal();
  }

  updateGrandTotal(){
    this.service.formData.gTotal = parseFloat(this.service.orderItems.reduce((prev, curr) =>
      { return prev + curr.total }, 0).toFixed(2));
  }

  validateForm(){
    if(this.service.formData.customerId == 0)
      return false;
    if(this.service.orderItems.length == 0)
      return false;
    return true;
  }

  onSubmit(form: NgForm) {
    if(!this.validateForm())
      return;
    this.service.saveOrUpdateOrder().subscribe(res => {
        this.resetForm();
        this.toastr.success("Liebling, es ist aus.", "Stadt ohne Helden");
        this.router.navigate(['/orders'])
      }
    );
  }
}
