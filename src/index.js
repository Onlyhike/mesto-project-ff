import '../src/pages/index.css';
import { initialCards } from './cards';
import { createCardElem, handleLikeClick, deleteListItem } from './components/card';
import { openPopup, setImageTypePopup, addNewPlace, initEditProfileForm, handleEditFormSubmit } from './components/modal'



const placesList = document.querySelector('.places__list');
const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.name;
const descriptionInput = editProfileForm.description;
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const newPlaceform = document.forms['new-place'];
const placeFormField = newPlaceform['place-name'];
const pictureFormField = newPlaceform.link;
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');



initialCards.forEach( item => placesList.append( createCardElem(item.name, item.link, deleteListItem, setImageTypePopup, handleLikeClick) ) );

editButton.addEventListener( 'click', () => {
    initEditProfileForm(nameInput, profileName, descriptionInput, profileDescription);
    openPopup('popup_type_edit');
    editProfileForm.addEventListener( 'submit', (evt) => handleEditFormSubmit(evt, nameInput, profileName, descriptionInput, profileDescription) )
} );

addButton.addEventListener( 'click', () => openPopup('popup_type_new-card') );

newPlaceform.addEventListener( 'submit', (evt) => addNewPlace(evt, createCardElem( placeFormField.value, pictureFormField.value, deleteListItem, setImageTypePopup, handleLikeClick) ) );





