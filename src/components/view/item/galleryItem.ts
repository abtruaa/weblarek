import { Item, IAction } from "./cardItem";
import { ensureElement } from "../../../utils/utils";

export class ItemElement extends Item {
  protected itemImage: HTMLImageElement;
  protected itemCategory: HTMLElement;
  protected itemCategoryColor: Record<string, string> = {
    "другое": "card__category_other",
    "софт-скил": "card__category_soft",
    "дополнительное": "card__category_additional",
    "кнопка": "card__category_button",
    "хард-скил": "card__category_hard",
  };

  constructor(container: HTMLElement, actions?: IAction) {
    super(container, actions);
    this.itemImage = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container
    );
    this.itemCategory = ensureElement(".card__category", this.container);
  }

  set image(value: string) {
    this.itemImage.src = value;
    this.itemImage.alt = this.itemTitle.textContent;
  }

  set category(value: string) {
    this.itemCategory.textContent = value;
    
    // Удаляем все старые классы категорий
    const allClasses = [
      "card__category_other",
      "card__category_soft",
      "card__category_additional", 
      "card__category_button",
      "card__category_hard"
    ];
    
    allClasses.forEach(className => {
      this.itemCategory.classList.remove(className);
    });
    
    // Добавляем новый класс
    if (this.itemCategoryColor[value]) {
      this.itemCategory.classList.add(this.itemCategoryColor[value]);
    }
  }
}