export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = containerSelector;
    }
    renderItems(arr) {
        arr.forEach((item) => {
            this._renderer(item);
        });
    }
    addItem(element) {
        this._container.append(element);
    }
    addOneItem(element) {
        this._container.prepend(element);
    }

}