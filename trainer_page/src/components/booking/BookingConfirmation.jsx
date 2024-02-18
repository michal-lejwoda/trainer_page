import React, {useEffect} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import {useAuth} from "../auth/AuthContext.jsx";
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
            return err.response
        }

    }
    //Use auth
    useEffect(() => {
        if (authUser === null) {
            props.goToSystemReservation()
        }
    }, [])


    return (
        <div className="flex items-center flex-col">
            <h1 className="py-4 ">Potwierdzenie zamówienia</h1>
            <div className="sm:flex sm:items-start mb-5">
                <div className="my-3 text-center sm:ml-4 sm:mt-0 sm:text-left text-4xl">
                    <div className="mt-2 p-10 bg-even-more-darky-grey rounded-lg">
                        <p className="text-gray-500 text-white text-center text-4xl font-semibold pb-4">
                            Twoje zamówienie
                        </p>
                        <p className="text-gray-500 text-white text-xl py-2">
                            <span className="font-semibold">Tytuł:</span> {props.selectedPlanHour.plan.title}
                        </p>
                        <p className="text-gray-500 text-white text-xl py-2">
                            <span className="font-semibold">Cena:</span> {props.selectedPlanHour.plan.price} {props.selectedPlanHour.plan.currency}
                        </p>
                        <p className="text-gray-500 text-white text-xl py-2">
                            <span className="font-semibold">Godzina rozpoczęcia:</span> {props.selectedPlanHour.time_data.start_time}
                        </p>
                        <p className="text-gray-500 text-white text-xl py-2">
                            <span className="font-semibold">Godzina zakończenia:</span> {props.selectedPlanHour.time_data.end_time}
                        </p>
                        <div className="py-4">
                            <ReCAPTCHA
                                sitekey={CAPTCHA_SITE_KEY}
                            />
                        </div>
                        <button className="text-2xl" onClick={handleReservation}>Potwierdź rezerwację</button>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default BookingConfirmation;
