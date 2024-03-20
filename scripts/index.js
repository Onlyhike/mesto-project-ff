// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу



const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCardElem(name, picture, deleteFunction) {
    const placesItem = cardTemplate.cloneNode('#card-template');
    const cardImage = placesItem.querySelector('.card__image');
    const cardTitle = placesItem.querySelector('.card__title');
    const cardTitleContent = name;
    const link = picture;
    const deleteButton = placesItem.querySelector('.card__delete-button')
    cardTitle.textContent = cardTitleContent;
    cardImage.src =  link;
    cardImage.alt = cardTitleContent;
    deleteButton.addEventListener('click', deleteFunction);
    return placesItem;
}

function deleteFunction(event) { 
    event.target.closest('.places__item').remove()
};

initialCards.forEach( item => placesList.append( createCardElem(item.name, item.link, deleteFunction) ) );
