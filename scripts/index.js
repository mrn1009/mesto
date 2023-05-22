import Card from './Card.js';
import {initialCards} from './initial-card.js';
import FormValidation from './FormValidator.js';

const popups = document.querySelectorAll('.popup');
const popupElementUser = document.querySelector('.popup_user');
const popupElementPlace = document.querySelector('.popup_place');
const popupOpenButtonElementUser = document.querySelector('.profile__edit-button');
const popupOpenButtonElementPlace = document.querySelector('.profile__add-button');
const popupElementView = document.querySelector('.view');
const elementGrid = document.querySelector('.elements');
const viewCaption = popupElementView.querySelector('.view__caption');
const viewPhoto = popupElementView.querySelector('.view__photo');
const profileInfo = document.querySelector('.profile__info');
const newProfileTitle = profileInfo.querySelector('.profile__title');
const newProfileSubtitle = profileInfo.querySelector('.profile__subtitle');

const formElementUser = document.forms.popupFormUser;
const nameUserInput = formElementUser.elements.nameUser;
const jobInput = formElementUser.elements.jobUser;
const formElementPlace = document.forms.popupFormPlace;
const namePlaceInput = formElementPlace.elements.namePlace;
const linkInput = formElementPlace.elements.linkPlace;

const objForValidation = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

const userFormValidator = new FormValidation(objForValidation, popupElementUser);
userFormValidator.enableValidation(popupElementUser);

const placeFormValidator = new FormValidation(objForValidation, popupElementPlace);
placeFormValidator.enableValidation(popupElementPlace);

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

function closedPopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

popupOpenButtonElementUser.addEventListener('click', () => {
  nameUserInput.value = newProfileTitle.textContent;
  jobInput.value = newProfileSubtitle.textContent;
  openPopup(popupElementUser);
  userFormValidator.resetValidation();
});

popupOpenButtonElementPlace.addEventListener('click', () => {
  openPopup(popupElementPlace);
  namePlaceInput.value = '';
  linkInput.value = '';
  placeFormValidator.resetValidation();
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closedPopup(popup)
    }
    if (evt.target.classList.contains('popup__closed')) {
      closedPopup(popup)
    }
  })
});

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closedPopup(openedPopup);
  };
};

function handleFormUserSubmit (evt) {
    evt.preventDefault();
    newProfileTitle.textContent = nameUserInput.value;
    newProfileSubtitle.textContent = jobInput.value;
    closedPopup(popupElementUser);
}
formElementUser.addEventListener('submit', handleFormUserSubmit);

function handleZoomPhoto(name, link) {
  openPopup(popupElementView);
  viewCaption.textContent = name;
  viewPhoto.src = link;
  viewPhoto.alt = name;
};

const createCard = (data) => {
  const card = new Card(data, '#cards', handleZoomPhoto);
  const elementList = card.generateCard();
  return elementList;
}

initialCards.forEach((item) => {
  elementGrid.append(createCard(item));
});

const addCard = (data) => {
  elementGrid.prepend(createCard(data, handleZoomPhoto));
};

function handleFormPLaceSubmit (evt) {
  evt.preventDefault();
  const elementList = {
    name: namePlaceInput.value,
    link: linkInput.value,
    handleZoomPhoto: handleZoomPhoto
  }
  addCard(elementList);
  closedPopup(popupElementPlace);
};

formElementPlace.addEventListener('submit', handleFormPLaceSubmit);
