import { ItemElement } from "./galleryItem";
import { ensureElement } from "../../../utils/utils";
import { IAction } from "./cardItem";
import { IEvents } from "../../base/Events";

export class ItemPreview extends ItemElement {
  protected itemDescription: HTMLElement;
  protected _itemButton: HTMLButtonElement;

  constructor(
    protected container: HTMLElement,
    protected events?: IEvents,
    action?: IAction
  ) {
    super(container, events, action);
    this.itemDescription = ensureElement(".card__text", this.container);
    this._itemButton = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container
    );

    if (this._itemButton && action?.onClick) {
      console.log("Добавляем обработчик на кнопку в превью");
      this._itemButton.addEventListener("click", (event: MouseEvent) => {
        console.log("Клик по кнопке купить/убрать");
        event.stopPropagation();
        action.onClick(event);
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
