import { IApi, IProduct, IOrderResponse, IOrderRequest } from "../../types";
export class ApiService {
  private api: IApi;
  constructor(api: IApi) {
    this.api = api;
  }
  fetchProducts(): Promise<IProduct[]> {
    return this.api
      .get<{ total: number; items: IProduct[] }>("/product/")
      .then((response) => {
        return response.items; // Возвращаем массив из items
      });
  }
  sendOrder(orderData: IOrderRequest): Promise<IOrderResponse> {
    return this.api.post("/order/", orderData, "POST");
  }
}
