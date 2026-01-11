import { Item } from "./cardItem";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
export class BasketItem extends Item {
  protected _index: HTMLElement;
  protected buttonDelete: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container, events);
    this._index = ensureElement(".basket__item-index", this.container);
    this.buttonDelete = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      this.container
    );
        
    this.buttonDelete.addEventListener("click", (event: MouseEvent) => {
      event.stopPropagation();      
      if (this.id) {
        this.events.emit("basket:remove", { id: this.id });
      }
    });
  }

  set index(value: number) {
    this._index.textContent = String(value);
  }
}