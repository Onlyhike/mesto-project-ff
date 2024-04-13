export { createCardElem, handleLikeClick, deleteListItem };



function createCardElem(name, picture, deleteListItem, openFunc, handleLikeClick) {
    const cardTemplate = document.querySelector('#card-template').content;
    const placesItem = cardTemplate.cloneNode('#card-template');
    const likeButton = placesItem.querySelector('.card__like-button');
    const cardImage = placesItem.querySelector('.card__image');
    const cardTitle = placesItem.querySelector('.card__title');
    const deleteButton = placesItem.querySelector('.card__delete-button');

    cardTitle.textContent = name;
    cardImage.src = picture;
    cardImage.alt = name;

    deleteButton.addEventListener('click', deleteListItem);
    cardImage.addEventListener('click', openFunc);
    likeButton.addEventListener('click', handleLikeClick);
    
    return placesItem;
}

function handleLikeClick(evt) {
    evt.target.classList.toggle('card__like-button_is-active')
}

function deleteListItem(evt) { 
    evt.target.closest('li').remove()
};
