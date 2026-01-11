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
  protected _id: string = '';
  protected _title: string = '';

  constructor(
    container: HTMLElement,
    protected events?: IEvents
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
    this._id = value;
    this.container.dataset.id = value;
  }

  get id(): string {
    return this._id;
  }

  set title(value: string) {
    this._title = value;
    this.itemTitle.textContent = value;
  }

  get title(): string {
    return this._title;
  }

  render(data: Partial<IItemView>): HTMLElement {
    
    if (data.id !== undefined) {
      this.id = data.id;
    }
    
    if (data.title !== undefined) {
      this.title = data.title;
    }
    
    if (data.price !== undefined) {
      this.price = data.price;
    }
    
    return super.render(data);
  }
}