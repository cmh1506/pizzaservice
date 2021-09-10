export class Order {
  id!: number;
  customerId!: number;
  customer!: string;
  pMethod!: string;
  gTotal!: number;
  deletedOrderItemIds!: string;
}
