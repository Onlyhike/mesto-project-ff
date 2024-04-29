export { enableValidation, clearValidation }

function showInputError(errElement, formField, inputErrorClass) {
    formField.classList.add(inputErrorClass);

    if(formField.validity.patternMismatch) {
        formField.setCustomValidity(formField.getAttribute('data-error-message'));
    } else {
        formField.setCustomValidity('');
    }

    errElement.textContent = formField.validationMessage;
}

function hideInputError(errElement, formField, inputErrorClass) {
    formField.classList.remove(inputErrorClass);
    errElement.textContent = '';
}

function hasInvalid(form, formFieldSelector) {
    const formFieldsArr = Array.from(form.querySelectorAll(`.${formFieldSelector}`));
    return formFieldsArr.some((formField) => {
        if(!formField.validity.valid) {
            return true
        }
    })
}

function toggleButtonState(containsElement, inactiveButtonClass, ButtonClass, formFieldSelector) {
    const button = containsElement.querySelector(`.${ButtonClass}`);
    if(hasInvalid(containsElement, formFieldSelector)) {
        button.classList.add(inactiveButtonClass);
        button.setAttribute('disabled', '');
    } else {
        button.classList.remove(inactiveButtonClass);
        button.removeAttribute('disabled', '');
    }
}

function isValid(form, formField, inputErrorClass) {
    const errElement = form.querySelector(`.${formField.id}-error`);
    
    if(formField.validity.valid) {
        hideInputError(errElement, formField, inputErrorClass)
    } else {
        showInputError(errElement, formField, inputErrorClass)
    }
}

function setEventListeners(form, inputErrorClass, inputSelector, inactiveButtonClass, ButtonClass) {
    const formFieldsList = form.querySelectorAll(`.${inputSelector}`)

    formFieldsList.forEach((formField) => formField.addEventListener('input', () => {
        isValid(form, formField, inputErrorClass);
        toggleButtonState(form, inactiveButtonClass, ButtonClass, inputSelector)
    }))
}

function enableValidation(configObj) {
    const formsArr = document.querySelectorAll(`.${configObj.formSelector}`);

    formsArr.forEach((form) => {
        setEventListeners(form, configObj.inputErrorClass, configObj.inputSelector, configObj.inactiveButtonClass, configObj.submitButtonSelector)
    })
}

function clearValidation(form, configObj) {
    toggleButtonState(form, configObj.inactiveButtonClass, configObj.submitButtonSelector, configObj.inputSelector)
    const formFieldsList = form.querySelectorAll(`.${configObj.inputSelector}`);
    formFieldsList.forEach((formField) => {
        const errElement = form.querySelector(`.${formField.id}-error`)
        hideInputError(errElement, formField, configObj.inputErrorClass)
    })
}