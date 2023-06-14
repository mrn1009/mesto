import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidation from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithQuestion from '../components/PopupWithQuestion.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {objForValidation} from '../utils/constants.js';
import {popupElementUser,
        popupElementPlace,
        popupElementAvatar,
        popupOpenButtonElementUser,
        popupOpenButtonElementPlace,
        buttonEditAvatar,
        nameUserInput,
        jobInput,
        submitButtons} from '../utils/constants.js';

import './index.css';

// создаем экземпляр класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: 'ab8a5103-cafe-4d34-aecd-dfeba40f1516',
    'Content-Type': 'application/json'
  }
});

let id;

// получаем карточки и информацию о пользователе с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([res, cardData]) => {
    userInfo.setUserInfo(res);
    id = res._id;
    defaultCardList.renderItems(cardData.reverse());
  })
  .catch((err) => console.log(err));


// создаем экземпляр класса профиля
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});


// создаем экземпляр класса просмотра изображения
const popupWithImage = new PopupWithImage('.view');
popupWithImage.setEventListeners();


// функция открытия попапа просмотра изображения
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
};


// функция добавления новой карточки
const createCard = (cardData) => {
  const card = new Card(cardData, '#cards', handleCardClick,
  {deleteCard: (cardId) => {
    popupWithQuestion.open();
    popupWithQuestion.submitCallback(() => {
      api.deleteCard(cardId)
        .then(() => {
          card.handleCardDelete();
          popupWithQuestion.close();
        })
        .catch((err) => {
          console.log(`${err}`);
        })
    });
  },
  handleLikeClick: () => {
    if(card.checkOwnerLike()) {
      api.removeLike(card.getCardId())
        .then((res) => {
          card.deleteLike();
          card.showCounterLike(res.likes);
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    } else {
      api.putLike(card.getCardId())
        .then((res) => {
          card.addLike();
          card.showCounterLike(res.likes);

        })
        .catch((err) => {
          console.log(`${err}`);
        });
    }
  }
}, id);
  const cardElement = card.generateCard();
  return cardElement;
};


// создаем экземпляр класса Section
const defaultCardList = new Section ({
  renderer: (cardData) => {
    defaultCardList.addItem(createCard(cardData));
  }
}, '.elements');


// создаем экземпляр класса для попапа добавления карточки
const popupAddPlace = new PopupWithForm('.popup_place', {
  handleFormSubmit: (data) => {
    popupAddPlace.addRenderLoading();
    api.addCard(data)
      .then((res) => {console.log(res)
        defaultCardList.addItem(createCard(res));
        popupAddPlace.close();
        })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        popupAddPlace.startRenderLoading();
      })
    }
})
popupAddPlace.setEventListeners();

// слушатель на кнопку добавления карточки
popupOpenButtonElementPlace.addEventListener('click', () => {
  popupAddPlace.open();
  placeFormValidator.resetValidation();
});


// создаем экземпляр класса для попапа редактирования профиля
const popupEditProfile = new PopupWithForm('.popup_user', {
  handleFormSubmit: (data) => {
    popupEditProfile.addRenderLoading();
    api.changeUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupEditProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupEditProfile.startRenderLoading();
      });
  }
});
popupEditProfile.setEventListeners();

// слушатель на кнопку редактирования профиля
popupOpenButtonElementUser.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameUserInput.value = userData.name;
  jobInput.value = userData.about;
  popupEditProfile.open();
  userFormValidator.resetValidation();
});


// создаем экземпляр класса для попапа изменения аватара
const popupEditAvatar = new PopupWithForm('.popup_avatar', {
  handleFormSubmit: (userAvatar) => {
    popupEditAvatar.addRenderLoading();
    api.changeAvatar(userAvatar)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEditAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupEditAvatar.startRenderLoading();
      });
  }
});
popupEditAvatar.setEventListeners();

// слушатель на кнопку редактирования аватара
buttonEditAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
  avatarFormValidator.resetValidation();
});

const popupWithQuestion = new PopupWithQuestion('.popup_deletecard');
popupWithQuestion.setEventListeners();


// создаем экземпляры класса валидации для форм
const userFormValidator = new FormValidation(objForValidation, popupElementUser);
userFormValidator.enableValidation(popupElementUser);

const placeFormValidator = new FormValidation(objForValidation, popupElementPlace);
placeFormValidator.enableValidation(popupElementPlace);

const avatarFormValidator = new FormValidation(objForValidation, popupElementAvatar);
avatarFormValidator.enableValidation(popupEditAvatar)