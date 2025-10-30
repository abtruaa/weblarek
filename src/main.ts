import './scss/styles.scss';
//Products class
import { Products } from './components/models/products';
import { apiProducts } from './utils/data';
const productsModel = new Products();
productsModel.saveProducts(apiProducts.items);
console.log("Получение массива сохранненых товаров", productsModel.getProducts());
const productById =  productsModel.getProductById("b06cde61-912f-4663-9751-09956c0eed67");
console.log("Получение товара по его id", productById);
productsModel.selectProduct(apiProducts.items[1]);
console.log("Возвращаем выбранный товар", productsModel.getSelectedProduct());

//Carts class
import { Cart } from './components/models/cart';
const cartModel = new Cart();
console.log("Товары в корзине", cartModel.getItems());
cartModel.addItem(apiProducts.items[0]);
console.log("Наличие товара в корзине с заданнным id:" ,cartModel.itemIsInCart(apiProducts.items[0]))
console.log("Товары в корзине", cartModel.getItems());
cartModel.deleteItem(apiProducts.items[0])
cartModel.addItem(apiProducts.items[3]);
console.log("Товары в корзине", cartModel.getItems());
console.log("Стоимость всех товаров в корзине:", cartModel.getTotalCost());
cartModel.addItem(apiProducts.items[3]);
console.log("Количество товаров в корзине:", cartModel.getTotalAmount());
cartModel.clearCart();

//Customer class
import { Customer } from './components/models/customer';
const customerModel = new Customer();
customerModel.getAllCustomerData();

import { Api } from './components/base/Api';
import { ApiService } from './components/models/apiService';

const apiInstance = new Api('https://larek-api.nomoreparties.co/api/weblarek');
const apiLayer = new ApiService(apiInstance);

apiLayer.fetchProducts().then(products => {
    console.log('Каталог товаров:', products);
}).catch(error => {
    console.error('Ошибка при получении товаров:', error);
});