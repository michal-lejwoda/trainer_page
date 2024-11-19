import {useTranslation} from "react-i18next";
import {Elements} from "@stripe/react-stripe-js";
import React from "react";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm.jsx";



const PaymentPage = (props) => {
        const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY
        const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
        const {i18n} = useTranslation();
        //TODO BACK HERE
        const options = {
            mode: 'payment',
            amount: Math.round(props.selectedPlanHour.plan.price * 100),
            // amount: props.selectedPlanHour.plan.price,
            locale: i18n.language,
            currency: 'pln',// #TODO : props.selectedPlanHour.plan.currency Uncomment this when fix zl
            payment_method_types: ['card', 'p24'],
            appearance: {
                theme: 'night'
            },
        };
        console.log("options", options)
        return (
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm clientSecretKey={props.clientSecretKey}/>
            </Elements>

        )
    }
;

export default PaymentPage;