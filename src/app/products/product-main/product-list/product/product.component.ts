import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../Product';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  updateMonitoredProduct(): void {
    this.monitoredProduct.emit({uid: this.product.uid, checked: this.monitored});
  }

  goToEditProduct() {
    this.router.navigate(['/products/' + this.product.uid + '/edit']);
  }

  goToProductDetail() {
    this.router.navigate(['/products/' + this.product.uid]);
  }

  deleteProduct() {
    this.delete.emit(this.product.uid);
  }

}
