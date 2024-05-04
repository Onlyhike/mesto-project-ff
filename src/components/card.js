export { createCardElem, handleLikeClick, deleteListItem, openConfirmDeletePopup };
import { likeCard, unLikeCard, deleteCard } from '../api';
import { closePopup, openPopup } from './modal';

function createCardElem( name, picture, setImageTypePopup, handleLikeClick, likesQuantityValue, ownerId, cardId, likesArray, myId, deleteListItem, openConfirmDeletePopup) {
    const cardTemplate = document.querySelector('#card-template').content;
    const placesItemClone = cardTemplate.cloneNode('#card-template');
    const likeButton = placesItemClone.querySelector('.card__like-button');
    const cardImage = placesItemClone.querySelector('.card__image');
    const cardTitle = placesItemClone.querySelector('.card__title');
    const deleteButton = placesItemClone.querySelector('.card__delete-button');
    const likesQuantityElem = placesItemClone.querySelector('.card__likes-quantity');
    const deleteConfirmButton = document.querySelector('.popup__button_delete-confirm');
    const popupTypeDeleteConfirm = document.querySelector('.popup_type_delete-confirm');
    const placesItem = placesItemClone.querySelector('.places__item')
    const isLikedByMe = likesArray.some( (likeObj) => {
        return likeObj._id === myId
      } );
    const matchIdResult = myId === ownerId;
    cardTitle.textContent = name;
    cardImage.src = picture;
    cardImage.alt = name;

    placesItem.setAttribute('id', `${cardId}`)

    if (isLikedByMe) likeButton.classList.toggle('card__like-button_is-active')

    if (likesQuantityValue) {
        likesQuantityElem.textContent = likesQuantityValue;
    }

    if (matchIdResult) {
        deleteButton.style.display = 'inline-block';
        deleteButton.addEventListener( 'click', () => openConfirmDeletePopup(popupTypeDeleteConfirm, deleteConfirmButton, deleteListItem, cardId));
    }

    cardImage.addEventListener('click', setImageTypePopup);
    likeButton.addEventListener( 'click', (evt) => {
        handleLikeClick(evt, cardId, likesQuantityElem)
    } );
    
    return placesItemClone;
}

function openConfirmDeletePopup(confirmPopup, confirmButton, deleteFunc, cardId) {
    openPopup(confirmPopup);
    confirmButton.setAttribute('data-card-to-delete-id', `${cardId}`)
    confirmButton.addEventListener('click', deleteFunc)
}
    
function deleteListItem(evt) {
    const cardId = evt.target.getAttribute('data-card-to-delete-id');
    const cardToDelete = document.getElementById(`${cardId}`); //здесь не разобрался почему не работает document.querySelector(`#${cardId}`), поэтому оставил getElementById
    const confirmPopupOpened = document.querySelector('.popup_is-opened')
    deleteCard(cardId)
    .then( () => {
    cardToDelete.remove();
    evt.target.removeEventListener('click', deleteListItem)
    closePopup(confirmPopupOpened);
    } )
    .catch( (err) => {
        console.log(err);
    } )
    };

function handleLikeClick(evt, cardId, likesQuantityElem) {   
    if (!evt.target.classList.contains('card__like-button_is-active')) {
        likeCard(cardId)
        .then((res) => {
            likesQuantityElem.textContent = res.likes.length;
            evt.target.classList.toggle('card__like-button_is-active');
        })
        .catch( (err) => {
            console.log(err);
        } )
    } else {
        unLikeCard(cardId)
        .then((res) => {
            likesQuantityElem.textContent = res.likes.length || '';
            evt.target.classList.toggle('card__like-button_is-active');
        })
        .catch( (err) => {
            console.log(err);
        } )
    }
  }




