import { ItemElement } from "./galleryItem";
import { ensureElement } from "../../../utils/utils";
import { IAction } from "./cardItem";

export class ItemPreview extends ItemElement {
  protected itemDescription: HTMLElement;
  protected _itemButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: IAction) {
    super(container, actions);
    this.itemDescription = ensureElement(".card__text", this.container);
    this._itemButton = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container
    );
    if (this._itemButton && actions?.onClick) {
      this._itemButton.addEventListener("click", (event: MouseEvent) => {
        event.stopPropagation();
        actions.onClick(event);
      });
    }
  }

  set itemButton(value: boolean) {
    if (this._itemButton) {
      this._itemButton.textContent = value ? "Удалить из корзины" : "Купить";

      if (this.itemPrice.textContent === "Бесценно") {
        this._itemButton.disabled = true;
        this._itemButton.textContent = "Не продается";
      } else {
        this._itemButton.disabled = false;
      }
    }
  }

  set description(value: string) {
    this.itemDescription.textContent = value;
  }
}