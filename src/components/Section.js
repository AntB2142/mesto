export default class Section {
    constructor({ item, renderer }, containerSelector) {
        this._item = item;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    renderItems() {
        this._item.forEach((item) => {
            this._renderer(item);
        });
    }
    addItem(element) {
        this._container.prepend(element);
    }

}