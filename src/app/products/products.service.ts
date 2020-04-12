import { Injectable } from '@angular/core';
import { Product, Especificacion } from './Product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[] = [];
  monitoredProducts = [];
  productsSubject = new BehaviorSubject<Product[]>([]);
  monitoredProductsSubject = new BehaviorSubject<any[]>([]);

  constructor() {
    this.products.push(
      new Product(1, 'Televisión', 'LG', 'TV plana de 69 pulgadas', 6999, 10, [
        new Especificacion('Tamaño', '60', 'pulgadas'),
        new Especificacion('Forma', 'Plana', 'NA'),
      ]),
      new Product(2, 'Computadora', 'HP', 'Pavilon color gris', 4999, 3, [
        new Especificacion('SO', 'Windows 10', 'NA'),
        new Especificacion('RAM', '4', 'GB'),
        new Especificacion('Memoria', '500', 'GB'),
        new Especificacion('Peso', '2', 'Kg'),
      ])
    );

    // Propagate changes
    this.productsSubject.next(this.getProducts());
  }

  getProducts() {
    return this.products.slice();
  }

  getMonitoredProducts() {
    let monitoredElements = [];

    this.monitoredProducts.forEach((product) => {
      monitoredElements.push(this.products.find(p => p.uid == product.uid));
    });

    return monitoredElements;
  }

  updateMonitoredProducts(monitoredProducts) {
    // Update monitored list
    this.monitoredProducts = monitoredProducts.slice();

    // Propagate changes of monitored list
    this.monitoredProductsSubject.next(this.getMonitoredProducts());
  }

  deleteProduct() {

  }

  deleteMonitoredProduct(uid) {
    // Find and delete element
    let searchedProduct = this.monitoredProducts.findIndex((product) => product.uid == uid);
    this.monitoredProducts.splice(searchedProduct, 1);

    // Propagate changes of monitored list
    this.monitoredProductsSubject.next(this.getMonitoredProducts());
  }

}
