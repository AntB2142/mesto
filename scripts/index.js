let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let popupClose = document.querySelector(".popup__close");
let title = document.querySelector(".profile__title");
let subtitle = document.querySelector(".profile__subtitle");
let form = document.querySelector(".popup__form");
let nameField = document.querySelector("#name");
let statusField = document.querySelector("#status");

function showPopup() {
    popup.classList.add("popup__opened");
    nameField.value = title.textContent;
    statusField.value = subtitle.textContent;
}

function closePopup() {
    popup.classList.remove("popup__opened");
}

function submitForm(event) {
    event.preventDefault();
    title.textContent = nameField.value;
    subtitle.textContent = statusField.value;
    closePopup();
}
editButton.addEventListener("click", showPopup);
popupClose.addEventListener("click", closePopup);
form.addEventListener("submit", submitForm);