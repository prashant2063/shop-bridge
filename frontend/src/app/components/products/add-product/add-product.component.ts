import { Component, OnInit, ɵresetCompiledComponents } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private productsService: ProductsService, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  onSubmit(addProductForm: NgForm){
    this.productsService.addProduct(addProductForm.value)
    .subscribe({
      next: (data) => {
        this.toastService.showSuccessToast("Product created successfully.");
        this.router.navigate(['/products'])
      },
      error: (err) => {
        this.toastService.showUnsuccessfulToast("Unable to create new product.");
      },
      complete: () => {
        console.log("Data added successfully")
      }
    })
  }
}
