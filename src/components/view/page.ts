import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IPage {
  itemList: HTMLElement[];
  counter: number;
  locked: boolean;
}

export class Page extends Component<IPage> {
  protected headerBasketButton: HTMLButtonElement;
  protected headerBasketCounter: HTMLElement;
  protected itemContainer: HTMLElement;
  protected wrapper: HTMLElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);
    this.headerBasketButton = ensureElement<HTMLButtonElement>(
      ".header__basket",
      this.container
    );
    this.headerBasketCounter = ensureElement<HTMLElement>(
      ".header__basket-counter",
      this.container
    );
    this.itemContainer = ensureElement<HTMLElement>(".gallery", this.container);
    this.wrapper = ensureElement<HTMLElement>(".page__wrapper", this.container);

    this.headerBasketButton.addEventListener("click", () => {
      this.events.emit("basket:open");
    });
  }

  set itemList(items: HTMLElement[]) {
    this.itemContainer.replaceChildren(...items);
  }

  set counter(value: number) {
    this.headerBasketCounter.textContent = String(value);
  }

  set locked(value: boolean) {
    if (value) {
      this.wrapper.classList.add("page__wrapper_locked");
    } else {
      this.wrapper.classList.remove("page__wrapper_locked");
    }
  }
}
