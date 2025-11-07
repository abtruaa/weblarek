import "./scss/styles.scss";

//Products class
import { Products } from "./components/models/products";
import { apiProducts } from "./utils/data";
const productsModel = new Products();
productsModel.saveProducts(apiProducts.items);
console.log(
  "Получение массива сохранненых товаров",
  productsModel.getProducts()
);
const productById = productsModel.getProductById(
  "b06cde61-912f-4663-9751-09956c0eed67"
);
console.log("Получение товара по его id", productById);
productsModel.selectProduct(apiProducts.items[1]);
console.log("Возвращаем выбранный товар", productsModel.getSelectedProduct());

//Carts class
import { Cart } from "./components/models/cart";
const cartModel = new Cart();
console.log("Товары в корзине", cartModel.getItems());
cartModel.addItem(apiProducts.items[0]);
console.log(`Товар добавлен в корзину!`);
console.log(
  "Наличие товара в корзине с заданнным id:",
  cartModel.itemIsInCart(apiProducts.items[0])
);
console.log("Товары в корзине", cartModel.getItems());
cartModel.deleteItem(apiProducts.items[0]);
cartModel.addItem(apiProducts.items[3]);
console.log(`Товар добавлен в корзину!`);
console.log("Товары в корзине", cartModel.getItems());
console.log("Стоимость всех товаров в корзине:", cartModel.getTotalCost());
cartModel.addItem(apiProducts.items[3]);
console.log(`Товар добавлен в корзину!`);
console.log("Количество товаров в корзине:", cartModel.getTotalAmount());
cartModel.clearCart();
console.log("Корзина очищена!");
console.log("Осталось товаров в корзине после очищения:", cartModel.getItems());

//Customer class
import { Customer } from "./components/models/customer";
import { TPayment } from "./types";
const customerModel = new Customer();
let data: {
  payment?: TPayment;
  email?: string;
  phone?: string;
  address?: string;
} = { payment: "card" };
customerModel.getAllCustomerData();
console.log("Данные покупателя получены");
customerModel.saveCustomerData(data);
console.log(`Данные покупателя сохранены,`, data);
customerModel.getAllCustomerData();
customerModel.validateCustomerData();
console.log(
  `Валидация данных покупателя, ошибки: `,
  customerModel.validateCustomerData()
);
data = {
  payment: "card",
  email: "test@mail.ru",
  address: "Примерная улица, дом 1",
};
customerModel.saveCustomerData(data);
console.log(`Данные покупателя сохранены,`, data);
customerModel.validateCustomerData();
console.log(
  `Валидация данных покупателя, ошибки: `,
  customerModel.validateCustomerData()
);
data = { phone: "0123456" };
customerModel.saveCustomerData(data);
console.log(`Данные покупателя сохранены,`, data);
console.log(
  `Валидация данных покупателя, ошибки: `,
  customerModel.validateCustomerData()
);
customerModel.clearCustomerData();
console.log(
  "Данные покупателя после очистки",
  customerModel.getAllCustomerData()
);

//Api class
import { Api } from "./components/base/Api";
import { ApiService } from "./components/models/apiService";
import { API_URL } from "./utils/constants";

const apiInstance = new Api(API_URL);
const apiLayer = new ApiService(apiInstance);

apiLayer
  .fetchProducts()
  .then((products) => {
    productsModel.saveProducts(products);
    console.log("Каталог товаров c cервера:", productsModel.getProducts());
  })
  .catch((error) => {
    console.error("Ошибка при получении товаров с сервера:", error);
  });
