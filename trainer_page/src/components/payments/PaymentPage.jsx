import {useTranslation} from "react-i18next";
import {Elements} from "@stripe/react-stripe-js";
import React from "react";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm.jsx";


const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const PaymentPage = (props) => {
        console.log("payment page", props)
        const {i18n} = useTranslation();
        const options = {
            mode: 'payment',
            amount: 1099,
            locale: i18n.language,
            currency: 'pln',
            payment_method_types: ['card', 'p24'],
            appearance: {
                theme: 'night'
            },
        };
        return (
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm/>
            </Elements>

        )
    }
;

export default PaymentPage;