function showError(form, input, config) {
    const error = form.querySelector(`#${input.name}-error`);
    error.textContent = input.validationMessage;
    error.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
}

function hideError(form, input, config) {
    const error = form.querySelector(`#${input.name}-error`);
    error.textContent = "";
    input.classList.remove(config.inputErrorClass);
    error.classList.remove(config.errorClass);
}

function checkInputValidity(form, input, config) {
    if (!input.validity.valid) {
        showError(form, input, config);
    } else {
        hideError(form, input, config);
    }
}

function validationButton(button, isActive, config) {
    if (isActive) {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = true;
    }
}

function setEventListeners(form, config) {
    const inputsList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputsList.forEach((input) => {
        input.addEventListener("input", () => {
            checkInputValidity(form, input, config);
            validationButton(submitButton, form.checkValidity(), config);
        });
    });
}

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach((form) => {
        setEventListeners(form, config);

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log("отправка формы");
        });
        const submitButton = form.querySelector(config.submitButtonSelector);
        validationButton(submitButton, form.checkValidity(), config)
    });
}
const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    inputErrorClass: "popup__input_error",
    errorClass: "popup__error"

};


enableValidation(validationConfig);