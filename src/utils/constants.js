export const popupEdit = document.querySelector("#editPopup");
export const popupAdd = document.querySelector("#addPopup");
export const popupFull = document.querySelector("#fullPopup");
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const formEdit = document.querySelector("#formEdit");
export const nameInput = formEdit.querySelector("#name");
export const statusInput = formEdit.querySelector("#status");
export const formAdd = document.querySelector("#formAdd");
export const grid = document.querySelector(".grid-elements");
export const showTitle = document.querySelector(".profile__title");
export const showStatus = document.querySelector(".profile__subtitle");
export const submitButtonAdd = popupAdd.querySelector(".popup__submit");
export const submitButtonEdit = popupEdit.querySelector(".popup__submit");
export const popupDelete = document.querySelector("#deletePopup");
export const formDelete = document.querySelector("#formDelete");
export const avatar = document.querySelector(".profile__avatar");
export const editPopupAvatar = document.querySelector("#avatarPopup");
export const formAvatar = document.querySelector("#formAvatar");
export const updateAvatar = formAvatar.querySelector(".popup__submit");
export const editAvatar = document.querySelector(".profile__edit-avatar");



export const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    inputErrorClass: "popup__input_error",
    errorClass: "popup__error"
};
export const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];