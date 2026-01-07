import { Item } from "./cardItem";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { IAction } from "./cardItem";

export class ItemElement extends Item {
  protected itemImage: HTMLImageElement;
  protected itemCategory: HTMLElement;
  protected button: HTMLButtonElement;
  protected itemCategoryColor: Record<string, string> = {
    другое: "card__category_other",
    "софт-скил": "card__category_soft",
    дополнительное: "card__category_additional",
    кнопка: "card__category_button",
    "хард-скил": "card__category_hard",
  };

  constructor(
    protected container: HTMLElement,
    protected events?: IEvents,
    action?: IAction
  ) {
    super(container, events, action);
    this.itemImage = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container
    );
    this.itemCategory = ensureElement(".card__category", this.container);
    this.button = this.container as HTMLButtonElement;

    if (action?.onClick) {
      if (this.button) {
        this.button.addEventListener("click", action.onClick);
      } else {
        this.container.addEventListener("click", action.onClick);
      }
    }
  }

  set image(value: string) {
    this.itemImage.src = value;
    this.itemImage.alt = this.title;
  }

  set category(value: string) {
    this.itemCategory.textContent = value;
    // Удаляем все старые классы категорий
    this.itemCategory.classList.remove(
      "card__category_other",
      "card__category_soft",
      "card__category_additional",
      "card__category_button",
      "card__category_hard"
    );
    // Добавляем новый класс
    if (this.itemCategoryColor[value]) {
      this.itemCategory.classList.add(this.itemCategoryColor[value]);
    }
  }
}
