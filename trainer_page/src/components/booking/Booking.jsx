import React, {useEffect, useState} from 'react';
import BookingAuthorization from "./BookingAuthorization.jsx";
import SystemReservation from "./SystemReservation.jsx";
import BookingConfirmation from "./BookingConfirmation.jsx";
import PaymentPage from "../payments/PaymentPage.jsx";


const Booking = () => {
    const [bookingStep, setBookingStep] = useState(1)
    const [trainer, setTrainer] = useState(null)
    const [trainerPlan, setTrainerPlan] = useState(null)
    const [selectedPlanHour, setSelectedPlanHour] = useState(null)
    const [reservation, setReservation] = useState(null)
    const [clientSecretKey, setClientSecretKey] = useState(null)


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
    const goToCheckoutForm = () => {
        setBookingStep(4)
    }


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
                                                       goToCheckoutForm={goToCheckoutForm}
                                                       setReservation={setReservation}
                                                       setClientSecretKey={setClientSecretKey}/>}
            {bookingStep === 4 && clientSecretKey && (
                <PaymentPage
                    clientSecretKey={clientSecretKey}
                    selectedPlanHour={selectedPlanHour}
                    reservation={reservation}
                />
            )}

        </>
    );
};

export default Booking;
