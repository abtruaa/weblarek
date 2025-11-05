import { IProduct } from "../../types";
export class Products {
    private allProducts: IProduct[] = [];
    //может быть null, если ни один товар не выбран
    private selectedProduct: IProduct | null = null;
    
    //сохранения массива товаров полученного в параметрах метода
    public saveProducts(products: IProduct[]) : void {
        if (Array.isArray(products)) {
            this.allProducts = [...products];
            console.log("Массив сохраненных товаров", (this.allProducts))
        } else {
            console.error("Ошибка: переданные данные не являются массивом")
        }
    }

    //получение массива товаров из модели
    public getProducts(): IProduct[] {
        return [...this.allProducts];
    }
    //получение одного товара по его id
    public getProductById(id: string): IProduct | undefined {
        return this.allProducts.find(product => product.id === id);
    }
    //сохраняет выбранный товар
    public selectProduct(product: IProduct | null): void {
        if (product === null) {
            this.selectedProduct = null;
            console.log("Снято выделение с товара");
        } else {
            this.selectedProduct = product;
            console.log(`Выбран товар ${product.title} с ID ${product.id}`)
        }
    }
    //возвращает выбранный товар
    public getSelectedProduct(): IProduct | null {
        return this.selectedProduct
    }
}