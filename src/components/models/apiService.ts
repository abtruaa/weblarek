import { IApi, IBuyer, IProduct } from "../../types";
export class ApiService {
  private api: IApi;
  constructor(api: IApi) {
    this.api = api;
  }
  async fetchProducts(): Promise<IProduct[]> {
    return this.api
      .get<{ total: number; items: IProduct[] }>("/product/")
      .then((response) => {
        return response.items; // Возвращаем массив из items
      });
  }
  sendOrder(buyer: IBuyer, products: IProduct[]): Promise<any> {
    const payload = {
      buyer,
      products,
    };
    return this.api.post("/order/", payload, "POST");
  }
}
