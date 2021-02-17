export default class Card {
    constructor(data, cardSelector, handleCardClick, api, { handleDeleteClick }) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._userId = data.userId;
        this._id = data._id;
        this._api = api;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick
        this._likes = data.likes.length
        this._idOwner = data.owner._id;
        this.likeId = data.likes;
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
        this._likeSymbol = this._element.querySelector(".grid-elements__like");
        this._likeNumber = this._element.querySelector(".grid-elements__like-number");
        this._likeNumber.textContent = this._likes;
        this.myLikeCard(this.findLike());
        this._setEventListeners();
        this._element.querySelector(".grid-elements__title").textContent = this._name;
        const cardImage = this._element.querySelector(".grid-elements__img");
        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._notMyDelete();
        return this._element;
    }
    _notMyDelete() {
        if (this._idOwner !== this._userId) {
            this._element.querySelector(".grid-elements__delete").remove();
        }
    }

    _setEventListeners() {
        this._likeSymbol.addEventListener("click", () => {
            if (this._likeSymbol.classList.contains("grid-elements__like_active")) {
                this._deleteLike();

            } else {
                this._handleLikeClick();

            }
        })

        this._element.querySelector(".grid-elements__delete").addEventListener("click", () => {
            this._handleDeleteClick(this._data);

        });

        this._element.querySelector(".grid-elements__img").addEventListener("click", () => {
            this._handleCardClick({ name: this._name, link: this._link });
        })
    }

    _remove() {
        this._element.closest(".grid-elements__element").remove();
        this._element = null;
    }
    _onLike() {
        this._likeSymbol.classList.add("grid-elements__like_active");
    }
    _offLike() {
        this._likeSymbol.classList.remove("grid-elements__like_active");
    }
    findLike() {
        return Boolean(this.likeId.find((obj => obj._id !== this._userId)));
    }
    myLikeCard(myLike) {
        if (myLike) {
            this._onLike();
        }
    }

    _handleLikeClick() {
        this._api
            .putLike(this._id)
            .then((res) => {
                this._likes = res.likes.length;
                this._likeNumber.textContent = this._likes;
                this._onLike();
            })
    }
    _deleteLike() {
        this._api
            .deleteLike(this._id)
            .then((res) => {
                this._likes = res.likes.length;
                this._likeNumber.textContent = this._likes;
                this._offLike();
            })
    }
}