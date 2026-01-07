import { IItem } from "../../types";
import { IEvents } from "../base/Events";

export class Cart {
  //массив товаров, выбранных покупателем для покупки
  private items: IItem[] = [];
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  setAllItems(items: IItem[]) {
    this.items = items;
    this.events.emit("basket:setAllItems");
  }

  getItems(): IItem[] {
    return this.items;
  }

  //добавление товара, который был получен в параметре в массив корзины
  addItem(itemToAdd: IItem): void {
    this.items.push(itemToAdd);
    this.events.emit("basket:changed");
  }

  //удаление товара, полученного в параметре из массива корзины
  deleteItem(idToDelete: string): void {
    const initialLength = this.items.length;
    this.items = this.items.filter((item) => item.id !== idToDelete);
    if (initialLength <= this.items.length) {
      console.log("Ошибка: товар не удалось удалить из корзины");
      return;
    }
    this.events.emit("basket:changed");
  }

  //очистка корзины
  clearCart(): void {
    this.items = [];
    this.events.emit("basket:changed");
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
  itemIsInCart(id: string): boolean {
    return this.items.some((item) => item.id === id);
  }
  // private emitCartUpdated(): void {
  //   this.events.emit("cart:updated", {
  //     items: this.items,
  //     total: this.getTotalCost(),
  //     count: this.getTotalAmount(),
  //   });
  // }
}
