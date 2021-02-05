export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;

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
            this._handleCardClick({ name: this._name, link: this._link });
        })
    }

    _remove() {
        this._element.closest(".grid-elements__element").remove();
        this._element = null;
    }
    _like() {
        this._element.querySelector(".grid-elements__like").classList.toggle("grid-elements__like_active");
    }

}