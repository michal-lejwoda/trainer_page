import React from 'react';
import BookingAuthorizationRegister from "./BookingAuthorizationRegister.jsx";
import BookingAuthorizationLogin from "./BookingAuthorizationLogin.jsx";

const BookingAuthorization = props => {
    return (
        <>
            <BookingAuthorizationLogin goToBookingConfirmation={props.goToBookingConfirmation} goToSystemReservation={props.goToSystemReservation} />
            <BookingAuthorizationRegister goToBookingConfirmation={props.goToBookingConfirmation} goToSystemReservation={props.goToSystemReservation} />
        </>
    );
};



export default BookingAuthorization;
