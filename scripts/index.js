// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу



const cardTemplate = document.querySelector('#card-template').content;
let placesList = document.querySelector('.places__list');

function createCardElem(name, picture, deleteFunction) {
    let placesItem = cardTemplate.cloneNode('#card-template');
    let cardImage = placesItem.querySelector('.card__image');
    let cardTitle = placesItem.querySelector('.card__title');
    let cardTitleContent = name;
    let link = picture;
    let deleteButton = placesItem.querySelector('.card__delete-button')
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
