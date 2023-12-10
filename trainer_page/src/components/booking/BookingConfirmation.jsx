import React, {useEffect} from 'react';
import {ReCAPTCHA} from "react-google-recaptcha";
import {useAuth} from "../auth/AuthContext.jsx";

const BookingConfirmation = (props) => {
    const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth()
    const handleReservation = () => {
        console.log("authUser")
        console.log(authUser)
        console.log("handleReservation")
        console.log(props.selectedPlanHour)
    }
    //Use auth
    useEffect(() => {
        if (authUser === null) {
            props.goToSystemReservation()
        }
    }, [])


    return (
        <div>
            <h1>Booking Confirmation</h1>
            <div className="sm:flex sm:items-start">
                <div
                    className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/*<ExclamationTriangleIcon className="h-6 w-6 text-red-600"*/}
                    {/*                         aria-hidden="true"/>*/}
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    {/*<Dialog.Title as="h3"*/}
                    {/*              className="text-base font-semibold leading-6 text-gray-900">*/}
                    Twoje zamówienie
                    {/*</Dialog.Title>*/}
                    <div className="mt-2">

                        <p className="text-sm text-gray-500">
                            Tytuł: {props.selectedPlanHour.plan.title}
                        </p>
                        <p className="text-sm text-gray-500">
                            Cena: {props.selectedPlanHour.plan.price} {props.selectedPlanHour.plan.currency}
                        </p>
                        <p className="text-sm text-gray-500">
                            Godzina rozpoczęcia: {props.selectedPlanHour.time_data.start_time}
                        </p>
                        <p className="text-sm text-gray-500">
                            Godzina zakończenia: {props.selectedPlanHour.time_data.end_time}
                        </p>
                    </div>
                </div>
            </div>
            <ReCAPTCHA sitekey={"6LeEIYMmAAAAAIl0vfJ5BqGZqAybQhT5PvAPSk9r"}/>
            <button onClick={handleReservation}>Potwierdź rezerwację</button>
        </div>

    );
};

export default BookingConfirmation;
