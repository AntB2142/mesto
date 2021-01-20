import Card from "./Card.js";
import { initialCards } from "./initialCards.js";
import FormValidator from "./FormValidator.js";

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    inputErrorClass: "popup__input_error",
    errorClass: "popup__error"
};

const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector("#editPopup");
const popupEditClose = popupEdit.querySelector(".popup__close");
const formEdit = document.querySelector("#formEdit");
const showTitle = document.querySelector(".profile__title");
const showStatus = document.querySelector(".profile__subtitle");
const nameInput = formEdit.querySelector('input[name="name"]');
const statusInput = formEdit.querySelector('input[name="status"]');

const addButton = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector("#addPopup");
const popupAddClose = popupAdd.querySelector(".popup__close");
const formAdd = document.querySelector("#formAdd");
const imgTitleInput = formAdd.querySelector('input[name="title"]');
const imgLinkInput = formAdd.querySelector('input[name="image"]');

const popupFull = document.querySelector("#fullPopup");
const popupFullImg = popupFull.querySelector(".popup__img");
const popupFullClose = popupFull.querySelector(".popup__close");
const popupFullTitle = document.querySelector(".popup__full-title");

const grid = document.querySelector(".grid-elements");

const addFormValidator = new FormValidator(validationConfig, formAdd);
const editFormValidator = new FormValidator(validationConfig, formEdit);

initialCards.forEach((item) => {
    const card = new Card(item, "#temlateElements", openFull);
    const cardElements = card.generateCard();
    grid.append(cardElements);
})

function openPopup(popup) {
    popup.classList.add("popup__opened");
    document.addEventListener("keydown", closeEscape);
}

function closePopup(popup) {
    popup.classList.remove("popup__opened");
    document.removeEventListener("keydown", closeEscape);
}

function overlayClickClose(evt) {
    const closeButton = evt.target;
    if (closeButton.classList.contains("popup")) {
        closeButton.closest(".popup").classList.remove("popup__opened");
    }
}

function closeEscape(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector(".popup__opened"));
    };
};

popupAddClose.addEventListener("click", () => closePopup(popupAdd));
popupEditClose.addEventListener("click", () => closePopup(popupEdit));
popupFullClose.addEventListener("click", () => closePopup(popupFull));

popupEdit.addEventListener("click", overlayClickClose);
popupFull.addEventListener("click", overlayClickClose);
popupAdd.addEventListener("click", overlayClickClose);

addButton.addEventListener("click", () => {
    addFormValidator.enableValidation();
    openPopup(popupAdd);
});

function openFull(item) {
    popupFullImg.src = item.link;
    popupFullImg.alt = item.name;
    popupFullTitle.textContent = item.name;
    openPopup(popupFull);
};

function poppupFullAddCard() {
    const newCardTitle = imgTitleInput.value;
    const newCardLink = imgLinkInput.value;
    const card = new Card({ name: newCardTitle, link: newCardLink }, "#temlateElements", openFull);
    const newItem = card.generateCard();
    grid.prepend(newItem);
    closePopup(popupAdd);
    formAdd.reset();
}

formAdd.addEventListener("submit", poppupFullAddCard);

editButton.addEventListener("click", () => {
    openPopup(popupEdit);
    overlayClickClose;
    nameInput.value = showTitle.textContent;
    statusInput.value = showStatus.textContent;
    editFormValidator.enableValidation();
});

function profileValue() {
    showTitle.textContent = nameInput.value;
    showStatus.textContent = statusInput.value;
    closePopup(popupEdit);
}

formEdit.addEventListener("submit", profileValue);