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

    const checkPaymentStatus = async (paymentIntentId, maxAttempts = 10, delay = 2000) => {
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            try {
                const response = await fetch('/api/check-payment-status', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({payment_intent_id: paymentIntentId}),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(`Payment check attempt ${attempt + 1}:`, data);

                    if (data.status === 'succeeded') {
                        return true;
                    }
                    if (data.status === 'canceled' || data.status === 'payment_failed') {
                        return false;
                    }
                }
            } catch (error) {
                console.error(`Payment check attempt ${attempt + 1} failed:`, error);
            }

            if (attempt < maxAttempts - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        return false;
    };

    const updateReservationStatus = async (reservationId) => {
        try {
            const response = await fetch('/api/update-reservation-status', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    reservation_id: reservationId,
                    is_paid: true
                }),
            });
            return response.ok;
        } catch (error) {
            console.error('Failed to update reservation status:', error);
            return false;
        }
    };

    const handleCreditCartMethod = async () => {
        setIsProcessing(true);
        try {
            const result = await sendReservationRequest("card", false);
            if (result) {
                props.goToCheckoutForm()
            }
        } finally {
            setIsProcessing(false);
        }
    }

    const handleCashReservation = async () => {
        setIsProcessing(true);
        try {
            const result = await sendReservationRequest("cash", true);
            if (result) {
                alert(t("The training has been booked. A confirmation has been sent to your email."))
                navigate('/');
            }
        } finally {
            setIsProcessing(false);
        }
    }

    const sendReservationRequest = async (payment_type, is_paid) => {
        try {
            setCaptchaError(false);

            let form = new FormData();
            form.append("title", props.selectedPlanHour.plan.title);
            form.append("plan_id", props.selectedPlanHour.plan.id);
            form.append("user_id", authUser.id);
            form.append("work_hours_id", props.selectedPlanHour.time_data.id);
            form.append("payment_type", payment_type);
            form.append("is_paid", is_paid);

            let clientSecret = null;
            let paymentIntentId = null;

            if (payment_type === "card") {
                console.log('Creating payment intent...');

                const paymentResponse = await fetch('/api/create-intent', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        amount: Math.round(props.selectedPlanHour.plan.price * 100),
                        currency: 'pln',
                        payment_method_types: ['card', 'p24'],
                        metadata: {
                            user_id: authUser.id.toString(),
                            plan_id: props.selectedPlanHour.plan.id.toString(),
                            work_hours_id: props.selectedPlanHour.time_data.id.toString(),
                            plan_title: props.selectedPlanHour.plan.title
                        },
                    }),
                });

                if (!paymentResponse.ok) {
                    const errorData = await paymentResponse.json();
                    throw new Error(errorData.detail || errorData.message || "Failed to create PaymentIntent.");
                }

                const paymentData = await paymentResponse.json();
                clientSecret = paymentData.client_secret;
                paymentIntentId = paymentData.id;

                form.append("client_secret", clientSecret);
                form.append("payment_id", paymentIntentId);
            }

            console.log('Sending reservation request...');
            const reservationResponse = await postReservation(form);

            if (!reservationResponse || reservationResponse.status !== 200) {
                if (paymentIntentId) {
                    try {
                        await fetch('/api/cancel-intent', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({payment_intent_id: paymentIntentId}),
                        });
                    } catch (cancelError) {
                        console.error('Failed to cancel payment intent:', cancelError);
                    }
                }
                throw new Error("Reservation request failed.");
            }

            const reservationData = await reservationResponse.json();
            const reservationId = reservationData.id || reservationData.reservation_id;

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
                console.error('Failed to send confirmation email:', emailError);
            }

            if (payment_type === "card" && paymentIntentId) {
                // Set up listener dla powrotu z checkout
                window.addEventListener('focus', async () => {
                    console.log('Checking payment status after checkout...');
                    const paymentSucceeded = await checkPaymentStatus(paymentIntentId);

                    if (paymentSucceeded && reservationId) {
                        console.log('Payment succeeded! Updating reservation status...');
                        const updated = await updateReservationStatus(reservationId);
                        if (updated) {
                            alert(t("Payment completed successfully! Your reservation is confirmed."));
                            navigate('/');
                        }
                    }
                }, { once: true });
            }

            if (clientSecret) {
                props.setClientSecretKey(clientSecret);
                sessionStorage.setItem('currentPaymentIntentId', paymentIntentId);
                sessionStorage.setItem('currentReservationId', reservationId);
            }

            return clientSecret || true;

        } catch (err) {
            console.error('Reservation error:', err);
            setCaptchaError(true);
            alert(t("An error occurred while processing your reservation. Please try again."));
            return false;
        }
    };

    useEffect(() => {
        const checkPendingPayment = async () => {
            const paymentIntentId = sessionStorage.getItem('currentPaymentIntentId');
            const reservationId = sessionStorage.getItem('currentReservationId');

            if (paymentIntentId && reservationId) {
                console.log('Checking pending payment...');
                const paymentSucceeded = await checkPaymentStatus(paymentIntentId, 3, 1000);

                if (paymentSucceeded) {
                    const updated = await updateReservationStatus(reservationId);
                    if (updated) {
                        sessionStorage.removeItem('currentPaymentIntentId');
                        sessionStorage.removeItem('currentReservationId');
                        alert(t("Payment completed successfully! Your reservation is confirmed."));
                        navigate('/');
                    }
                }
            }
        };

        checkPendingPayment();
    }, []);

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
                                <p className="mt-3 text-base text-red-800">
                                    {t("Complete the captcha verification")}
                                </p>
                            }
                        </div>
                        <div className="flex flex-col">
                            <button
                                className="text-base bg-button-grey mb-3 p-3 rounded hover:bg-opacity-80 transition-colors disabled:opacity-50"
                                onClick={handleCashReservation}
                                disabled={isProcessing}
                            >
                                {isProcessing ? t("Processing...") : t("Confirm Reservation and pay with cash")}
                            </button>
                            <button
                                className="text-base bg-button-grey p-3 rounded hover:bg-opacity-80 transition-colors disabled:opacity-50"
                                onClick={handleCreditCartMethod}
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