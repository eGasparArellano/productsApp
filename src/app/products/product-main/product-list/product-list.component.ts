import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../Product';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  monitoredMode: boolean;
  products: Product[] = [];

  constructor(private router: Router, private productsService: ProductsService) {
    // Get url
    this.monitoredMode = (this.router.url === '/monitoreo') ? true : false;

    // Get products
    this.products = this.productsService.getProducts();

    // Subscribe to products
    this.productsService.productsSubject.subscribe((newData) => {
      this.products = newData;
    });

  }

  ngOnInit(): void {
  }

}
