import React, {useEffect, useState} from 'react';
import BookingAuthorization from "./BookingAuthorization.jsx";
import SystemReservation from "./SystemReservation.jsx";
import BookingConfirmation from "./BookingConfirmation.jsx";

const Booking = () => {
    const [bookingStep, setBookingStep] = useState(1)
    const [trainer, setTrainer] = useState(null)
    const [trainerPlan, setTrainerPlan] = useState(null)
    const [selectedPlanHour, setSelectedPlanHour] = useState(null)


    useEffect(() => {
        setBookingStep(1);
    }, [])

    const goToSystemReservation = () => {
        setBookingStep(1)
    }

    const goToBookingAuthorization = () => {
        setBookingStep(2)
    }

    const goToBookingConfirmation = () => {
        setBookingStep(3)
    }

    console.log("selectedPlanHour", selectedPlanHour)

    return (
        <>
            {bookingStep === 1 && <SystemReservation
                setTrainer={setTrainer}
                setTrainerPlan={setTrainerPlan}
                setSelectedPlanHour={setSelectedPlanHour}
                trainer={trainer}
                trainerPlan={trainerPlan}
                selectedPlanHour={selectedPlanHour}
                goToBookingAuthorization={goToBookingAuthorization}
                goToBookingConfirmation={goToBookingConfirmation}/>}
            {bookingStep === 2 && <BookingAuthorization goToBookingConfirmation={goToBookingConfirmation}
                                                        goToSystemReservation={goToSystemReservation}/>}
            {bookingStep === 3 && <BookingConfirmation goToSystemReservation={goToSystemReservation}
                                                       selectedPlanHour={selectedPlanHour}

            />}
        </>
    );
};

export default Booking;
