import { IItem } from "../../types";
import { IEvents } from "../base/Events";
export class Products {
  private allProducts: IItem[] = [];
  private selectedProduct: IItem | null = null;
  protected events: IEvents;

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
  
  // установка выбранного товара
  setSelected(item: IItem): void {
    this.selectedProduct = item;
    this.events.emit("preview:open");
  }
  
  // получение выбранного товара
  getSelected(): IItem | null {
    return this.selectedProduct;
  }
}
