import pencil from '../images/Pencil.svg';
import {api} from '../utils/api';
import react from 'react';
import Card from './Card';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {


    const[userName, setUserName]=react.useState(" ");
    const[userDescription, setUserDescription]=react.useState(" ");
    const[userAvatar, setUserAvatar]=react.useState(" ");
    const[cards, setCards]=react.useState([ ]);

react.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([dataUser, dataCards]) =>{
        setUserName(dataUser.name);
        setUserDescription(dataUser.about);
        setUserAvatar(dataUser.avatar);
        setCards(dataCards);
    })
    .catch((err) => {console.log(err);
    });
})



    return (<>
        <main className="content">
            <section className="profile">
                <div className="info">
                    <div className="info__photo" style={{ backgroundImage: `url(${userAvatar})` }} >
                        <img className="info__photo-edit" src={pencil}  alt="Обновить аватар" onClick={onEditAvatar}/>
                    </div>
                    <h1 className="info__name">{userName}</h1>
                    <button className="info__edit" type="button" onClick={onEditProfile}>
                    </button>
                    <p className="info__work">{userDescription}</p>
                </div>
                <button className="button" type="button" onClick={onAddPlace}>
                </button>
            </section>
            <section className="elements">
                {cards.map((card)=>{
                    return <Card 
                    card={card}
                    key={card._id} 
                    name={card.name} 
                    link={card.link} 
                    likes={card.likes.length} 
                    onCardClick={onCardClick}/>
                })}
            </section>
        </main>
        </>)}

        export default Main;