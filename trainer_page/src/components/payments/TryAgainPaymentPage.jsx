import {useTranslation} from "react-i18next";
import {Elements} from "@stripe/react-stripe-js";
import React, {useEffect, useState} from "react";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm.jsx";
import {useLocation} from "react-router-dom";
import {useResumePayment} from "../mutations.jsx";


const TryAgainPaymentPage = () => {
    const location = useLocation();
    const state = location.state || {}; // Zabezpieczenie przed brakiem state
    const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
    const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
    const {i18n} = useTranslation();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log("state", state);
    console.log("data", data);

    const {mutateAsync: mutateGetResumePayment} = useResumePayment(state.id);

    useEffect(() => {
        const fetchData = async () => {
            if (!state.id) {
                console.warn("Brak state.id, pomijanie fetchowania danych");
                return;
            }
            try {
                setLoading(true);
                const data = await mutateGetResumePayment();
                setData(data);
            } catch (error) {
                console.error("Error details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [mutateGetResumePayment, state.id]); // state.id jako zależność

    const options = {
        mode: 'payment',
        amount: 5000,
        locale: i18n.language,
        currency: 'pln',
        payment_method_types: ['card', 'p24'],
        appearance: {
            theme: 'night'
        },
    };

    console.log("options", options);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    );
};

export default TryAgainPaymentPage;
