import { ensureElement, isEmpty } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";
import { IItemView } from "../../../types";
export interface IAction {
  onClick: (event: MouseEvent) => void;
}

export class Item extends Component<IItemView> {
  protected itemTitle: HTMLElement;
  protected itemPrice: HTMLElement;

  constructor(
    protected container: HTMLElement,
    protected events?: IEvents,
    _action?: IAction
  ) {
    super(container);
    this.itemTitle = ensureElement(".card__title", this.container);
    this.itemPrice = ensureElement(".card__price", this.container);
  }

  set price(price: number | null) {
    if (isEmpty(price)) {
      this.itemPrice.textContent = `Бесценно`;
    } else {
      this.itemPrice.textContent = `${price} синапсов`;
    }
  }

  set id(value: string) {
    this.container.dataset.id = value;
  }

  set title(value: string) {
    this.itemTitle.textContent = value;
  }
}
