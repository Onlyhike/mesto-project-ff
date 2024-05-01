import '../src/pages/index.css';
import { createCardElem, handleLikeClick, deleteListItem } from './components/card';
import { openPopup, closePopup } from './components/modal';
import { enableValidation, clearValidation } from './validation';
import { initProfileSection, getInitialCards, sendProfileData, sendCardData, setNewAvatar, isUrlExist } from './api';

const placesList = document.querySelector('.places__list');
const editProfileForm = document.forms['edit-profile'];
const newAvatarForm = document.forms['new-avatar'];
const avatarUrl = newAvatarForm.link;
const nameInput = editProfileForm.name;
const descriptionInput = editProfileForm.description;
const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const newPlaceform = document.forms['new-place'];
const placeFormField = newPlaceform['place-name'];
const pictureFormField = newPlaceform.link;
const buttonOpenEditProfileForm = document.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');
const popupTypeNewAvatar = document.querySelector('.popup_type_new-avatar');
const validationConfig = {
  formSelector: 'popup__form',
  inputSelector: 'popup__input',
  submitButtonSelector: 'popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error',
}
let myId;
let matchIdResult;

function setImageTypePopup(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openPopup(popupTypeImage);
}

function addNewPlace(evt) {
  changeSubmitBtnState(evt);
  sendCardData(placeFormField.value, pictureFormField.value)
  .then((result) => {
    matchIdResult = myId === result.owner._id;
    const newCard = createCardElem( result.name, result.link, deleteListItem, setImageTypePopup, handleLikeClick, 0, matchIdResult, result._id, false);

    placesList.prepend(newCard)
  })
  .catch((err) => {
      console.log(err);
    })
  .finally(() => changeSubmitBtnState(evt));

  evt.target.reset();
  evt.preventDefault();
  closePopup(popupTypeNewCard);
}

function initEditProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  clearValidation(editProfileForm, validationConfig);
}

function handleEditFormSubmit(evt) {
  changeSubmitBtnState(evt);
  sendProfileData(nameInput.value, descriptionInput.value)
  .then((result) => {
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
  })
  .catch((err) => {
      console.log(err);
    })
  .finally(() => changeSubmitBtnState(evt));
  
  evt.preventDefault();

  closePopup(popupTypeEdit);
}

function changeSubmitBtnState(evt) {
  const loadingText = evt.target.querySelector(`.popup__button_loading-text`);
  const initialText = evt.target.querySelector(`.popup__button_initial-text`);
  loadingText.classList.toggle('popup_button_text-is-visible')
  initialText.classList.toggle('popup_button_text-is-visible')
}

placesList.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('card__image')) {
        openPopup(popupTypeImage);
    }
})

profileImage.addEventListener('click', () => {
  clearValidation(newAvatarForm, validationConfig);
  newAvatarForm.reset()
  openPopup(popupTypeNewAvatar);
});

newAvatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  changeSubmitBtnState(evt);

  isUrlExist(avatarUrl.value)
  .then((res) => {
    if(res.ok && (res.headers.get('Content-Type').startsWith('image'))) {
      setNewAvatar(res.url)
      .then((res) => {
        profileImage.setAttribute('style', `background-image: url('${res.avatar}')`);
        closePopup(popupTypeNewAvatar);
      })
    } else {
        return Promise.reject(`Ошибка в isUrlExist ${res.status}, res.ok = ${res.ok}`)
    }
})
  .catch((err) => {
    console.log(err);
    closePopup(popupTypeNewAvatar);
  })
  .finally(() => changeSubmitBtnState(evt))
})

buttonOpenEditProfileForm.addEventListener( 'click', () => {
    initEditProfileForm(nameInput, profileName, descriptionInput, profileDescription);
    openPopup(popupTypeEdit);
} );

editProfileForm.addEventListener( 'submit', (evt) => {
    handleEditFormSubmit(evt);
} );

buttonOpenAddCardForm.addEventListener( 'click', () => {
    openPopup(popupTypeNewCard);
    newPlaceform.reset();
    clearValidation(newPlaceform, validationConfig)
} );

newPlaceform.addEventListener( 'submit', (evt) => {
  addNewPlace(evt);
} );

enableValidation(validationConfig);

Promise.all([initProfileSection(), getInitialCards()])
  .then(([profileRes, cardRes]) => {
    myId = profileRes._id;

    profileName.textContent = profileRes.name;
    profileDescription.textContent = profileRes.about;
    profileImage.setAttribute('style', `background-image: url('${profileRes.avatar}')`);

    cardRes.forEach((card) => {
      matchIdResult = myId === card.owner._id;

      let isLikedByMe = card.likes.some((likeObj) => {
        return likeObj._id === myId
      })
      placesList.append( createCardElem(card.name, card.link, deleteListItem, setImageTypePopup, handleLikeClick, card.likes.length, matchIdResult, card._id, isLikedByMe) )
    } );
  })
  .catch((err) => {
    console.log(err);
  });
