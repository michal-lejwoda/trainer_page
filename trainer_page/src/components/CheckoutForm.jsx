import React, {useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import {useTranslation} from "react-i18next";

const CheckoutForm = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    console.log("props", props)
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!elements) {
            return;
        }

        const res = await fetch('/create-intent', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({amount: 1099, currency: 'pln', payment_method_types: ['card', 'blik', 'p24']}),
        });

        const {client_secret: clientSecret} = await res.json();

        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: 'https://example.com/order/123/complete',
            },
        });

        if (error) {
            setErrorMessage(error.message);
        } else {
        }
    };

    return (
        <div className="flex w-100 justify-center">
            <div className="w-3/4 m-5">
                <form onSubmit={handleSubmit}>
                    <PaymentElement/>
                    <button type="submit" disabled={!stripe || !elements}>
                        Pay
                    </button>
                    {errorMessage && <div>{errorMessage}</div>}
                </form>
            </div>
        </div>
    );
};

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');


const PaymentPage = () => {
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

)}
;

export default PaymentPage;
