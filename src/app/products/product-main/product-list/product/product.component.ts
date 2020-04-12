import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/products/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() monitoredMode: boolean;
  @Input() product: Product;
  @Output() monitoredProduct = new EventEmitter();
  @Output() delete = new EventEmitter();
  monitored: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  updateMonitoredProduct(): void {
    this.monitoredProduct.emit({uid: this.product.uid, checked: this.monitored});
  }

  deleteProduct() {
    this.delete.emit(this.product.uid);
  }

}
