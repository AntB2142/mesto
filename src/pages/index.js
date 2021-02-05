import "../pages/index.css";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import {
    popupEdit,
    popupAdd,
    popupFull,
    editButton,
    addButton,
    nameInput,
    statusInput,
    formEdit,
    formAdd,
    showTitle,
    showStatus,
    grid,
    validationConfig,
    initialCards
} from "../utils/constants.js";

const addFormValidator = new FormValidator(validationConfig, formAdd);
addFormValidator.enableValidation();
const editFormValidator = new FormValidator(validationConfig, formEdit);
editFormValidator.enableValidation();

function createCard(item, popupSelector, handleCardClick) {
    const cardItem = new Card(item, popupSelector, handleCardClick);
    const card = cardItem.generateCard();
    return card;
}

const fullPopup = new PopupWithImage(popupFull);
fullPopup.setEventListeners();

const section = new Section({
        item: initialCards,
        renderer: (item) => {
            section.addItem(createCard(item, "#temlateElements", (item) => { fullPopup.open(item) }));
        }
    },
    grid
);

section.renderItems();

const formAddItem = new PopupWithForm(popupAdd, {

    handleFormSubmit: (formData) => {
        section.addItem(createCard(formData, "#temlateElements", (formData) => { fullPopup.open(formData) }));
    }
})

formAddItem.setEventListeners();

addButton.addEventListener("click", () => {
    formAddItem.open();
})

const profileEditForm = new PopupWithForm(popupEdit, {
    handleFormSubmit: (formData) => {
        userInfo.setUserInfo({
            newProfileName: formData.name,
            newProfileStatus: formData.status
        })
    }
})
profileEditForm.setEventListeners();

editButton.addEventListener("click", () => {
    profileEditForm.open();
    const profileInfo = userInfo.getUserInfo();
    nameInput.value = profileInfo.profileName;
    statusInput.value = profileInfo.profileStatus;
});

const userInfo = new UserInfo({
    profileNameSelector: showTitle,
    profileStatusSelector: showStatus
})