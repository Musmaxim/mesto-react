import '../pages/index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import PopupWithDelete from './PopupWithDelete';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {api} from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

    const [isEditProfilePopupOpen, setisEditProfilePopupOpen]=React.useState(false);
    const [isAddPlacePopupOpen, setisAddPlacePopupOpen]=React.useState(false);
    const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen]=React.useState(false);
    const [isOpenPopupDeleteCards, setisOpenPopupDeleteCards] = React.useState(false);
    const [isButtonText, setIsButtonText] = React.useState('')
    const [selectedCard, setSelectedCard]=React.useState({name:'', link:''});
    const [currentUser, setcurrentUser]=React.useState({});
    const [cards, setCards] = React.useState([]);
    const [cardRemove, setCardRemove] = React.useState({});
    
    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, cards]) => {
            setcurrentUser(userInfo);
            setCards(cards);
        })
        .catch((err) => {
            console.log(err);
        });       
    }, []);

    const handleCardLike = (card) => {
        const isliked = card.likes.some(i => i._id === currentUser._id);
        api
        .likeCard(card._id, !isliked)
        .then((newCard) => {
            setCards((cards) =>
            cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
        console.log(err);});
        
    }

    const handleCardDelete = (card) => {
        setIsButtonText('Удаление...')
        api
        .deleteCard(card._id)
        .then(() => {
            setCards(cards.filter(item => item._id !== card._id))
            closeAllPopups()
        })
        .catch((err) => {
        console.log(err);});
    }

    const handleUpdateUser = (userInfo) => {
        setIsButtonText('Сохранение...')
        api
        .setUserInfo(userInfo)
        .then(res => {
            setcurrentUser(res);
            closeAllPopups();
        })
        .catch((err) => {
        console.log(err);});
    }

    const handleUpdateAvatar = ({ avatar_url }) => {
        setIsButtonText('Сохранение...')
        api
        .setAvatar({ avatar_url })
        .then(res => {
            setcurrentUser(res);
            closeAllPopups();
        })
        .catch((err) => {
        console.log(err);});
    }

    const handleAddPlace = (newCard) => {
        setIsButtonText('Добавление...')
        api
        .addCard(newCard)
        .then(res => {
            setCards([res, ...cards]);
            closeAllPopups();
        })
        .catch((err) => {
        console.log(err);});
    }

    const handleEditAvatarClick = () => {
        setisEditAvatarPopupOpen(true)
    }
    
    const handleEditProfileClick = () => {
        setisEditProfilePopupOpen(true)
    }
    
    const handleAddPlaceClick = () => {
        setisAddPlacePopupOpen(true)
    }

    const confirmCardDelete = (card) => {
        setCardRemove(card);
        setisOpenPopupDeleteCards(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card)
    }

    const closeAllPopups = () => {
        setisEditAvatarPopupOpen(false)
        setisEditProfilePopupOpen(false)
        setisAddPlacePopupOpen(false)
        setisOpenPopupDeleteCards(false);
        setSelectedCard({name:'', link:''})
        setIsButtonText('')
    }

    return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
        <main className="content"></main>
    <div className="body">
    <div className="page">
        <Header />
        <Main 
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={confirmCardDelete}
        />
        <Footer />
    </div>
    </div>


    <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        buttonText={isButtonText}/>

    <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        buttonText={isButtonText}
        />

    <AddPlacePopup
    isOpen={isAddPlacePopupOpen}
    onClose={closeAllPopups}
    onAddPlace={handleAddPlace}
    buttonText={isButtonText}
    />

    <ImagePopup 
        card={selectedCard}
        onClose={closeAllPopups}
    />

    <PopupWithDelete 
            isOpen={isOpenPopupDeleteCards}
            onClose={closeAllPopups}
            onSubmitDelete={handleCardDelete}
            cardRemove={cardRemove}
            buttonText={isButtonText}
            
    />

    </CurrentUserContext.Provider>
</>);
    }

    export default App;