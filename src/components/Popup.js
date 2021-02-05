export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
    }
    open() {
        this._popup.classList.add("popup__opened");
        document.addEventListener("keydown", this._closeEscape);
        this._popup.addEventListener("click", this._closeOverlay);

    }
    close() {
        this._popup.classList.remove("popup__opened");
        document.removeEventListener("keydown", this._closeEscape);
        this._popup.removeEventListener("click", this._closeOverlay);

    }
    _closeEscape = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    }
    _closeOverlay = (evt) => {
        const closeButton = evt.target;
        if (closeButton.classList.contains("popup")) {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.querySelector(".popup__close").addEventListener("click", () => {
            this.close();
        })
        this._popup.addEventListener("click", (evt) => {
            const popupOpen = evt.target;
            if (popupOpen.classList.contains("popup__opened")) {
                this.close();
            }
        })
    }
}