export default class FormValidator {
    constructor(config, formSelector) {
        this._config = config;
        this._formSelector = formSelector;
    }

    _showError(input) {
        const error = this._formSelector.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        error.classList.add(this._config.errorClass);
        input.classList.add(this._config.inputErrorClass);
    }

    _hideError(input) {
        const error = this._formSelector.querySelector(`#${input.id}-error`);
        error.textContent = "";
        input.classList.remove(this._config.inputErrorClass);
        error.classList.remove(this._config.errorClass);
    }

    clearSpanError() {
        const errorSpan = this._formSelector.querySelectorAll(`.${this._config.errorClass}`);
        errorSpan.forEach(span => span.textContent = "");

    }

    clearTypeError() {
        const errorType = this._formSelector.querySelectorAll(`.${this._config.inputErrorClass}`);
        errorType.forEach(type => type.classList.remove(this._config.inputErrorClass));
    }

    _checkInputValidity(input) {
        if (!input.validity.valid) {
            this._showError(input);
        } else {
            this._hideError(input);
        }
    }

    validationButton(button, isActive) {
        if (isActive) {
            button.classList.remove(this._config.inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(this._config.inactiveButtonClass);
            button.disabled = true;
        }
    }

    _setEventListeners() {
        const inputList = this._formSelector.querySelectorAll(this._config.inputSelector);
        const submitButton = this._formSelector.querySelector(this._config.submitButtonSelector);
        inputList.forEach(input => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input);
                this.validationButton(submitButton, this._formSelector.checkValidity());
            });
        })
    }

    enableValidation() {
        this._setEventListeners();
        this._formSelector.addEventListener("submit", (evt) => {
            evt.preventDefault()

        });
        const submitButton = this._formSelector.querySelector(this._config.submitButtonSelector);
        this.validationButton(submitButton, this._formSelector.checkValidity());

    }
}