export default class Card {
    constructor(data, cardSelector, openFull) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._openFull = openFull;

    }
    _getTemplate() {
        const newCard = document
            .querySelector(this._cardSelector)
            .content
            .querySelector(".grid-elements__element")
            .cloneNode(true);

        return newCard;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector(".grid-elements__title").textContent = this._name;
        const cardImage = this._element.querySelector(".grid-elements__img");
        cardImage.src = this._link;
        cardImage.alt = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector(".grid-elements__delete").addEventListener("click", () => {
            this._remove();
        })
        this._element.querySelector(".grid-elements__like").addEventListener("click", () => {
            this._like();
        })
        this._element.querySelector(".grid-elements__img").addEventListener("click", () => {
            this._openFull({ name: this._name, link: this._link });
        })
    }
    _removeEventListeners() {
        this._element.querySelector(".grid-elements__delete").removeEventListener("click", () => {
            this._remove();
        })
        this._element.querySelector(".grid-elements__like").removeEventListener("click", () => {
            this._like();
        })
        this._element.querySelector(".grid-elements__img").removeEventListener("click", () => {
            this._openFull({ name: this._name, link: this._link });
        })
    }
    _remove() {
        this._element.closest(".grid-elements__element").remove();
        this._removeEventListeners();
    }
    _like() {
        this._element.querySelector(".grid-elements__like").classList.toggle("grid-elements__like_active");
    }

}