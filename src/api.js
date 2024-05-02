export { initProfileSection, getInitialCards, sendProfileData, sendCardData, deleteCard, likeCard, unLikeCard, setNewAvatar, isUrlExist };

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-12',
    headers: {
      authorization: 'aefb9d6c-0be1-424f-9825-78d813242522',
      'Content-Type': 'application/json'
    }
  }

function handleResponse(res){
    if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function initProfileSection() {
    return fetch( `${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers,
    } )
    .then(handleResponse)
    .catch( (err) => {
        console.log(err);
    } ); 
}

function getInitialCards() {
    return fetch( `${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
    } )
    .then(handleResponse)
    .catch( (err) => {
        console.log(err);
    } );
}

function sendProfileData(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify( {
            name: `${name}`,
            about: `${about}`
        } )
    } )
    .then(handleResponse)
    .catch( (err) => {
        console.log(err);
    } );
}

function sendCardData(name, link) {
    return fetch( `${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify( {
            name: `${name}`,
            link: `${link}`
          } )
    } )
    .then(handleResponse)
    .catch( (err) => {
        console.log(err);
    } );
}

function deleteCard(cardId) {
    return fetch( `${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    } )
}

function likeCard(cardId) {
    return fetch( `${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    } )
    .then(handleResponse)
    .catch( (err) => {
        console.log(err);
    } )
}

function unLikeCard(cardId) {
    return fetch( `${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    } )
    .then(handleResponse)
    .catch( (err) => {
        console.log(err);
    } )
}

function setNewAvatar(avatarUrl) {
    return fetch( `${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify( {
            avatar: `${avatarUrl}`
        } )
    } )
    .then(handleResponse)
    .catch( (err) => {
        console.log(err);
    } )
}

function isUrlExist(avatarUrl) {
    return fetch( `${avatarUrl}`, {
        method: 'HEAD'
    } )
}
