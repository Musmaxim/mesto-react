
function Card (props) {

    const handleClick = () => {
        props.onCardClick(props.card);
    }  

    return (
        <article className="element">
        <img className="element__image"
        src={props.link}
        alt={props.name}
        onClick={handleClick}
        />
        <button className="element__delete" type="button"></button>
        <h2 className="element__title">{props.name}</h2>
        <div className="element__like-box">
            <button className="element__like element__like_act-none" type="button"></button>
            <div className="elements__like-count">{props.likes}</div>
        </div>
    </article>
    )
}

export default Card;