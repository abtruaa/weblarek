import { ApiService } from "./components/models/apiService";
import { API_URL, CDN_URL } from "./utils/constants";
import "./scss/styles.scss";
import { EventEmitter } from "./components/base/Events";
import { Page } from "./components/view/page";
import { ItemElement } from "./components/view/item/galleryItem";
import { ItemPreview } from "./components/view/item/previewItem";
import { BasketItem } from "./components/view/item/basketCardView";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { Basket } from "./components/view/basket";
import { IItem, IOrder, IOrderResult } from "./types";
import { OrderForm } from "./components/view/form/orderForm";
import { ContactForm } from "./components/view/form/contactForm";
import { Success } from "./components/view/success";
import { ModalWindow } from "./components/view/modalWindow";

const appApi = new ApiService(CDN_URL, API_URL);
const itemTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const successTemplate = ensureElement<HTMLTemplateElement>("#success");
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const cardBasketTemplate = ensureElement<HTMLTemplateElement>("#card-basket");
const basketTemplate = ensureElement<HTMLTemplateElement>("#basket");
const orderTemplate = ensureElement<HTMLTemplateElement>("#order");
const contactsTemplate = ensureElement<HTMLTemplateElement>("#contacts");

const events = new EventEmitter();

// Инициализация компонентов
const page = new Page(document.body, events);
const modal = new ModalWindow(
  ensureElement<HTMLElement>("#modal-container"),
  events
);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const formOrder = new OrderForm(cloneTemplate(orderTemplate), events);
const formContacts = new ContactForm(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), {
  onClick: () => {
    modal.close();
  },
});

// Храним состояние приложения
let items: IItem[] = [];
let basketItems: IItem[] = [];
let order: Partial<IOrder> = {
  payment: "",
  address: "",
  email: "",
  phone: "",
};

// Загрузка товаров
appApi
  .getAllItems()
  .then((data: IItem[]) => {
    items = data;

    // Отображаем товары на странице
    page.itemList = items.map((item: IItem) => {
      const itemElement = new ItemElement(cloneTemplate(itemTemplate), events, {
        onClick: () => events.emit("card:select", item),
      });
      return itemElement.render({
        price: item.price,
        title: item.title,
        category: item.category,
        image: item.image,
        id: item.id,
      });
    });
  })
  .catch((err) => {
    console.error(err);
  });

// Выбор карточки товара
events.on("card:select", (item: IItem) => {
  const itemPreview = new ItemPreview(
    cloneTemplate(cardPreviewTemplate),
    events,
    {
      onClick: () => {
        const isInBasket = basketItems.some(
          (basketItem) => basketItem.id === item.id
        );
        if (isInBasket) {
          events.emit("item:delete", item);
        } else {
          events.emit("item:add", item);
        }
      },
    }
  );

  const isInBasket = basketItems.some(
    (basketItem) => basketItem.id === item.id
  );

  modal.render({
    content: itemPreview.render({
      id: item.id,
      image: item.image,
      title: item.title,
      category: item.category,
      description: item.description,
      price: item.price,
      itemButton: isInBasket,
    }),
  });
});

// Добавление товара в корзину
events.on("item:add", (item: IItem) => {
  basketItems.push(item);
  events.emit("basket:changed");
  modal.close();
});

// Удаление товара из корзины
events.on("item:delete", (item: IItem) => {
  basketItems = basketItems.filter((basketItem) => basketItem.id !== item.id);
  events.emit("basket:changed");
  modal.close();
});

// Открытие корзины
events.on("basket:open", () => {
  modal.render({
    content: basket.render({}),
  });
});

// Обновление корзины
events.on("basket:changed", () => {
  page.counter = basketItems.length;
  const totalPrice = basketItems.reduce((sum, item) => {
    return sum + (item.price || 0); // Если price = null, считаем как 0
  }, 0);

  basket.fullPrice = totalPrice;
  basket.items = basketItems.map((item, index) => {
    const basketItem = new BasketItem(
      cloneTemplate(cardBasketTemplate),
      events,
      {
        onClick: () => {
          basketItems = basketItems.filter(
            (basketItem) => basketItem.id !== item.id
          );
          events.emit("basket:changed");
        },
      }
    );
    return basketItem.render({
      id: item.id,
      index: index + 1,
      title: item.title,
      price: item.price,
    });
  });
});

// Оформление заказа
events.on("basket:continue", () => {
  order = { payment: "", address: "", email: "", phone: "" };
  modal.render({
    content: formOrder.render({
      isValid: false,
      errors: [],
    }),
  });
});

// Изменение данных в форме заказа
events.on("order.payment:change", (data: { field: string; value: string }) => {
  order.payment = data.value;
  validateOrderForm();
});

events.on("order.address:change", (data: { field: string; value: string }) => {
  order.address = data.value;
  validateOrderForm();
});

// Изменение данных в форме контактов
events.on("contacts.email:change", (data: { field: string; value: string }) => {
  order.email = data.value;
  validateContactForm();
});

events.on("contacts.phone:change", (data: { field: string; value: string }) => {
  order.phone = data.value;
  validateContactForm();
});

// Валидация формы заказа
function validateOrderForm(): void {
  const errors: string[] = [];

  if (!order.payment) {
    errors.push("Выберите способ оплаты");
  }

  if (!order.address?.trim()) {
    errors.push("Введите адрес доставки");
  }

  formOrder.isValid = errors.length === 0;
  formOrder.errors = errors.join("; ");
}

// Валидация формы контактов
function validateContactForm(): void {
  const errors: string[] = [];

  if (!order.email?.trim()) {
    errors.push("Введите email");
  }

  if (!order.phone?.trim()) {
    errors.push("Введите телефон");
  }

  formContacts.isValid = errors.length === 0;
  formContacts.errors = errors.join("; ");
}

// Отправка формы заказа
events.on("order:submit", () => {
  if (order.payment && order.address) {
    modal.render({
      content: formContacts.render({
        isValid: false,
        errors: [],
      }),
    });
  }
});

// Отправка формы контактов
events.on("contacts:submit", () => {
  if (order.email && order.phone && order.payment && order.address) {
    const orderData: IOrder = {
      payment: order.payment,
      address: order.address,
      email: order.email,
      phone: order.phone,
      total: basketItems.reduce((sum, item) => sum + (item.price || 0), 0),
      items: basketItems.map((item) => item.id),
    };

    appApi
      .postItem(orderData)
      .then((res: IOrderResult) => {
        success.total = res.total;
        basketItems = [];
        order = { payment: "", address: "", email: "", phone: "" };
        events.emit("basket:changed");

        modal.render({
          content: success.render({}),
        });
      })
      .catch((err) => {
        console.error(err);
        formContacts.errors = "Ошибка при оформлении заказа";
      });
  }
});

// Открытие/закрытие модального окна
events.on("modal:open", () => {
  page.locked = true;
});

events.on("modal:close", () => {
  page.locked = false;
});

// Обработчик кликов на платежные кнопки
events.on("order:payment:change", (data: { field: string; value: string }) => {
  order.payment = data.value;
  formOrder.payment = data.value;
  validateOrderForm();
});
