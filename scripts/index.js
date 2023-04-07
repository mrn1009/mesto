const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupContent = popup.querySelector('.popup__container')
const popupCloseButton = popupContent.querySelector('.popup__close');
const form = popupContent.querySelector('.popup__form')
const nameInput = form.querySelector('.popup__input_type_name');
const postInput = form.querySelector('.popup__input_type_post');
const profileName = document.querySelector('.profile__name');   
const profilePost = document.querySelector('.profile__post');     

editButton.addEventListener("click", openPopup);

function openPopup() {
    popup.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    postInput.value = profilePost.textContent;
  }
 
popupCloseButton.addEventListener("click", closePopup);

function closePopup() {
    popup.classList.remove("popup_opened");
  }
  
function formSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profilePost.textContent = postInput.value;
    closePopup();
  }
  
  form.addEventListener("submit", formSubmit);