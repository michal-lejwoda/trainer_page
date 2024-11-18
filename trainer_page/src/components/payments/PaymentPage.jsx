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
            amount: 5000.00, //Amounts in the smallest units of the currency
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