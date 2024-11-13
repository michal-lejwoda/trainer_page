import {useTranslation} from "react-i18next";
import {Elements} from "@stripe/react-stripe-js";
import React from "react";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm.jsx";


const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const PaymentPage = (props) => {
        console.log("payment page", props)

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
                <CheckoutForm/>
            </Elements>

        )
    }
;

export default PaymentPage;