import { IBuyer, TBuyerErrors } from "../../types";
export class Customer {
  private customerData: IBuyer = {
    payment: "",
    email: "",
    phone: "",
    address: "",
  };
  //сохранение данных в модели
  saveCustomerData(data: Partial<IBuyer>): void {
    this.customerData = { ...this.customerData, ...data };
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
  validateCustomerData(): TBuyerErrors {
    const errors: { [key: string]: string } = {};
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
    return errors;
  }
}
