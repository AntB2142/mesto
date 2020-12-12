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
const popup = document.querySelector(".popup");

const grid = document.querySelector(".grid-elements");
const templateContent = document.querySelector("#temlateElements").content;

const init = () => {
    editButton.addEventListener("click", () => openPopup(popupEdit));
    addButton.addEventListener("click", () => openPopup(popupAdd));
    formEdit.addEventListener("submit", submitEdit);
    formAdd.addEventListener("submit", submitAdd);
    popupEditClose.addEventListener('click', () => closePopup(popupEdit));
    popupAddClose.addEventListener('click', () => closePopup(popupAdd));
    popupFullClose.addEventListener('click', () => closePopup(popupFull));



    newElements.forEach((elem) => {
        addElementToDOM(elem);
    });
}

const createCard = (elem) => {
    const name = elem.name;
    const link = elem.link;

    const newElement = templateContent.cloneNode(true);
    const newElementImg = newElement.querySelector(".grid-elements__img");

    newElementImg.src = link;
    newElementImg.alt = name;
    newElement.querySelector(".grid-elements__title").textContent = name;

    newElement.querySelector(".grid-elements__img").addEventListener("click", (e) => {
        popupFullImg.src = e.target.currentSrc;
        popupFullImg.alt = e.target.alt;
        popupFull.querySelector(".popup__full-title").textContent = e.target.alt;
        openPopup(popupFull);
    })

    newElement.querySelector(".grid-elements__like").addEventListener("click", (e) => {
        e.target.classList.toggle("grid-elements__like_active");
    });




    newElement.querySelector(".grid-elements__delete").addEventListener("click", (e) => {

        e.target.closest('.grid-elements__element').remove();
    })

    return newElement;
}

const addElementToDOM = (elem) => {
    grid.prepend(createCard(elem));
}

const openPopup = (popup) => {
    popup.classList.add("popup__opened");
}

const closePopup = (popup) => {
    popup.classList.remove("popup__opened");
}

const profileValue = (title, status) => {
    showTitle.textContent = title;
    showStatus.textContent = status;
    nameInput.value = showTitle.textContent;
    statusInput.value = showStatus.textContent;
}

const submitEdit = (e) => {
    e.preventDefault();
    if (nameInput && statusInput) {
        profileValue(nameInput.value, statusInput.value);
    }

    closePopup(popupEdit);
}

const submitAdd = (e) => {
    e.preventDefault();
    const submitValue = { "name": imgTitleInput.value, 'link': imgLinkInput.value };
    addElementToDOM(submitValue);
    closePopup(popupAdd);
}





init();