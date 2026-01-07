import { createElement, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface IBasket {
  items: HTMLElement[];
  fullPrice: number;
}

export class Basket extends Component<IBasket> {
  protected basketList: HTMLUListElement;
  protected basketButton: HTMLButtonElement;
  protected basketPrice: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this.basketList = ensureElement<HTMLUListElement>(
      ".basket__list",
      container
    );
    this.basketButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      container
    );
    this.basketPrice = ensureElement(".basket__price", container);

    this.basketButton.addEventListener("click", () => {
      this.events.emit("basket:continue");
    });
    this.items = [];
  }

  set items(items: HTMLElement[]) {
    if (items.length) {
      this.basketList.replaceChildren(...items);
      this.basketButton.disabled = false;
    } else {
      this.basketList.replaceChildren(
        createElement<HTMLParagraphElement>("p", {
          textContent: "Корзина пуста",
        })
      );
      this.basketButton.disabled = true;
    }
  }

  set fullPrice(value: number) {
    this.basketPrice.textContent = `${value} синапсов`;
    this.basketButton.disabled = value === 0;
  }
}
