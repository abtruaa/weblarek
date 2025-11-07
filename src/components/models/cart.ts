import { IProduct } from "../../types";

export class Cart {
  //массив товаров, выбранных покупателем для покупки
  private items: IProduct[] = [];

  getItems(): IProduct[] {
    return this.items;
  }
  //добавление товара, который был получен в параметре в массив корзины
  addItem(itemToAdd: IProduct): void {
    //проверяем, что товар с таким id не находится в корзине
    if (this.itemIsInCart(itemToAdd)) {
      console.log(`Товар с id ${itemToAdd.id} уже в корзине`);
    } else {
      if (itemToAdd.id.trim() !== "" && typeof itemToAdd.id === "string") {
        this.items.push(itemToAdd);
      } else {
        console.log("Ошибка: не удалось добавить товар");
      }
    }
  }
  //удаление товара, полученного в параметре из массива корзины
  deleteItem(itemToDelete: IProduct): void {
    const initialLength = this.items.length;
    this.items = this.items.filter((item) => item.id !== itemToDelete.id);
    if (initialLength <= this.items.length) {
      console.log("Ошибка: товар не удалось удалить из корзины");
      return;
    }
  }
  //очистка корзины
  clearCart(): void {
    this.items = [];
  }
  //получение стоимости всех товаров в корзине
  getTotalCost(): number {
    return this.items.reduce((total, item) => total + (item.price || 0), 0);
  }
  //получение количества товаров в корзине
  getTotalAmount(): number {
    return this.items.length;
  }
  //проверка наличия товара в корзине по его id, полученному в параметр метода
  itemIsInCart(itemToCheck: IProduct): boolean {
    return this.items.some((item) => item.id === itemToCheck.id);
  }
}
