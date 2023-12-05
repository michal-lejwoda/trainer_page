import React, {useEffect, useState} from 'react';
import BookingAuthorization from "./BookingAuthorization.jsx";
import SystemReservation from "./SystemReservation.jsx";
import BookingConfirmation from "./BookingConfirmation.jsx";

const Booking = () => {
    const [bookingStep, setBookingStep] = useState(1)

    useEffect(()=>{
        setBookingStep(1);
    },[])

    const goToSystemReservation = () => {
        console.log("goToSystemReservation")
        setBookingStep(1)
    }

    const goToBookingAuthorization = () =>{
        console.log("goToBookingAuthorization")
        setBookingStep(2)
    }

    const goToBookingConfirmation = () => {
        console.log("gotoBookingConfirmation")
        setBookingStep(3)
    }


    return (
        <>
            {bookingStep == 1 && <SystemReservation goToBookingAuthorization={goToBookingAuthorization} goToBookingConfirmation={goToBookingConfirmation}  />}
            {bookingStep == 2 && <BookingAuthorization goToBookingConfirmation={goToBookingConfirmation}  goToSystemReservation={goToSystemReservation} />}
            {bookingStep == 3 && <BookingConfirmation goToSystemReservation={goToSystemReservation} />}
        </>
    );
};

export default Booking;
