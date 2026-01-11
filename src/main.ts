import { ApiService } from './components/models/apiService';
import { API_URL, CDN_URL } from './utils/constants';
import './scss/styles.scss';
import { EventEmitter } from './components/base/Events';
import { Page } from './components/view/page';
import { BasketItem } from './components/view/item/basketCardView';
import { ItemPreview } from './components/view/item/previewItem';
import { ItemElement } from './components/view/item/galleryItem';
import { Basket } from './components/view/basket';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ModalWindow } from './components/view/modalWindow';
import { IItem, IOrder, IOrderResult, IBuyer, FormErrors } from './types';
import { OrderForm } from './components/view/form/orderForm';
import { ContactForm } from './components/view/form/contactForm';
import { Success } from './components/view/success';
import { Products } from './components/models/products';
import { Cart } from './components/models/cart';
import { Customer } from './components/models/customer';

// Инициализация
const appApi = new ApiService(CDN_URL, API_URL);
const events = new EventEmitter();

// Модели
const productsModel = new Products(events);
const cartModel = new Cart(events);
const customerModel = new Customer(events);

// Представления
const page = new Page(document.body, events);
const modal = new ModalWindow(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(ensureElement<HTMLTemplateElement>('#basket')), events);
const formOrder = new OrderForm(cloneTemplate(ensureElement<HTMLTemplateElement>('#order')), events);
const formContacts = new ContactForm(cloneTemplate(ensureElement<HTMLTemplateElement>('#contacts')), events);
const success = new Success(cloneTemplate(ensureElement<HTMLTemplateElement>('#success')), {
    onClick: () => modal.close()
});

// Шаблоны
const itemTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

// ЗАГРУЗКА ТОВАРОВ
appApi.getAllItems()
    .then((data: IItem[]) => {
        productsModel.saveProducts(data);
    })
    .catch((err) => {
        console.error(err);
    });

// ОБРАБОТЧИКИ СОБЫТИЙ

events.on('customer:changed', (data: IBuyer) => {    
    // Обновляем формы данными
    formOrder.payment = data.payment || '';
    formOrder.address = data.address || '';
    formContacts.email = data.email || '';
    formContacts.phone = data.phone || '';
});

// Товары загружены
events.on('item:setAllItems', () => {
    const items = productsModel.getProducts();
    
    page.itemList = items.map((item: IItem) => {
        const itemElement = new ItemElement(cloneTemplate(itemTemplate), events);
        
        return itemElement.render({
            id: item.id,
            title: item.title,
            category: item.category,
            image: item.image,
            price: item.price
        });
    });
});

// Выбор карточки товара
events.on('card:select', (data: { id: string }) => {
    const item = productsModel.getProductById(data.id);
    if (item) {
        productsModel.setPreview(item);
    }
});

// Открытие превью товара
events.on('preview:changed', (item: IItem) => {
    const itemPreview = new ItemPreview(cloneTemplate(cardPreviewTemplate), events);
    
    const previewElement = itemPreview.render({
        id: item.id,
        image: item.image,
        title: item.title,
        category: item.category,
        description: item.description,
        price: item.price,
        itemButton: cartModel.itemIsInCart(item.id)
    });
    
    modal.render({
        content: previewElement
    });
});

// Добавление/удаление товара
events.on('item:toggle', (data: { id: string }) => {
    const item = productsModel.getProductById(data.id);
    if (item) {
        if (cartModel.itemIsInCart(item.id)) {
            cartModel.deleteItem(item.id);
        } else {
            cartModel.addItem(item);
        }
    }
    modal.close();
});

// Удаление из корзины
events.on('basket:remove', (data: { id: string }) => {
    cartModel.deleteItem(data.id);
});

// Изменение корзины
events.on('basket:changed', () => {
    const items = cartModel.getItems();
    page.counter = cartModel.getTotalAmount();
    basket.total = cartModel.getTotalCost();
    
    basket.items = items.map((item, index) => {
        const basketItem = new BasketItem(cloneTemplate(cardBasketTemplate), events);
                
        const element = basketItem.render({
            id: item.id,
            index: index + 1,
            title: item.title,
            price: item.price
        });
        
        return element;
    });
});

// Открытие корзины
events.on('basket:open', () => {
    const basketElement = basket.render({});
    modal.render({
        content: basketElement
    });
});

// Начало оформления заказа
events.on('basket:continue', () => {
    if (cartModel.getTotalAmount() === 0) {
        console.log('Basket is empty, cannot continue');
        return;
    }
    
    customerModel.clearCustomerData();
    modal.render({
        content: formOrder.render({
            isValid: false,
            errors: []
        })
    });
});

// Изменение данных в форме заказа
events.on('order.payment:change', (data: { field: string, value: string }) => {
    customerModel.setOrderField('payment', data.value.trim());
});

events.on('order.address:change', (data: { field: string, value: string }) => {
    customerModel.setOrderField('address', data.value.trim());
});

// Изменение данных в форме контактов
events.on('contacts.email:change', (data: { field: string, value: string }) => {
    customerModel.setOrderField('email', data.value);
});

events.on('contacts.phone:change', (data: { field: string, value: string }) => {
    customerModel.setOrderField('phone', data.value);
});

// Обработчики событий валидации
events.on('order:validation', (data: { isValid: boolean }) => {
    formOrder.isValid = data.isValid;
});

events.on('contacts:validation', (data: { isValid: boolean }) => {
    formContacts.isValid = data.isValid;
});

events.on('formErrors:change', (errors: FormErrors) => {
    
    // Ошибки для формы заказа
    const orderErrors: string[] = [];
    if (errors.payment) orderErrors.push(errors.payment);
    if (errors.address) orderErrors.push(errors.address);
    
    // Ошибки для формы контактов
    const contactErrors: string[] = [];
    if (errors.email) contactErrors.push(errors.email);
    if (errors.phone) contactErrors.push(errors.phone);
    
    formOrder.errors = orderErrors.join('; ');
    formContacts.errors = contactErrors.join('; ');
});

// Отправка формы заказа
events.on('order:submit', () => {    
    const isValid = customerModel.isOrderFormValid();
    
    if (isValid) {
        
        const customerData = customerModel.getAllCustomerData();
        
        modal.render({
            content: formContacts.render({
                email: customerData.email || '',
                phone: customerData.phone || '',
                isValid: customerModel.isContactsFormValid(),
                errors: []
            })
        });
    } else {
        console.log('Order form is NOT valid, showing error...');
    }
});

// Отправка формы контактов
events.on('contacts:submit', () => {
    const isValid = customerModel.isContactsFormValid();    
    if (isValid) {
        const customerData = customerModel.getAllCustomerData();
        const orderData: IOrder = {
            payment: customerData.payment,
            address: customerData.address,
            email: customerData.email,
            phone: customerData.phone,
            total: cartModel.getTotalCost(),
            items: cartModel.getItems().map(item => item.id)
        };
                
        appApi.postItem(orderData)
            .then((res: IOrderResult) => {
                success.total = res.total;
                cartModel.clearCart();
                customerModel.clearCustomerData();
                
                modal.render({
                    content: success.render({})
                });
            })
            .catch((err) => {
                console.error(err);
                formContacts.errors = 'Ошибка при оформлении заказа';
            });
    } else {
        console.log('Contacts form is NOT valid, showing error...');
    }
});

// Открытие/закрытие модального окна
events.on('modal:open', () => {
    page.locked = true;
});

events.on('modal:close', () => {
    page.locked = false;
});