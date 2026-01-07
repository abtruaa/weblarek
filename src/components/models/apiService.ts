import { IItem, IOrder, IOrderResult } from "../../types";
import { Api, ApiListResponse } from "../base/Api";
export class ApiService extends Api {
  readonly cdn: string;
  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }
  getAllItems(): Promise<IItem[]> {
    return this.get<ApiListResponse<IItem>>("/product/").then(
      (data: ApiListResponse<IItem>) =>
        data.items.map((item) => ({
          ...item,
          image: this.cdn + item.image.replace(".svg", ".png"),
        }))
    );
  }

  getItemId(itemId: string): Promise<IItem> {
    return this.get<IItem>(`/product/${itemId}`).then((item: IItem) => ({
      ...item,
      image: this.cdn + item.image.replace(".svg", ".png"),
    }));
  }

  postItem(order: IOrder): Promise<IOrderResult> {
    return this.post<IOrderResult>("/order", order).then(
      (data: IOrderResult) => data
    );
  }
}
