import React from 'react';
import BookingAuthorizationRegister from "./BookingAuthorizationRegister.jsx";
import BookingAuthorizationLogin from "./BookingAuthorizationLogin.jsx";
import {useTranslation} from "react-i18next";

const BookingAuthorization = props => {
    const {t} = useTranslation()
    return (
        <div className="booking w-full flex justify-center flex-col items-center text-white">
            <div className="booking__container w-11/12 md:w-7/12 py-10 ">
                <div className="booking__login bg-container-grey p-10 mb-10 rounded-2xl">
                    <p className="text-4xl mb-4">{t("Book an appointment")}</p>
                    <p className="text-2xl ">{t("I have an account")}</p>
                    <BookingAuthorizationLogin goToBookingConfirmation={props.goToBookingConfirmation}
                                               goToSystemReservation={props.goToSystemReservation}/>
                </div>
                <div className="booking__register bg-container-grey p-10 rounded-2xl">
                    <p className="text-4xl flex justify-center mb-4">{t("Book as a guest, and we will automatically create an account for you.")}</p>
                    <BookingAuthorizationRegister goToBookingConfirmation={props.goToBookingConfirmation}
                                                  goToSystemReservation={props.goToSystemReservation}/>
                </div>
            </div>
        </div>
    );
};


export default BookingAuthorization;
