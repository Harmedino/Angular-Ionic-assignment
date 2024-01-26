import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OrdersService } from '../../orders/orders.service';

@Component({
  selector: 'app-checkout-modal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './checkout-modal.component.html',
})
export class CheckoutModalComponent {
  @Input() showModal: boolean = false;

  constructor(private orderService: OrdersService) {}

  closeModal() {
    this.showModal = false;
  }
}
