let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupContent = popup.querySelector('.popup__content')
let popupCloseButton = popupContent.querySelector('.popup__close');
let form = popupContent.querySelector('.popup__form')
let nameField = form.querySelector('.popup__input_type_name');
let postField = form.querySelector('.popup__input_type_post');
let profileName = document.querySelector('.profile__name');
let profilePost = document.querySelector('.profile__post');

function openPopup() {
    nameField.setAttribute('value', profileName.textContent);
    postField.setAttribute('value', profilePost.textContent);

    popup.classList.add('popup_isOpen');
}

function closePopup() {
    popup.classList.remove('popup_isOpen');
}

editButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

function submitForm(event) {
    event.preventDefault()

    profileName.textContent = nameField.value;
    profilePost.textContent = postField.value;

    closePopup();
}

form.addEventListener('submit', submitForm);

function popupClickHandler(event) {
    if (event.target.classList.contains('popup')) {
        closePopup()
    }
}

popup.addEventListener('mouseup', popupClickHandler)