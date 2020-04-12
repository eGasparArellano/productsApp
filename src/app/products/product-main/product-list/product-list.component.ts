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
  monitoredProducts = [];
  searchString: string;

  constructor(private router: Router, private productsService: ProductsService) {
    // Get url
    this.monitoredMode = (this.router.url === '/monitoreo') ? true : false;

    // Get products depending on the source
    if (this.monitoredMode) {
      this.products = this.productsService.getMonitoredProducts();
    }
    else {
      this.products = this.productsService.getProducts();
    }

    // Subscribe to products
    this.productsService.productsSubject.subscribe((newData) => {
      if (!this.monitoredMode) {
        this.products = newData;
      }
    });

    // Subscribe to monitored products
    this.productsService.monitoredProductsSubject.subscribe((newData) => {
      if (this.monitoredMode) {
        this.products = newData;
      }
    });
  }

  ngOnInit(): void {
  }

  searchProducts(): void {
    if (this.monitoredMode) {
      this.products = this.productsService.getMonitoredProducts();
    }
    else {
      this.products = this.productsService.getProducts();
    }

    this.products = this.products.filter((product) => {
      return  product.nombre.toUpperCase().includes(this.searchString.toUpperCase()) ||
              product.descripcion.toUpperCase().includes(this.searchString.toUpperCase());
    });
  }

  updateMonitoredProduct(monitoredProduct) {
    let searchedProduct = this.monitoredProducts.findIndex((product) => product.uid == monitoredProduct.uid);

    if (searchedProduct == -1) {
      if (monitoredProduct.checked == true) {
        this.monitoredProducts.push(monitoredProduct);
      }
    }
    else {
      if (monitoredProduct.checked == false) {
        this.monitoredProducts.splice(searchedProduct, 1);
      }
    }
  }

  updateMonitoredProducts() {
    this.productsService.updateMonitoredProducts(this.monitoredProducts);
  }

  deleteProduct(productUid) {
    if (this.monitoredMode) {
      this.productsService.deleteMonitoredProduct(productUid);
    }
    else {
      this.productsService.deleteProduct(productUid);
    }
  }
}
