import React, {useEffect, useState} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import {useAuth} from "../auth/AuthContext.jsx";
import {postReservation, sendConfirmationEmail} from "../api.jsx";
import {useNavigate} from 'react-router-dom';
import {useTranslation} from "react-i18next";

const BookingConfirmation = (props) => {
    const {t} = useTranslation()
    const navigate = useNavigate();
    const recaptchaRef = React.createRef();
    const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth()
    const [captchaError, setCaptchaError] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const CAPTCHA_SITE_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY

    const handleCreditCardMethod = async () => {
        console.log("handleCreditCardMethod")
        setIsProcessing(true)
        try {
            const clientSecret = await sendReservationRequest("card", false)
            if (clientSecret) {
                props.setClientSecretKey(clientSecret)
                props.goToCheckoutForm()
            }
        } catch (error) {
            console.error("Credit card reservation failed:", error)
        } finally {
            setIsProcessing(false)
        }
    }

    const handleCashReservation = async () => {
        console.log("handleCashReservation")
        setIsProcessing(true)
        try {
            const success = await sendReservationRequest("cash", true)
            if (success) {
                alert(t("The training has been booked. A confirmation has been sent to your email."))
                navigate('/')
            }
        } catch (error) {
            console.error("Cash reservation failed:", error)
        } finally {
            setIsProcessing(false)
        }
    }

    const sendReservationRequest = async (payment_type, is_paid) => {
        try {
            if (!recaptchaRef.current || recaptchaRef.current.getValue().length === 0) {
                setCaptchaError(true);
                throw new Error("CAPTCHA verification required");
            }
            setCaptchaError(false);

            let clientSecret = null;
            let paymentIntentId = null;
            if (payment_type === "card") {
                const paymentResponse = await fetch('/api/create-intent', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        amount: Math.round(props.selectedPlanHour.plan.price * 100),
                        currency: 'pln',
                        payment_method_types: ['card', 'p24'],
                        metadata: {
                            user_id: authUser.id,
                            plan_id: props.selectedPlanHour.plan.id,
                            work_hours_id: props.selectedPlanHour.time_data.id
                        },
                    }),
                });

                if (!paymentResponse.ok) {
                    const errorData = await paymentResponse.json();
                    throw new Error(`Failed to create PaymentIntent: ${errorData.error || 'Unknown error'}`);
                }

                const paymentData = await paymentResponse.json();
                clientSecret = paymentData.client_secret;
                paymentIntentId = paymentData.id;
            }
            const form = new FormData();
            form.append("title", props.selectedPlanHour.plan.title);
            form.append("plan_id", props.selectedPlanHour.plan.id);
            form.append("user_id", authUser.id);
            form.append("work_hours_id", props.selectedPlanHour.time_data.id);
            form.append("payment_type", payment_type);
            form.append("is_paid", is_paid);

            if (clientSecret) {
                form.append("client_secret", clientSecret);
            }
            if (paymentIntentId) {
                form.append("payment_id", paymentIntentId);
            }

            const reservationResponse = await postReservation(form);

            if (!reservationResponse || reservationResponse.status !== 200) {
                if (paymentIntentId) {
                    await fetch('/api/cancel-intent', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({payment_intent_id: paymentIntentId}),
                    });
                }
                throw new Error("Reservation request failed.");
            }
            const emailData = {
                email: authUser.email,
                body: {
                    title: props.selectedPlanHour.plan.title,
                    trainer: props.selectedPlanHour.trainer.label,
                    price: props.selectedPlanHour.plan.price,
                    currency: props.selectedPlanHour.plan.currency,
                    date: props.selectedPlanHour.time_data.date,
                    start_datetime: props.selectedPlanHour.time_data.start_datetime,
                    end_datetime: props.selectedPlanHour.time_data.end_datetime,
                },
            };
            try {
                await sendConfirmationEmail(emailData);
            } catch (emailError) {
                console.warn("Failed to send confirmation email:", emailError);
            }

            return payment_type === "card" ? clientSecret : true;

        } catch (error) {
            console.error("Error during reservation process:", error);
            setCaptchaError(true);
            throw error;
        }
    };

    useEffect(() => {
        if (authUser === null) {
            props.goToSystemReservation()
        }
    }, [])

    return (
        <div className="flex items-center flex-col text-white">
            <div className="sm:flex sm:items-start mb-5">
                <div className="my-3 text-center sm:ml-4 sm:mt-0 sm:text-left text-4xl">
                    <div className="mt-2 p-10 bg-even-more-darky-grey rounded-lg">
                        <p className="text-gray-500 text-white text-center text-4xl font-semibold pb-4">
                            {t("Your order")}
                        </p>
                        <p className="text-gray-500 text-white text-xl py-2">
                            <span className="font-semibold">{t("Title")} : </span>
                            <span>{props.selectedPlanHour.plan.title}</span>
                        </p>
                        <p className="text-gray-500 text-white text-xl py-2">
                            <span className="font-semibold">{t("Trainer")} : </span>
                            <span>{props.selectedPlanHour.trainer.label}</span>
                        </p>
                        <p className="text-gray-500 text-white text-xl py-2">
                            <span className="font-semibold">{t("Price")} : </span>
                            <span>{props.selectedPlanHour.plan.price} {props.selectedPlanHour.plan.currency}</span>
                        </p>
                        <p className="text-gray-500 text-white text-xl py-2">
                            <span className="font-semibold">{t("Date")} : </span>
                            <span>{props.selectedPlanHour.time_data.date}</span>
                        </p>
                        <p className="text-gray-500 text-white text-xl py-2">
                            <span className="font-semibold">{t("Start time")} : </span>
                            <span>{props.selectedPlanHour.time_data.start_datetime}</span>
                        </p>
                        <p className="text-gray-500 text-white text-xl py-2">
                            <span className="font-semibold">{t("End time")} : </span>
                            <span>{props.selectedPlanHour.time_data.end_datetime}</span>
                        </p>
                        <div className="py-4">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={CAPTCHA_SITE_KEY}
                            />
                            {captchaError &&
                                <p className="mt-3 text-base text-red-800">{t("Complete the captcha verification")}</p>}
                        </div>
                        <div className="flex flex-col">
                            <button
                                className="text-base bg-button-grey mb-3"
                                onClick={handleCashReservation}
                                disabled={isProcessing}
                            >
                                {isProcessing ? t("Processing...") : t("Confirm Reservation and pay with cash")}
                            </button>
                            <button
                                className="text-base bg-button-grey"
                                onClick={handleCreditCardMethod}
                                disabled={isProcessing}
                            >
                                {isProcessing ? t("Processing...") : t("Book and pay with other methods(blik, credit cart)")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmation;