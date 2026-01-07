import { IItem } from "../../types";
import { IEvents } from "../base/Events";
export class Products {
  private allProducts: IItem[] = [];
  protected events: IEvents;
  preview: IItem | undefined;

  constructor(events: IEvents) {
    this.events = events;
  }

  //сохранения массива товаров полученного в параметрах метода
  saveProducts(products: IItem[]): void {
    this.allProducts = products;
    this.events.emit("item:setAllItems");
  }

  //получение массива товаров из модели
  getProducts(): IItem[] {
    return this.allProducts;
  }
  //получение одного товара по его id
  getProductById(id: string): IItem | undefined {
    return this.allProducts.find((product) => product.id === id);
  }
  //
  setPreview(item: IItem) {
    this.preview = item;
    this.events.emit("preview:changed", item);
  }
}
