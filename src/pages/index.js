import "../pages/index.css";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import DeletePopup from "../components/DeletePopup.js";
import {
    popupEdit,
    popupAdd,
    popupFull,
    editButton,
    submitButtonAdd,
    submitButtonEdit,
    addButton,
    nameInput,
    statusInput,
    formEdit,
    formAdd,
    showTitle,
    showStatus,
    grid,
    validationConfig,
    popupDelete,
    editPopupAvatar,
    avatar,
    formAvatar,
    updateAvatar,
    editAvatar
} from "../utils/constants.js";

let userId = null;
let templateCard = null;

const addFormValidator = new FormValidator(validationConfig, formAdd);
addFormValidator.enableValidation();
const editFormValidator = new FormValidator(validationConfig, formEdit);
editFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(validationConfig, formAvatar);
avatarFormValidator.enableValidation();


const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-20/',
    headers: {
        authorization: '485f0781-93d2-4545-87ad-d84942ee0ff3',
        'Content-Type': 'application/json'
    }
})

const getProfilePromise = new Promise(() => {
    api.getProfileInfo()
        .then((result) => {
            userId = result._id;
            userInfo.setUserInfo(result);
            userInfo.updateAvatar(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

const getInitialCardPromise = new Promise(() => {
    api.getInitialCards()
        .then((res) => {
            section.renderItems(res);
        })
        .catch((err) => {
            console.log(err);
        })
});
Promise.all([getProfilePromise, getInitialCardPromise]).then((resolve, subj) => {
    console.log(resolve);
    console.log(subj);
});

function createCard(item) {
    const cardItem = new Card({...item, userId },
        "#temlateElements",
        (item) => { fullPopup.open(item) },
        api, {
            handleDeleteClick: (item) => {
                deletePopup.open(item);
                templateCard = card;
            }
        });
    const card = cardItem.generateCard();
    return card;
}

const fullPopup = new PopupWithImage(popupFull);
fullPopup.setEventListeners();

const section = new Section({
        renderer: (item) => {
            section.addItem(createCard(item));
        }
    },
    grid
)

const formAddItem = new PopupWithForm(popupAdd, {
    handleFormSubmit: (formData) => {
        formAddItem.renderLoading(false);
        api.postCard(formData)
            .then((formData) => {
                section.addOneItem(createCard(formData));
                formAddItem.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                formAddItem.renderLoading(true);
            })
    }
})

formAddItem.setEventListeners();

addButton.addEventListener("click", () => {
    formAddItem.open();
    addFormValidator.clearSpanError();
    addFormValidator.clearTypeError();
    addFormValidator.validationButton(submitButtonAdd, formAdd.checkValidity());
})

const profileEditForm = new PopupWithForm(popupEdit, {
    handleFormSubmit: (formData) => {
        profileEditForm.renderLoading(false);
        api.editProfile(formData)
            .then((formData) => {
                userInfo.setUserInfo({
                    newProfileName: formData.name,
                    newProfileStatus: formData.about
                })
                userInfo.setUserInfo(formData);
                profileEditForm.close();
            })
            .catch((err) => {
                console.log(err);
            })

        .finally(() => {
            profileEditForm.renderLoading(true);
        })
    }
})
profileEditForm.setEventListeners();

editButton.addEventListener("click", () => {
    const profileInfo = userInfo.getUserInfo();
    nameInput.value = profileInfo.profileName;
    statusInput.value = profileInfo.profileStatus;
    profileEditForm.open();
    editFormValidator.clearSpanError();
    editFormValidator.clearTypeError();
    editFormValidator.validationButton(submitButtonEdit, formEdit.checkValidity());
});

const deletePopup = new DeletePopup(popupDelete, {
    handleFormSubmit: (data) => {
        api.removeCard(data)
            .then(() => {
                templateCard.remove();
                deletePopup.close();
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

deletePopup.setEventListeners();

const avatarChange = new PopupWithForm(editPopupAvatar, {
    handleFormSubmit: (formData) => {
        avatarChange.renderLoading(false);
        api.updateAvatar(formData)
            .then((formData) => {
                userInfo.updateAvatar(formData);
                avatarChange.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                avatarChange.renderLoading(true);
            })
    }
})

avatarChange.setEventListeners();

editAvatar.addEventListener("click", () => {
    avatarFormValidator.validationButton(updateAvatar, formAvatar.checkValidity());
    avatarChange.open();
})

const userInfo = new UserInfo(showTitle, showStatus, avatar);