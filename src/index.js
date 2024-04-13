import '../src/pages/index.css';
import { initialCards } from './cards';
import { createCardElem, handleLikeClick, deleteListItem } from './components/card';
import { openPopup, closePopup } from './components/modal';

const placesList = document.querySelector('.places__list');
const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.name;
const descriptionInput = editProfileForm.description;
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

function setImageTypePopup(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openPopup(popupTypeImage);
}

function addNewPlace(evt, createFunc) {
    const placesList = document.querySelector('.places__list');

    placesList.prepend(createFunc);

    evt.target.reset();
    evt.preventDefault();
    closePopup(popupTypeNewCard);
}

function initEditProfileForm(nameInput, profileName, descriptionInput, profileDescription) {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
}

function handleEditFormSubmit(evt, nameInput, profileName, descriptionInput, profileDescription) {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    
    evt.preventDefault();

    closePopup(popupTypeEdit);
}

initialCards.forEach( item => placesList.append( createCardElem(item.name, item.link, deleteListItem, setImageTypePopup, handleLikeClick) ) );

placesList.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('card__image')) {
        openPopup(popupTypeImage);
    }
})

buttonOpenEditProfileForm.addEventListener( 'click', () => {
    initEditProfileForm(nameInput, profileName, descriptionInput, profileDescription);
    openPopup(popupTypeEdit);
} );

editProfileForm.addEventListener( 'submit', (evt) => {
    handleEditFormSubmit(evt, nameInput, profileName, descriptionInput, profileDescription);
} );

buttonOpenAddCardForm.addEventListener( 'click', () => openPopup(popupTypeNewCard) );

newPlaceform.addEventListener( 'submit', (evt) => addNewPlace(evt, createCardElem( placeFormField.value, pictureFormField.value, deleteListItem, setImageTypePopup, handleLikeClick) ) );






