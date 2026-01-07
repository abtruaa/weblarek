// import { ApiPostMethods } from "../components/base/Api";
// export interface IApi {
//   get<T extends object>(uri: string): Promise<T>;
//   post<T extends object>(
//     uri: string,
//     data: object,
//     method?: ApiPostMethods
//   ): Promise<T>;
// }
export type TPayment = "card" | "online" | "";

export interface IItem {
  //уникальный id продукта
  id: string;
  //описание продукта
  description: string;
  //картинка продукта
  image: string;
  //заголовок продукта
  title: string;
  //категория продукта
  category: string;
  //цена продукта
  price: number | null;
}

export interface IBuyer {
  //способ оплаты
  payment: string;
  //почта покупателя
  email: string;
  //номер покупателя
  phone: string;
  //адрес покупателя
  address: string;
}

export interface IOrder extends IBuyer {
  total: number;
  items: string[];
}

export interface IOrderResult {
  id: string;
  total: number;
}

export interface IItemView extends IItem {
  index: number;
  itemButton: boolean;
}
export type FormErrors = Partial<Record<keyof IBuyer, string>>;
