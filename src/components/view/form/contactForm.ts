import { IForm } from "./form";
import { IEvents } from "../../base/Events";
import { Form } from "./form";

interface IContactForm extends IForm {
  // почта
  email: string;
  // телефон
  phone: string;
}

export class ContactForm extends Form<IContactForm> {
  constructor(protected container: HTMLFormElement, events: IEvents) {
    super(container, events);
  }
  set phone(value: string) {
    (this.container.elements.namedItem("phone") as HTMLInputElement).value =
      value;
  }

  set email(value: string) {
    (this.container.elements.namedItem("email") as HTMLInputElement).value =
      value;
  }
}
