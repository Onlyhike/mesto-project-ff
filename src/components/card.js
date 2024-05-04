export { createCardElem, handleLikeClick, deleteListItem};
import { likeCard, unLikeCard, deleteCard } from '../api';
import { idCardForDelete } from '../index';
import { closePopup } from './modal';

function createCardElem( name, picture, setImageTypePopup, handleLikeClick, likesQuantityValue, ownerId, cardId, likesArray, myId, openConfirmDeletePopup) {
    const cardTemplate = document.querySelector('#card-template').content;
    const placesItemClone = cardTemplate.cloneNode('#card-template');
    const card = placesItemClone.querySelector('.places__item');
    const cardImage = placesItemClone.querySelector('.card__image');
    const cardTitle = placesItemClone.querySelector('.card__title');
    const likeButton = placesItemClone.querySelector('.card__like-button');
    const deleteButton = placesItemClone.querySelector('.card__delete-button');
    const likesQuantityElem = placesItemClone.querySelector('.card__likes-quantity');
    const isLikedByMe = likesArray.some( (likeObj) => {
        return likeObj._id === myId
      } );
    const matchIdResult = myId === ownerId;

    card.setAttribute('id', `${cardId}`)

    cardTitle.textContent = name;
    cardImage.src = picture;
    cardImage.alt = name;

    if (isLikedByMe) likeButton.classList.toggle('card__like-button_is-active')

    if (likesQuantityValue) {
        likesQuantityElem.textContent = likesQuantityValue;
    }

    if (matchIdResult) {
        deleteButton.style.display = 'inline-block';
        deleteButton.addEventListener( 'click', () => openConfirmDeletePopup(cardId) );
    }   

    cardImage.addEventListener('click', setImageTypePopup);
    likeButton.addEventListener( 'click', (evt) => handleLikeClick(evt, cardId, likesQuantityElem) );
    
    return placesItemClone;
}

function deleteListItem() {
    const cardToDelete = document.getElementById(`${idCardForDelete}`); 
    const confirmPopupOpened = document.querySelector('.popup_is-opened');
  
    deleteCard(idCardForDelete)
    .then( () => {
    cardToDelete.remove();
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




