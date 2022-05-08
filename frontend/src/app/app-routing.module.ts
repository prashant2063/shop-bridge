import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ModifyProductComponent } from './components/products/modify-product/modify-product.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';

const routes: Routes = [
  {path: 'products', component: ProductListComponent},
  {path: 'products/add', component: AddProductComponent},
  {path: 'products/modify', component: ModifyProductComponent},
  {path: 'products/detail', component: ProductDetailComponent},
  {path: '**', redirectTo: 'products'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
