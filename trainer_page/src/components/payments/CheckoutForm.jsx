import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";

const CheckoutForm = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const {t} = useTranslation()

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!elements) {
            return;
        }

        const res = await fetch('/api/create-intent', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({amount: 2200, currency: 'pln', payment_method_types: ['card', 'p24']}),
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
                    <div className="flex justify-end">
                        <button className="mt-4 text-base bg-button-grey" type="submit" disabled={!stripe || !elements}>
                            {t("Make a payment")}
                        </button>
                    </div>
                    {errorMessage && <div>{errorMessage}</div>}
                </form>
            </div>
        </div>
    );
};
export default CheckoutForm