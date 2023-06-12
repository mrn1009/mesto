import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidation from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards} from '../utils/array.js';
import {objForValidation} from '../utils/constants.js';
import {popupElementUser,
        popupElementPlace,
        popupOpenButtonElementUser,
        popupOpenButtonElementPlace,
        nameUserInput,
        jobInput} from '../utils/constants.js';

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle',
});

const popupWithImage = new PopupWithImage('.view');
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
};

function createCard(cardData) {
  const card = new Card(cardData, '#cards', handleCardClick);
  const elementList = card.generateCard();
  return elementList;
};

const defaultCardList = new Section ({
  items: initialCards,
  renderer: (cardData) => {
    defaultCardList.addItem(createCard(cardData));
  }
}, '.elements');
defaultCardList.renderItems();


const popupAddPlace = new PopupWithForm('.popup_place', {
  handleFormSubmit: (placeData) => {
    defaultCardList.addItem(createCard(placeData));
    }
})
popupAddPlace.setEventListeners();

popupOpenButtonElementPlace.addEventListener('click', () => {
  popupAddPlace.open();
  placeFormValidator.resetValidation();
});

const popupEditProfile = new PopupWithForm('.popup_user', {
  handleFormSubmit: ({nameUser, jobUser}) => {
    userInfo.setUserInfo(nameUser, jobUser);
  }
});
popupEditProfile.setEventListeners();

popupOpenButtonElementUser.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameUserInput.value = userData.userName;
  jobInput.value = userData.userJob;
  popupEditProfile.open();
  userFormValidator.resetValidation();
});

const userFormValidator = new FormValidation(objForValidation, popupElementUser);
userFormValidator.enableValidation(popupElementUser);

const placeFormValidator = new FormValidation(objForValidation, popupElementPlace);
placeFormValidator.enableValidation(popupElementPlace);
