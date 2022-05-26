import React from "react";


function InfoTooltip({onClose, infoToolTip, message}) {
    function handleCloseByClick(evt) {
        if (evt.currentTarget === evt.target) {
            onClose();
        }
    }

    return (
        <div onClick={handleCloseByClick} className={`popup popup_type_tooltip ${infoToolTip.open && 'popup_opened'}`}>
            <div className="popup__content">
                <figure className="popup__fieldset">
                    <button className="popup__close popup__close_button" type="button" onClick={onClose} />
                    <img className="popup__icon" src={message.pathIcon} alt="Иконка статуса регистрации"/>
                    <figcaption  className='popup__title popup__title_tooltip'>{message.text}
                    </figcaption >
                </figure>
            </div>
        </div>
    );
}

export default InfoTooltip;