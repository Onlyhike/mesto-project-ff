export { openPopup, setImageTypePopup, addNewPlace, initEditProfileForm, handleEditFormSubmit }



function openPopup(popupClass) {
    const popup = document.querySelector(`.${popupClass}`);

    popup.classList.add('popup_is-opened');

    document.addEventListener( 'click', closeOnClickHandle );
    document.addEventListener( 'keydown', closeOnEscPressHandle );
    document.addEventListener( 'submit', closeOnSubmitHandle );
}

function closePopup() {
    const openedPopup = document.querySelector('.popup_is-opened');

    openedPopup.classList.remove('popup_is-opened');

    document.removeEventListener( 'click', closeOnClickHandle );
    document.removeEventListener( 'keydown', closeOnEscPressHandle );
    document.removeEventListener( 'submit', closeOnSubmitHandle );  
}

function closeOnClickHandle(evt) {
    if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) closePopup();
}

function closeOnSubmitHandle(evt) {
    if(evt.type === 'submit') closePopup();
}

function closeOnEscPressHandle(evt) {
    if(evt.key === 'Escape') closePopup();
}

function setImageTypePopup(evt) {
    const popupCaption = document.querySelector('.popup__caption');
    const popupImage = document.querySelector('.popup__image');

    popupImage.src = evt.target.src;
    popupCaption.textContent = evt.target.alt;

    openPopup('popup_type_image');
}

function addNewPlace(evt, createFunc) {
    const placesList = document.querySelector('.places__list');

    placesList.prepend(createFunc);

    evt.target.reset();
    evt.preventDefault();
}

function initEditProfileForm(nameInput, profileName, descriptionInput, profileDescription) {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
}

function handleEditFormSubmit(evt, nameInput, profileName, descriptionInput, profileDescription) {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    
    evt.preventDefault();
}

