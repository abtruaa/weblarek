import { IBuyer } from "../../types";
export class Customer {
  private customerData: IBuyer | null = null;
  //сохранение данных в модели
  public saveCustomerData(data: IBuyer): void {
    const isValid = this.validateCustomerData(data);
    if (isValid) {
      this.customerData = { ...data };
      console.log("Данные покупателя успешно сохранены");
    } else {
      console.log("Данные не удалось сохранить :(");
    }
  }
  //получение всех данных покупателя
  public getAllCustomerData(): IBuyer | null {
    if (!this.customerData) {
      console.log("Данные покупателя еще не были сохранены");
      return null;
    } else {
      return { ...this.customerData };
    }
  }
  //очистка данных покупателя
  public clearCustomerData(): void {
    this.customerData = null;
    console.log("Данные покупателя удалены.");
  }
  //валидация данных покупателя
  public validateCustomerData(data: IBuyer): boolean {
    if (!data) {
      console.error("Валидация: тип данных неверный.");
      return false;
    }

    // Валидация способа оплаты
    const validPaymentMethods = ["card", "online", ""];
    if (!validPaymentMethods.includes(data.payment)) {
      console.error(`Валидация: Недопустимый способ оплаты "${data.payment}".`);
      return false;
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      typeof data.email !== "string" ||
      data.email.trim() === "" ||
      !emailRegex.test(data.email)
    ) {
      console.error(`Валидация: Некорректный формат email "${data.email}".`);
      return false;
    }

    // Валидация телефона
    if (typeof data.phone !== "string" || data.phone.trim() === "") {
      console.error(
        `Валидация: Некорректный или пустой номер телефона "${data.phone}".`
      );
      return false;
    }

    // Валидация адреса
    if (typeof data.address !== "string" || data.address.trim() === "") {
      console.error(
        `Валидация: Некорректный или пустой адрес "${data.address}".`
      );
      return false;
    }

    console.log("Валидация данных покупателя прошла успешно.");
    return true;
  }
}
