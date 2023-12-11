import React, {useEffect} from 'react';
import {ReCAPTCHA} from "react-google-recaptcha";
import {useAuth} from "../auth/AuthContext.jsx";
import {checkIfUserLogged, getLogin} from "../auth/api.jsx";
import {postReservation} from "../api.jsx";

const BookingConfirmation = (props) => {
    const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth()
    const CAPTCHA_SITE_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY
    const handleReservation = async () => {
        let form = new FormData()
        form.append("title", props.selectedPlanHour.plan.title)
        form.append("user_id", authUser.id)
        form.append("work_hours_id", props.selectedPlanHour.time_data.id)
        try {
            await postReservation(form)

        } catch (err) {
            console.log(err.response)
        }
        // await navigate("/");

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
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    Twoje zamówienie
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
            <ReCAPTCHA
                sitekey={CAPTCHA_SITE_KEY}
            />
            <button onClick={handleReservation}>Potwierdź rezerwację</button>
        </div>

    );
};

export default BookingConfirmation;
