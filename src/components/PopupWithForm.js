
function PopupWithForm(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_visible' : ""}`}>
        <div className="popup__content">
            <h2 className="popup__title">{props.title}</h2>
            <form className="form form_profile" name={props.name}>
                {props.children}
            </form>
            <button className="form__button" type="submit">{props.buttonText}</button>
            <button aria-label="Закрыть" type="button" className="popup__close-button" onClick={props.onClose}></button>
        </div>
        </div>
        )}
        export default PopupWithForm;