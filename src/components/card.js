export { createCardElem, handleLikeClick };
import { openPopup } from './modal';
import { likeCard, unLikeCard } from '../api';

function createCardElem( name, picture, setImageTypePopup, handleLikeClick, likesQuantityValue, matchIdResult, cardId, isLikedByMe, popupTypeDeleteConfirm, deleteConfirmButton) {
    const cardTemplate = document.querySelector('#card-template').content;
    const placesItemClone = cardTemplate.cloneNode('#card-template');
    const likeButton = placesItemClone.querySelector('.card__like-button');
    const cardImage = placesItemClone.querySelector('.card__image');
    const cardTitle = placesItemClone.querySelector('.card__title');
    const deleteButton = placesItemClone.querySelector('.card__delete-button');
    const likesQuantityElem = document.createElement('div');
    const likesContainer = placesItemClone.querySelector('.card__likes-container');
    const placesItem = placesItemClone.querySelector('.places__item')

    cardTitle.textContent = name;
    cardImage.src = picture;
    cardImage.alt = name;
    placesItem.setAttribute('id', `${cardId}`)

    if(isLikedByMe) likeButton.classList.toggle('card__like-button_is-active')

    if(likesQuantityValue) {
        likesQuantityElem.textContent = likesQuantityValue;
        likesContainer.append(likesQuantityElem)
    }

    if(matchIdResult) {
        deleteButton.style.display = 'inline-block';
    }

    deleteButton.addEventListener('click', (evt) => {
        openPopup(popupTypeDeleteConfirm);
        const cardToDelete = evt.target.closest('li');
        const cardId = cardToDelete.getAttribute('id');
        deleteConfirmButton.setAttribute('data-card-to-delete-id', `${cardId}`)
    });

    cardImage.addEventListener('click', setImageTypePopup);
    likeButton.addEventListener('click', (evt) => handleLikeClick(evt, cardId, likesQuantityElem, likesContainer));
    
    return placesItemClone;
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



