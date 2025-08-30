import {useLocation} from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm.jsx";
import {useResumePayment} from "../mutations.jsx";

const TryAgainPaymentPage = () => {
    const location = useLocation();
    const state = location.state || {};
    const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
    const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
    const {i18n} = useTranslation();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const {mutateAsync: mutateGetResumePayment} = useResumePayment();

    useEffect(() => {
        const fetchData = async () => {
            if (!state.id) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const data = await mutateGetResumePayment(state.id);
                setData(data);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [mutateGetResumePayment, state.id]);


    const options = {
        mode: 'payment',
        amount: data?.amount || 0,
        locale: i18n.language,
        currency: data?.currency || "pln",
        payment_method_types: ['card', 'p24'],
        appearance: {
            theme: 'night'
        },
    };
    // TODO
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data || !data.client_secret) {
        return <div>Error: Nie udało się załadować danych płatności.</div>;
    }

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm clientSecretKey={data.client_secret}/>
        </Elements>
    );
};

export default TryAgainPaymentPage;
