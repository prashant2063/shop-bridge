import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products/products.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.css']
})
export class ModifyProductComponent implements OnInit {
  product: Product

  constructor(private productsService: ProductsService, private router: Router, private toastService: ToastService) { 
    this.product = {} as Product;
  }

  ngOnInit(): void {
    this.product = this.productsService.getProduct();
    console.log(this.product)
    this.productsService.setProduct({} as Product)
  }

  onSubmit(modifyProductForm: NgForm){
    this.productsService.modifyProduct({...modifyProductForm.value, _id: this.product._id})
    .subscribe({
      next: (data) => {
        this.toastService.showSuccessToast("Product modified successfully.");
        this.router.navigate(['/products'])
      },
      error: (err) => {
        console.log(err)
        this.toastService.showUnsuccessfulToast("Unable to modify product.");
      },
      complete: () => {
        console.log("Data modified successfully")
      }
    })
  }
}
