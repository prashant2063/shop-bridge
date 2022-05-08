import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products/products.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product

  constructor(private productService: ProductsService, private router: Router, private toastService: ToastService) { 
    this.product = {} as Product;
  }

  ngOnInit(): void {
    this.product = this.productService.getProduct();
    this.productService.setProduct({} as Product);
  }

  modifyProduct(product: Product){
    this.productService.setProduct(product)
    this.router.navigate(['/products/modify'])
  }

  deleteProductHandler(_id: string){
    if(confirm("Are you sure, you want to delete the product")){
      console.log("delete")
      this.productService.deleteProduct(_id)
      .subscribe({
        next: (data: any) => {
          if(data.deletedCount){
            this.toastService.showSuccessToast("Product successfully deleted.");
            this.router.navigate(['/products'])
          }
        },
        error: (err)=>{
          this.toastService.showUnsuccessfulToast("Unable to delete product");
        }
      })
    }
  }
}
