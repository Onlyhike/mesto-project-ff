export { openPopup, closePopup }

function openPopup(popupElem) {
    popupElem.classList.add('popup_is-opened');
    
    document.addEventListener( 'click', closeOnClickHandle );
    document.addEventListener( 'keydown', closeOnEscPressHandle );
}

function closePopup(popupElem) {
    popupElem.classList.remove('popup_is-opened');

    document.removeEventListener( 'click', closeOnClickHandle );
    document.removeEventListener( 'keydown', closeOnEscPressHandle );
}

function closeOnClickHandle(evt) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) closePopup(document.querySelector('.popup_is-opened'));
}

function closeOnEscPressHandle(evt) {
    if (evt.key === 'Escape') closePopup(document.querySelector('.popup_is-opened'));
};

