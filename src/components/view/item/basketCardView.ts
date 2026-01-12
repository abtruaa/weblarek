import { Item, IAction } from "./cardItem";
import { ensureElement } from "../../../utils/utils";

export class BasketItem extends Item {
  protected _index: HTMLElement;
  protected buttonDelete: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: IAction) {
    super(container, actions);
    this._index = ensureElement(".basket__item-index", this.container);
    this.buttonDelete = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      this.container
    );
        
    if (actions?.onClick) {
      this.buttonDelete.addEventListener("click", (event: MouseEvent) => {
      event.stopPropagation();      
      actions.onClick(event);
    });
  }
}

  set index(value: number) {
    this._index.textContent = String(value);
  }
}