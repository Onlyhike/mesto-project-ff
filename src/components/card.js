export { createCardElem, handleLikeClick, deleteListItem };
import { deleteCard, likeCard, unLikeCard } from '../api'

function createCardElem( name, picture, deleteListItem, setImageTypePopup, handleLikeClick, likesQuantityValue, matchIdResult, cardId, isLikedByMe) {
    const cardTemplate = document.querySelector('#card-template').content;
    const placesItem = cardTemplate.cloneNode('#card-template');
    const likeButton = placesItem.querySelector('.card__like-button');
    const cardImage = placesItem.querySelector('.card__image');
    const cardTitle = placesItem.querySelector('.card__title');
    const deleteButton = placesItem.querySelector('.card__delete-button');
    const likesQuantityElem = document.createElement('div');
    const likesContainer = placesItem.querySelector('.card__likes-container');

    cardTitle.textContent = name;
    cardImage.src = picture;
    cardImage.alt = name;

    if(isLikedByMe) likeButton.classList.toggle('card__like-button_is-active')

    if(likesQuantityValue) {
        likesQuantityElem.textContent = likesQuantityValue;
        likesContainer.append(likesQuantityElem)
    }

    if(matchIdResult) {
        deleteButton.style.display = 'inline-block';
    }

    deleteButton.addEventListener('click', (evt) => deleteListItem(evt, cardId));
    cardImage.addEventListener('click', setImageTypePopup);
    likeButton.addEventListener('click', (evt) => handleLikeClick(evt, cardId, likesQuantityElem, likesContainer));
    
    return placesItem;
}

function handleLikeClick(evt, cardId, likesQuantityElem, likesContainer) {
    if(!evt.target.classList.contains('card__like-button_is-active')) {
        likeCard(cardId)
        .then((result) => {
            evt.target.classList.toggle('card__like-button_is-active');
            if(result.likes.length === 1) likesContainer.append(likesQuantityElem);
            likesQuantityElem.textContent = result.likes.length;
        })
        .catch((err) => {
            console.log(err);
        })
    } else {
        unLikeCard(cardId)
        .then((result) => {
            evt.target.classList.toggle('card__like-button_is-active');
            if(result.likes.length === 0) likesQuantityElem.remove();
            likesQuantityElem.textContent = result.likes.length;
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

function deleteListItem(evt, cardId) {
    deleteCard(cardId)
    .then((res) => {
        if(res.ok) {
            evt.target.closest('li').remove()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    })
    .catch((err) => {
        console.log(err);
    })
};

