import '../pages/index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import react from 'react';

function App() {

    const[isEditProfilePopupOpen, setisEditProfilePopupOpen]=react.useState(false);
    const[isAddPlacePopupOpen, setisAddPlacePopupOpen]=react.useState(false);
    const[isEditAvatarPopupOpen, setisEditAvatarPopupOpen]=react.useState(false);
    const[selectedCard, setSelectedCard]=react.useState({name:'', link:''});


    const handleEditAvatarClick = () => {
        setisEditAvatarPopupOpen(true)
    }
    
    const handleEditProfileClick = () => {
        setisEditProfilePopupOpen(true)
    }
    
    const handleAddPlaceClick = () => {
        setisAddPlacePopupOpen(true)
    }

    const handleCardClick = (card) => {
        setSelectedCard(card)
    }

    const closeAllPopups = () => {
        setisEditAvatarPopupOpen(false)
        setisEditProfilePopupOpen(false)
        setisAddPlacePopupOpen(false)
        setSelectedCard({name:'', link:''})
    }

    return (
    <>
    <div className="body">
    <div className="page">
        <Header />
        <Main 
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        />
        <Footer />
    </div>
    </div>


    <PopupWithForm title="Редактировать профиль" name="profile" buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}>
            <fieldset className="form__fieldset">
                <input type="text" name="name" placeholder="Введите имя" className="form__item form__item_el_name" 
                id="input_name" minLength="2" maxLength="40" required autoComplete="off"/>
                <span className="form__item-error" id="input_name-error"></span>
                <input type="text" name="about" placeholder="Введите род занятий" className="form__item form__item_el_work" 
                id="input_work" minLength="2" maxLength="200" required autoComplete="off"/>
                <span className="form__item-error" id="input_work-error"></span>
            </fieldset>
    </PopupWithForm>

    <PopupWithForm title="Обновить аватар" name="avatar" buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
                <fieldset className="form__fieldset">
                    <span className="form__item-error" id="avatar_name-error"></span>
                    <input type="url" name="avatar_url" placeholder="Ссылка на аватар" className=" form__item form__item_el_url" id="input_avatar" required autoComplete="off"/>
                    <span className="form__item-error" id="input_avatar-error"></span>
                </fieldset>
    </PopupWithForm>

    <PopupWithForm title="Новое место" name="add-cards" buttonText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
            <fieldset className="form__fieldset">
                <input type="text" name="name" placeholder="Название" className="form__item form__item_el_discr" id="input_discr" minLength="2" maxLength="30" required autoComplete="off"/>
                <span className="form__item-error" id="input_discr-error"></span>
                <input type="url" name="link" placeholder="Ссылка на картинку" className="form__item form__item_el_img" id="input_img" required autoComplete="off"/>
                <span className="form__item-error" id="input_img-error"></span>
            </fieldset>
    </PopupWithForm>

    <ImagePopup 
        card={selectedCard}
        onClose={closeAllPopups}
    />

    <div className="popup popup_confirm">
        <div className="popup__content">
            <button className="popup__close-button popup__close" type="button"></button>
            <h2 className="popup__title">Вы уверены?</h2>
            <button className="popup__button">Да</button>
        </div>
    </div>

</>);
    }

    export default App;