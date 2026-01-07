import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export interface ISuccess {
  total: number;
}

export interface ISuccessActions {
  onClick: () => void;
}

export class Success extends Component<ISuccess> {
  protected close: HTMLElement;
  protected _total: HTMLElement;

  constructor(protected container: HTMLElement, action?: ISuccessActions) {
    super(container);

    this.close = ensureElement(".order-success__close", this.container);
    this._total = ensureElement(".order-success__description", this.container);
    this.close.addEventListener("click", () => {
      action?.onClick?.();
    });
  }

  set total(value: number) {
    this._total.textContent = `Списано ${value} синапсов`;
  }
}
