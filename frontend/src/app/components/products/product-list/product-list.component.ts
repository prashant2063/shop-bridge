import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/interfaces/pagination';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products/products.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Array<Product>
  pagination: Pagination
  pages: Array<number>

  constructor(private productService: ProductsService, private toastService: ToastService, private router: Router) { 
    this.products = []
    this.pagination = {
      page: 1,
      pageSize: 10,
      collectionSize: 0
    }
    this.pages = [];
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProductList(this.pagination)
    .subscribe({
      next: (data: any) => {
        this.products = data.content as Array<Product>
        this.pagination.collectionSize = data.collectionSize as number;
      },
      error: (err) => console.error("error: ",err),
      complete: () => console.info('fetched product list') 
    });
  }

  deleteProductHandler(_id: string){
    if(confirm("Are you sure, you want to delete the product")){
      console.log("delete")
      this.productService.deleteProduct(_id)
      .subscribe({
        next: (data: any) => {
          if(data.deletedCount){
            this.toastService.showSuccessToast("Product successfully deleted.");
            this.resetPage()
          }
        },
        error: (err)=>{
          this.toastService.showUnsuccessfulToast("Unable to delete product");
        }
      })
    }
  }

  resetPage(){
    this.pagination.page = 1;
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }

  modifyProduct(product: Product){
    this.productService.setProduct(product)
    this.router.navigate(['/products/modify'])
  }

  getProductDetails(product: Product){
    this.productService.setProduct(product)
    this.router.navigate(['/products/detail'])
  }
}
