import { ItemElement } from "./galleryItem";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";

export class ItemPreview extends ItemElement {
  protected itemDescription: HTMLElement;
  protected _itemButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container, events);
    this.itemDescription = ensureElement(".card__text", this.container);
    this._itemButton = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container
    );
    if (this._itemButton) {
      this._itemButton.addEventListener("click", (event: MouseEvent) => {
        event.stopPropagation();
        if (this.id) {
          this.events.emit("item:toggle", { id: this.id });
        } else {
          console.error("No id in preview! Checking dataset:", this.container.dataset);
        }
      });
    }
  }

  set itemButton(value: boolean) {
    if (this._itemButton) {
      this._itemButton.textContent = value ? "Удалить из корзины" : "Купить";
    }
  }

  set description(value: string) {
    this.itemDescription.textContent = value;
  }
}