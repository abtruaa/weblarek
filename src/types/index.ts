export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods
  ): Promise<T>;
}
export type TPayment = "card" | "online" | "";

export interface IProduct {
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
  payment: TPayment;
  //почта покупателя
  email: string;
  //номер покупателя
  phone: string;
  //адрес покупателя
  address: string;
}
