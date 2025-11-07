import {
  IApi,
  IBuyer,
  IProduct,
  IOrderResponse,
  IOrderRequest,
} from "../../types";
import { Cart } from "./cart";
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
  sendOrder(buyer: IBuyer, cart: Cart): Promise<IOrderResponse> {
    const products = cart.getItems();
    const total = cart.getTotalCost();
    const orderData: IOrderRequest = {
      payment: buyer.payment,
      email: buyer.email,
      phone: buyer.phone,
      address: buyer.address,
      total: total,
      items: products.map((product) => product.id),
    };
    return this.api.post("/order/", orderData, "POST");
  }
}
