import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
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
const editFormValidator = new FormValidator(validationConfig, formEdit);

const fullPopup = new PopupWithImage(popupFull);
fullPopup.setEventListeners();

const section = new Section({
        item: initialCards,
        renderer: (item) => {
            const card = new Card(item, "#temlateElements", (item) => { fullPopup.open(item) });
            const cardElements = card.generateCard();
            section.addItem(cardElements)
        }
    },
    grid
);
section.renderItems();

const popupAddCard = new Popup(popupAdd);
popupAddCard.setEventListeners();

const popupEditProfile = new Popup(popupEdit);
popupEditProfile.setEventListeners();

editButton.addEventListener("click", () => {
    editFormValidator.enableValidation();
    const profileInfo = userInfo.getUserInfo();
    nameInput.value = profileInfo.profileName;
    statusInput.value = profileInfo.profileStatus;
    popupEditProfile.open();
});

const userInfo = new UserInfo({
    profileNameSelector: showTitle,
    profileStatusSelector: showStatus
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

addButton.addEventListener("click", () => {
    addFormValidator.enableValidation();
    popupAddCard.open();
})

const formAddCopy = new PopupWithForm(popupAdd, {
    handleFormSubmit: (formData) => {
        const newCard = new Card(formData, "#temlateElements", (formData) => {
            fullPopup.open(formData)
        });
        const cardElement = newCard.generateCard();
        section.addItem(cardElement);
    }
})
formAddCopy.setEventListeners();