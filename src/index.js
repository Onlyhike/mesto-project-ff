import '../src/pages/index.css';
import { createCardElem, handleLikeClick, deleteListItem } from './components/card';
import { openPopup, closePopup } from './components/modal';
import { enableValidation, clearValidation } from './validation';
import { initProfileSection, getInitialCards, sendProfileData, sendCardData, setNewAvatar, isUrlExist  } from './api';

const placesList = document.querySelector('.places__list');
const buttonOpenEditProfileForm = document.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');
const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.name;
const descriptionInput = editProfileForm.description;

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const newPlaceform = document.forms['new-place'];
const placeFormField = newPlaceform['place-name'];
const pictureFormField = newPlaceform.link;
const popupCaption = document.querySelector('.popup__caption');

const popupTypeNewAvatar = document.querySelector('.popup_type_new-avatar');
const newAvatarForm = document.forms['new-avatar'];
const avatarUrl = newAvatarForm.link;

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');

const popupTypeDeleteConfirm = document.querySelector('.popup_type_delete-confirm');
const deleteConfirmButton = document.querySelector('.popup__button_delete-confirm');

const validationConfig = {
  formSelector: 'popup__form',
  inputSelector: 'popup__input',
  submitButtonSelector: 'popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error',
}

let myId;

function setImageTypePopup(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openPopup(popupTypeImage);
}

function openConfirmDeletePopup(cardId) {
  deleteConfirmButton.setAttribute('data-card-to-delete-id', `${cardId}`); 
  openPopup(popupTypeDeleteConfirm);
}

function addNewPlace(evt) {
  changeSubmitBtnState(evt);

  sendCardData(placeFormField.value, pictureFormField.value)
  .then( (result) => {
    const newCard = createCardElem( result.name, result.link, setImageTypePopup, handleLikeClick, 0, result.owner._id, result._id, result.likes, myId, openConfirmDeletePopup);
    placesList.prepend(newCard)
  } )
  .catch( (err) => {
      console.log(err);
    } )
  .finally( () => changeSubmitBtnState(evt) );

  evt.target.reset();
  evt.preventDefault();
  closePopup(popupTypeNewCard);
}

function initEditProfileForm() {
  clearValidation(editProfileForm, validationConfig);

  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleEditFormSubmit(evt) {
  changeSubmitBtnState(evt);

  sendProfileData(nameInput.value, descriptionInput.value)
  .then( (result) => {
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
  } )
  .catch( (err) => {
      console.log(err);
    } )
  .finally( () => changeSubmitBtnState(evt) );
  
  evt.preventDefault();

  closePopup(popupTypeEdit);
}

function changeSubmitBtnState(evt) {
  const loadingText = evt.target.querySelector(`.popup__button_loading-text`);
  const initialText = evt.target.querySelector(`.popup__button_initial-text`);
  loadingText.classList.toggle('popup_button_text-is-visible');
  initialText.classList.toggle('popup_button_text-is-visible');
}

deleteConfirmButton.addEventListener('click', (evt) =>{
  deleteListItem(evt)
})

placesList.addEventListener( 'click', (evt) => {
    if ( evt.target.classList.contains('card__image') ) {
        openPopup(popupTypeImage);
    }
} )

profileImage.addEventListener( 'click', () => {
  clearValidation(newAvatarForm, validationConfig);

  openPopup(popupTypeNewAvatar);
} );

buttonOpenEditProfileForm.addEventListener( 'click', () => {
  initEditProfileForm(nameInput, profileName, descriptionInput, profileDescription);
  openPopup(popupTypeEdit);
} );

buttonOpenAddCardForm.addEventListener( 'click', () => {
  clearValidation(newPlaceform, validationConfig);

  openPopup(popupTypeNewCard);
} );

newAvatarForm.addEventListener( 'submit', (evt) => {
  evt.preventDefault();
  changeSubmitBtnState(evt);

  isUrlExist(avatarUrl.value)
  .then( (res) => {
    if ( res.ok && ( res.headers.get('Content-Type').startsWith('image') ) ) {
      setNewAvatar(res.url)
      .then( (res) => {
        profileImage.setAttribute('style', `background-image: url('${res.avatar}')`);
        closePopup(popupTypeNewAvatar);
      } )
    } else {
        return Promise.reject( {
          errorMessage: `Ошибка в isUrlExist ${res.status}`,
          mimeType: res.headers.get('Content-Type')
      } )
    }
} )
  .catch( (err) => {
    console.log(err.errorMessage);
    if (!err.mimeType.startsWith('image')){
      console.log('По указанному Url не изображение');
    }
  } )
  .finally( () => changeSubmitBtnState(evt) )
} )

editProfileForm.addEventListener( 'submit', (evt) => {
    handleEditFormSubmit(evt);
} );

newPlaceform.addEventListener( 'submit', (evt) => {
  addNewPlace(evt);
} );

enableValidation(validationConfig);

Promise.all( [ initProfileSection(), getInitialCards() ] )
  .then( ( [profileRes, cardRes] ) => {
    myId = profileRes._id;

    profileName.textContent = profileRes.name;
    profileDescription.textContent = profileRes.about;
    profileImage.setAttribute('style', `background-image: url('${profileRes.avatar}')`);

    cardRes.forEach( (card) => {
      placesList.append( createCardElem(card.name, card.link, setImageTypePopup, handleLikeClick, card.likes.length, card.owner._id, card._id, card.likes, myId, openConfirmDeletePopup) )
    } );
  } )
  .catch( (err) => {
    console.log(err);
  } );
