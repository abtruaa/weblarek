import { IProduct } from "../../types";

export class Cart {
  //массив товаров, выбранных покупателем для покупки
  private items: IProduct[] = [];
  public getItems(): IProduct[] {
    return this.items;
  }
  //добавление товара, который был получен в параметре в массив корзины
  public addItem(itemToAdd: IProduct): void {
    //проверяем, что товар с таким id не находится в корзине
    const itemInCart = this.items.some((item) => item.id === itemToAdd.id);
    if (itemInCart) {
      console.log(`Товар с id ${itemToAdd.id} уже в корзине`);
    } else {
      if (itemToAdd.id.trim() !== "" && typeof itemToAdd.id === "string") {
        this.items.push(itemToAdd);
        console.log(`Товар с id ${itemToAdd.id} добавлен в корзину!`);
      } else {
        console.log("Ошибка: не удалось добавить товар");
      }
    }
  }
  //удаление товара, полученного в параметре из массива корзины
  public deleteItem(itemToDelete: IProduct): void {
    if (
      !itemToDelete ||
      typeof itemToDelete.id !== "string" ||
      itemToDelete.id.trim() === ""
    ) {
      console.log("Ошибка: Передан некорректный объект товара для удаления.");
      return;
    }
    const initialLength = this.items.length;
    this.items = this.items.filter((item) => item.id !== itemToDelete.id);
    if (initialLength > this.items.length) {
      console.log("Товар успешно удален из корзины!");
    } else {
      console.log("Ошибка: товар не удалось удалить из корзины");
    }
  }
  //очистка корзины
  public clearCart(): void {
    this.items = [];
    console.log("Корзина очищена!");
  }
  //получение стоимости всех товаров в корзине
  public getTotalCost(): number {
    let total = 0;
    for (const item of this.items) {
      if (typeof item.price === "number") {
        total += item.price;
      }
    }
    return total;
  }
  //получение количества товаров в корзине
  public getTotalAmount(): number {
    return this.items.length;
  }
  //проверка наличия товара в корзине по его id, полученному в параметр метода
  public itemIsInCart(itemToCheck: IProduct): boolean {
    return this.items.some((item) => item.id === itemToCheck.id);
  }
}
