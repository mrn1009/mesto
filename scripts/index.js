const popups = document.querySelectorAll('.popup')
const popupArray = Array.from(popups);
const elementsContainer = document.querySelector('.elements');
const templateElement = document.querySelector('.template').content;
const figurePopup = document.querySelector('.popup_type_figure');
const figureContent = figurePopup.querySelector('.popup__figure');
const figureImage = figureContent.querySelector('.popup__image');
const figureCaption = figureContent.querySelector('.popup__caption');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const editForm = editPopup.querySelector('.popup__form_type_edit');
const addForm = addPopup.querySelector('.popup__form_type_add');
const nameField = editForm.querySelector('.popup__input_type_name');
const postField = editForm.querySelector('.popup__input_type_post');
const placeField = addForm.querySelector('.popup__input_type_place');
const linkField = addForm.querySelector('.popup__input_type_link');
const profileName = document.querySelector('.profile__name');
const profilePost = document.querySelector('.profile__post');


function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscapePress);
} 

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscapePress);
} 

function createCard(item) {
    const element = templateElement.querySelector('.element').cloneNode(true);
    const image = element.querySelector('.element__image');
    image.style.backgroundImage = `url('${item.link}')`;
    element.querySelector('.element__title').textContent = item.name;

    element.querySelector('.element__delete').addEventListener('click', function(event) {
        element.remove();
    })

    const likeButton = element.querySelector('.element__like');
    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('element__like_active');
    })

    image.addEventListener('click', (event) => {
        if (event.target.classList.contains('element__image')) {
            openPopup(figurePopup);
        }
        figureImage.src = item.link;
        figureImage.alt = item.name;
        figureCaption.textContent = item.name;
    })

    return element;
}

function appendCard(item) {
    const element = createCard(item);
    elementsContainer.prepend(element);
}

function submitEditForm(event) {
    event.preventDefault()
    profileName.textContent = nameField.value;
    profilePost.textContent = postField.value;
    closePopup(editPopup);
}

function addCard(event) {
    event.preventDefault();

    const place = placeField.value;
    const link = linkField.value;
    const item = {
        name: place,
        link: link
    }
    appendCard(item);
    event.target.reset();

    
    toggleButtonState(inputList, buttonElement);   

    closePopup(addPopup);
}

const inputList = Array.from(addForm.querySelectorAll(validationConfig.inputSelector));
const buttonElement = addForm.querySelector(validationConfig.submitButtonSelector);

function setUserInfoValues() {
    nameField.value = profileName.textContent; 
    postField.value = profilePost.textContent;
} 

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    }) 
})

function closeByEscapePress(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    };
};

initialCards.forEach(appendCard);

editButton.addEventListener('click', ()=> {
    openPopup(editPopup);
    setUserInfoValues();
})

addButton.addEventListener('click', ()=> openPopup(addPopup));
editForm.addEventListener('submit', submitEditForm);
addForm.addEventListener('submit', addCard);

enableValidation(validationConfig);