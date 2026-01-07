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

  setOrderField(field: keyof IBuyer, value: string): void {
    this.customerData[field] = value;
    this.events.emit("order:change");
    if (this.validateCustomerData()) {
      this.events.emit("order:ready", this.customerData);
    }
  }

  //сохранение данных в модели
  saveCustomerData(data: Partial<IBuyer>): void {
    this.customerData = { ...this.customerData, ...data };
    this.events.emit("customer:updated", this.customerData);
  }
  //получение всех данных покупателя
  getAllCustomerData(): IBuyer {
    if (!this.customerData) {
      console.log("Данные покупателя еще не были сохранены");
    }
    return { ...this.customerData };
  }
  //очистка данных покупателя
  clearCustomerData(): void {
    this.customerData = { payment: "", email: "", phone: "", address: "" };
    console.log("Данные покупателя удалены.");
  }
  //валидация данных покупателя
  validateCustomerData() {
    const errors: typeof this.formErrors = {};
    // Валидация способа оплаты
    const validPaymentMethods = ["card", "online"];
    if (!validPaymentMethods.includes(this.customerData.payment)) {
      errors.payment = `Не выбран способ оплаты.`;
    }

    // Валидация адреса
    if (this.customerData.address.trim() === "") {
      errors.address = "Не указан адрес доставки.";
    }

    // Валидация email и телефона
    if (this.customerData.email.trim() === "") {
      errors.email = "Не указана почта.";
    }

    // Валидация телефона
    if (this.customerData.phone.trim() === "") {
      errors.phone = "Не указан телефон.";
    }
    this.formErrors = errors;
    this.events.emit("formErrors:change", this.formErrors);
    return Object.keys(errors).length === 0;
  }
}
