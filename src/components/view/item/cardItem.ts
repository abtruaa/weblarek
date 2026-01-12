import { ensureElement, isEmpty } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IItemView } from "../../../types";

export interface IAction {
  onClick: (event: MouseEvent) => void;
}

export class Item extends Component<IItemView> {
  protected itemTitle: HTMLElement;
  protected itemPrice: HTMLElement;
  protected _button?: HTMLButtonElement
  constructor(
    container: HTMLElement,
    actions?: IAction
    ) {
    super(container);
    this.itemTitle = ensureElement(".card__title", this.container);
    this.itemPrice = ensureElement(".card__price", this.container);
    if (this.container instanceof HTMLButtonElement) {
      this._button = this.container;
      this._button.addEventListener('click', (event: MouseEvent) => {
        actions?.onClick(event);
      });
    }
  }

  set price(price: number | null) {
    if (isEmpty(price)) {
      this.itemPrice.textContent = `Бесценно`;
    } else {
      this.itemPrice.textContent = `${price} синапсов`;
    }
  }

  set title(value: string) {
    this.itemTitle.textContent = value;
  }
}