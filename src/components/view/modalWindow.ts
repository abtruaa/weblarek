import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModalWindow {
  // содержимое модального окна
  content?: HTMLElement;
}

export class ModalWindow extends Component<IModalWindow> {
  protected closeButton: HTMLButtonElement;
  protected _content: HTMLElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);
    this.closeButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      container
    );
    this._content = ensureElement(".modal__content", this.container);

    this.closeButton.addEventListener("click", this.close.bind(this));
    this.container.addEventListener("click", this.close.bind(this));
    this._content.addEventListener("click", (event) => event.stopPropagation());
  }

  set content(value: HTMLElement | null) {
    if (value) {
      this._content.replaceChildren(value);
    } else {
      this._content.replaceChildren();
    }
  }

  open() {
    this.container.classList.add("modal_active");
    this.events.emit("modal:open");
  }

  close() {
    this.container.classList.remove("modal_active");
    this.events.emit("modal:close");
    this.content = null;
  }

  render(data: Partial<IModalWindow>): HTMLElement {
    super.render(data);
    this.open();
    return this.container;
  }
}
