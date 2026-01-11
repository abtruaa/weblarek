import { IBuyer, FormErrors } from "../../types";
import { IEvents } from "../base/Events";
export class Customer {
  private customerData: IBuyer = {
    payment: "",
    email: "",
    phone: "",
    address: "",
  };
  protected formErrors: FormErrors = {};
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  //сохранение данных в модели
  saveCustomerData(data: Partial<IBuyer>): void {
    this.customerData = { ...this.customerData, ...data };
    this.checkValidity();
    this.events.emit("customer:changed", this.customerData);
  }
  
  //получение всех данных покупателя
  getAllCustomerData(): IBuyer {
    return { ...this.customerData };
  }
  
  //очистка данных покупателя
  clearCustomerData(): void {
    this.customerData = { payment: "", email: "", phone: "", address: "" };
    this.formErrors = {};
    this.events.emit("customer:changed", this.customerData);
    this.events.emit("formErrors:change", {});
  }
  
  setOrderField(field: keyof IBuyer, value: string): void {
    this.customerData[field] = value.trim();    
    this.checkValidity();
}

private checkValidity(): void {
    // Разделяем ошибки по формам
    const orderErrors = this.validateOrderForm();
    const contactErrors = this.validateContactForm();
    this.formErrors = { ...orderErrors, ...contactErrors };
        
    this.events.emit("formErrors:change", this.formErrors);
    this.events.emit("order:validation", { 
        isValid: Object.keys(orderErrors).length === 0 
    });
    this.events.emit("contacts:validation", { 
        isValid: Object.keys(contactErrors).length === 0 
    });
}
  
  validateOrderForm(): FormErrors {
    const errors: FormErrors = {};    
    const payment = this.customerData.payment.trim();
    const address = this.customerData.address.trim();
    
    const validPaymentMethods = ["card", "cash"];
    
    
    if (!validPaymentMethods.includes(payment)) {
        errors.payment = `Не выбран способ оплаты.`;
    }

    if (address === "") {
        errors.address = "Не указан адрес доставки.";
    }
    return errors;
  }
  
  validateContactForm(): FormErrors {
    const errors: FormErrors = {};    
    const email = this.customerData.email.trim();
    const phone = this.customerData.phone.trim();
        
    if (email === "") {
        errors.email = "Не указана почта.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Некорректный формат email.";
    }

    if (phone === "") {
        errors.phone = "Не указан телефон.";
    }
    return errors;
  }
  
  isOrderFormValid(): boolean {
    const errors = this.validateOrderForm();
    return Object.keys(errors).length === 0;
  }
  
  isContactsFormValid(): boolean {
    const errors = this.validateContactForm();
    return Object.keys(errors).length === 0;
  }
  
  validateCustomerData(): boolean {
    const orderErrors = this.validateOrderForm();
    const contactErrors = this.validateContactForm();
    return Object.keys(orderErrors).length === 0 && 
           Object.keys(contactErrors).length === 0;
  }
  
  // Метод для получения ошибок
  getErrors(): FormErrors {
    return { ...this.formErrors };
  }
}
