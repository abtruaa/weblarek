import { IProduct } from "../../types";
export class Products {
  private allProducts: IProduct[] = [];
  //может быть null, если ни один товар не выбран
  private selectedProduct: IProduct | null = null;

  //сохранения массива товаров полученного в параметрах метода
  saveProducts(products: IProduct[]): void {
    this.allProducts = [...products];
  }

  //получение массива товаров из модели
  getProducts(): IProduct[] {
    return [...this.allProducts];
  }
  //получение одного товара по его id
  getProductById(id: string): IProduct | undefined {
    return this.allProducts.find((product) => product.id === id);
  }
  //сохраняет выбранный товар
  selectProduct(product: IProduct | null): void {
    this.selectedProduct = product;
    if (product === null) {
      console.log("Снято выделение с товара");
    } else {
      console.log(`Выбран товар ${product.title} с ID ${product.id}`);
    }
  }
  //возвращает выбранный товар
  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}
