import React, {useEffect, useState} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import {useAuth} from "../auth/AuthContext.jsx";
import {postReservation, sendConfirmationEmail} from "../api.jsx";
import {useNavigate} from 'react-router-dom';

const BookingConfirmation = (props) => {
    const navigate = useNavigate();
    const recaptchaRef = React.createRef();
    const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth()
    const [captchaError, setCaptchaError] = useState(false)
    const CAPTCHA_SITE_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY

    const handleReservation = () => {
        let form = new FormData()
        form.append("title", props.selectedPlanHour.plan.title)
        form.append("user_id", authUser.id)
        form.append("work_hours_id", props.selectedPlanHour.time_data.id)
        try {
            if (recaptchaRef.current.getValue().length !== 0) {
                postReservation(form).then(() => {
                    const data = {
                        email: authUser.email,
                        body: {
                            "title": props.selectedPlanHour.plan.title,
                            "trainer": props.selectedPlanHour.trainer.label,
                            "price": props.selectedPlanHour.plan.price,
                            "currency": props.selectedPlanHour.plan.currency,
                            "date": props.selectedPlanHour.time_data.day,
                            "start_time": props.selectedPlanHour.time_data.start_time,
                            "end_time": props.selectedPlanHour.time_data.end_time
                        }
                    }
                    sendConfirmationEmail(data)
                    alert("Trening został zarezerwowany. Potwierdzenie zostało wysłane na maila")
                    navigate('/');
                })
                setCaptchaError(false)
            } else {
                setCaptchaError(true)
            }

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
        <div className="flex items-center flex-col text-white">
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
                            <span
                                className="font-semibold">Trener:</span> {props.selectedPlanHour.trainer.label}
                        </p>
                        <p className="text-gray-500 text-white text-xl py-2">
                            <span
                                className="font-semibold">Cena:</span> {props.selectedPlanHour.plan.price} {props.selectedPlanHour.plan.currency}
                        </p>
                        <p className="text-gray-500 text-white text-xl py-2">
                            <span className="font-semibold">Data:</span> {props.selectedPlanHour.time_data.day}
                        </p>
                        <p className="text-gray-500 text-white text-xl py-2">
                            <span
                                className="font-semibold">Godzina rozpoczęcia:</span> {props.selectedPlanHour.time_data.start_time}
                        </p>
                        <p className="text-gray-500 text-white text-xl py-2">
                            <span
                                className="font-semibold">Godzina zakończenia:</span> {props.selectedPlanHour.time_data.end_time}
                        </p>
                        <div className="py-4">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={CAPTCHA_SITE_KEY}
                            />
                            {captchaError && <p className="mt-3 text-red-800">Uzupełnij Captche</p>}
                        </div>
                        <button className="text-2xl bg-button-grey" onClick={handleReservation}>Potwierdź rezerwację</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default BookingConfirmation;
