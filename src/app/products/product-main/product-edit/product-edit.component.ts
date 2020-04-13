import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product, Especificacion } from '../../Product';
import { ProductsService } from '../../products.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  productUid: number;
  product: Product;
  brands: string[] = [];
  isNewProduct: boolean;
  @ViewChild('productForm') productForm: NgForm;
  espAttribute: string;
  espValue: string;
  espUnit: string;

  constructor(private router: Router, private route: ActivatedRoute, private productsService: ProductsService) { 
    // Get url
    this.isNewProduct = (this.router.url === '/products/new') ? true : false;
    this.brands = this.productsService.getProductBrands();
  }

  ngOnInit(): void {
    if (this.isNewProduct) {
      this.product = new Product(0, '', '', '', 0, 0, []);
    }
    else {
      this.route.params.subscribe(params => this.productUid = params.id);
      this.product = this.productsService.getProductById(this.productUid);
      if (this.product === undefined) {
        this.router.navigate(['/404']);
      }
    }
  }

  addSpecification() {
    if (this.espAttribute != '' && this.espValue != '' && this.espUnit != '') {
      let specification = new Especificacion(this.espAttribute, this.espValue, this.espUnit);
      this.product.especificacion.push(specification);

      this.espAttribute = '';
      this.espValue = '';
      this.espUnit = '';
    }
  }

  deleteSpecification(attribute) {
    let searchedSpecification = this.product.especificacion.findIndex((s) => s.atributo == attribute);
    this.product.especificacion.splice(searchedSpecification, 1);
  }

  processForm(form: NgForm) {
    if (this.isNewProduct) {
      this.productsService.addProduct(this.product);
    }
    else {
      this.productsService.updateProduct(this.product);
    }
    this.router.navigate(['/products']);
  }

  cancelForm() {
    this.router.navigate(['/products']);
  }

}
