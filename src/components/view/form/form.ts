import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";

export interface IForm {
  isValid: boolean;
  errors: string[];
}

export abstract class Form<T extends object> extends Component<IForm> {
  protected buttonSubmit: HTMLButtonElement;
  protected _errors: HTMLElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container);
    this.buttonSubmit = ensureElement<HTMLButtonElement>(
      "button[type=submit]",
      this.container
    );
    this._errors = ensureElement(".form__errors", this.container);
    this.container.addEventListener("input", (e: Event) => {
      const target = e.target as HTMLInputElement;
      const field = target.name as keyof T;
      const value = target.value;
      this.onInputChange(field, value);
    });

    this.container.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      this.events.emit(`${this.container.name}:submit`);
    });
  }
  protected onInputChange(field: keyof T, value: string) {
    this.events.emit(`${this.container.name}.${String(field)}:change`, {
      field,
      value,
    });
  }

  set isValid(value: boolean) {
    this.buttonSubmit.disabled = !value;
  }

  set errors(value: string) {
    this._errors.textContent = value;
  }
  render(state: Partial<T> & IForm) {
    const { isValid, errors, ...inputs } = state;
    super.render({ isValid, errors });
    Object.assign(this, inputs);
    return this.container;
  }
}
