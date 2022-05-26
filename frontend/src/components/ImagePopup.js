import React from "react";

const ImagePopup = ({card, onClose}) => {

    const handleCloseByClick = (evt) => {
        if (evt.currentTarget === evt.target) {
            onClose();
        }
    }

    return (
            <div onClick={handleCloseByClick} className={`popup popup_type_photo ${card && 'popup_opened'}`}>
                <div className="popup__photo">
                    <button className="popup__close popup__close_button" type="button" onClick={onClose} />
                    {card && <img className="popup__photo-image" src={card.link} alt={card.name}/>}
                    {card && <h3 className="popup__photo-title">{card.name}</h3>}
                </div>
            </div>
    );
}

export default ImagePopup;