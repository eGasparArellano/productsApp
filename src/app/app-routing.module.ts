import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductMainComponent } from './products/product-main/product-main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductEditComponent } from './products/product-main/product-edit/product-edit.component';
import { ProductDetailComponent } from './products/product-main/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-main/product-list/product-list.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductMainComponent, children: [
    {path: '', component: ProductListComponent},
    {path: 'new', component: ProductEditComponent},
    {path: ':id', component: ProductDetailComponent},
    {path: ':id/edit', component: ProductEditComponent}
  ]},
  {path: 'monitoreo', component: ProductMainComponent, children: [
    {path: '', component: ProductListComponent},
  ]},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
