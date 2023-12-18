import React from 'react';
import BookingAuthorizationRegister from "./BookingAuthorizationRegister.jsx";
import BookingAuthorizationLogin from "./BookingAuthorizationLogin.jsx";

const BookingAuthorization = props => {
    return (
        <div className="booking w-full flex justify-center flex-col items-center">
            <div className="booking__container w-11/12 md:w-7/12 py-10 ">
                <div className="booking__login bg-container-grey p-10 mb-10 rounded-2xl">
                    <p className="text-4xl mb-4">Zarezerwuj wizytę</p>
                    <p className="text-2xl ">Posiadam konto</p>
                    <BookingAuthorizationLogin goToBookingConfirmation={props.goToBookingConfirmation}
                                               goToSystemReservation={props.goToSystemReservation}/>
                </div>
                <div className="booking__register bg-container-grey p-10 rounded-2xl">
                    <p className="text-4xl flex justify-center mb-4">Rezerwuj jako gość, automatycznie stworzymy dla ciebie konto</p>
                    <BookingAuthorizationRegister goToBookingConfirmation={props.goToBookingConfirmation}
                                                  goToSystemReservation={props.goToSystemReservation}/>
                </div>
            </div>
        </div>
    );
};


export default BookingAuthorization;
