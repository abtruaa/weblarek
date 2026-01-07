import { IForm } from "./form";
import { ensureAllElements } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./form";

interface IOrderForm extends IForm {
  // адрес и способ оплаты
  address: string;
  payment: string;
}

export class OrderForm extends Form<IOrderForm> {
  protected _buttons: HTMLButtonElement[];

  constructor(protected container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._buttons = Array.from(
      ensureAllElements(".button_alt", this.container)
    );
    this._buttons.forEach((button) => {
      button.addEventListener("click", (event: MouseEvent) => {
        const target = event.target as HTMLButtonElement;
        const name = target.name as keyof IOrderForm;
        const field = "payment" as keyof IOrderForm;
        this.onInputChange(field, name);
      });
    });
  }
  set payment(name: string) {
    this._buttons.forEach((button) => {
      const className = "button_alt-active";
      button.classList.toggle(className, button.name === name);
    });
  }

  set address(value: string) {
    (this.container.elements.namedItem("address") as HTMLInputElement).value =
      value;
  }
}
