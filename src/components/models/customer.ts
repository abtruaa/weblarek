import { IBuyer, TPayment } from "../../types";
export class Customer {
  private customerData: {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
  } = { payment: "", email: "", phone: "", address: "" };
  //сохранение данных в модели
  saveCustomerData(data: {
    payment?: TPayment;
    email?: string;
    phone?: string;
    address?: string;
  }): void {
    this.customerData = { ...this.customerData, ...data };
  }
  //получение всех данных покупателя
  getAllCustomerData(): IBuyer | null {
    if (!this.customerData) {
      console.log("Данные покупателя еще не были сохранены");
      return null;
    } else {
      return { ...this.customerData };
    }
  }
  //очистка данных покупателя
  clearCustomerData(): void {
    this.customerData = { payment: "", email: "", phone: "", address: "" };
    console.log("Данные покупателя удалены.");
  }
  //валидация данных покупателя
  validateCustomerData(): { [key: string]: string } {
    const data = this.customerData;
    const errors: { [key: string]: string } = {};
    // Валидация способа оплаты
    const validPaymentMethods = ["card", "online", ""];
    if (!validPaymentMethods.includes(data.payment)) {
      errors.payment = `Не выбран способ оплаты.`;
    }

    // Валидация адреса
    if (data.address.trim() === "") {
      errors.address = "Не указан адрес доставки.";
    }

    // Валидация email и телефона
    if (data.email.trim() === "") {
      errors.email = "Не указана почта.";
    }

    // Валидация телефона
    if (data.phone.trim() === "") {
      errors.phone = "Не указан телефон.";
    }
    return errors;
  }
}
