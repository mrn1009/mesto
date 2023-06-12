export const popups = document.querySelectorAll('.popup');
export const popupElementUser = document.querySelector('.popup_user'); 
export const popupElementPlace = document.querySelector('.popup_place');
export const popupOpenButtonElementUser = document.querySelector('.profile__edit-button');
export const popupOpenButtonElementPlace = document.querySelector('.profile__add-button');
export const popupElementView = document.querySelector('.view');
export const formElementUser = document.forms.popupFormUser;
export const nameUserInput = formElementUser.elements.nameUser;
export const jobInput = formElementUser.elements.jobUser;

export const objForValidation = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});