import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector(".popup__form");
        this._submitButton = this._form.querySelector(".popup__submit");
        this._submitText = this._submitButton.textContent;
    }
    _getInputValues() {
        this._inputList = this._form.querySelectorAll(".popup__input");
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());

        })
    }
    close() {
        super.close();
        this._form.reset();
    }
    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = this._submitText
        } else {
            this._submitButton.textContent = "Сохранение..."
        }
    }
}