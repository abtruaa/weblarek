import { Item } from './cardItem';
import { ensureElement } from '../../../utils/utils';
import { IEvents } from '../../base/Events';
import { IAction } from './cardItem';
export class BasketItem extends Item {
    protected _index: HTMLElement;
    protected buttonDelete: HTMLButtonElement;

    constructor(
        protected container: HTMLElement,
        protected events?: IEvents,
        action?: IAction
    ) {
        super(container, events, action);
        this._index = ensureElement('.basket__item-index', this.container);
        this.buttonDelete = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        if (this.buttonDelete && action?.onClick) {
            this.buttonDelete.addEventListener('click', action.onClick);
        }
    }

    set index(value: number) {
        this._index.textContent = String(value);
    }
}