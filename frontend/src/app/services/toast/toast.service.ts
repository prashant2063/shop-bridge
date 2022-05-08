import { Injectable, TemplateRef  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: Array<any>;

  constructor() { 
    this.toasts = [];
  }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  showUnsuccessfulToast(message: string){
    this.show(message, { classname: 'bg-danger text-light', delay: 2000 });
  }

  showSuccessToast(message: string) {
    this.show(message, { classname: 'bg-success text-light', delay: 2000 });
  }
}
