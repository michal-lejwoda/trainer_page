import React, {useState} from 'react';

import {useFormik} from 'formik';
import {validateLogin, validateResetPasswordBasedOnEmail} from "./validation.jsx";
import {checkIfUserLogged, getLogin, postSendResetPassword} from "./api.jsx";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./AuthContext.jsx";
import ReCAPTCHA from "react-google-recaptcha";

const ResetPasswordBasedonEmail = () => {
    const CAPTCHA_SITE_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY
    const [resetmessage, setResetMessage ] = useState('')
    const {values, setFieldValue, handleSubmit, handleChange, errors} = useFormik({
        initialValues: {
            captcha: false,
            email: '',
        },
        validationSchema: validateResetPasswordBasedOnEmail,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            handleSendReminder(values)
        },

    });
    const handleRecaptchaChange = () => {
        setFieldValue('captcha', true)
    }
    const handleSendReminder = async (values) => {
        let form = new FormData()
        form.append("email", values.email)
        await postSendResetPassword(form)
        setResetMessage('Jeśli email istnieje w naszej bazie danych to na ten email została wysłana wiadomość wraz z linkiem umożliwiającym zmianę hasła')
    }

    return (
        <div className="booking__login bg-container-grey p-10 rounded-2xl">
            <p className="text-4xl mb-4">Przypomnienie hasła</p>
            <div>
                <form onSubmit={handleSubmit} className="w-full mt-5 ">
                    <div className="flex justify-between mb-4">
                        <div className="w-1/2 flex flex-col mr-3 ">
                            <label className="mb-4 text-lg">Adres E-mail</label>
                            <input
                                onChange={handleChange}
                                value={values.email}
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="Adres email"
                                className={errors.email ? "text-lg mr-3 py-2 px-3 rounded-lg input-error border-2 rounded-lg border-white" : "py-2 px-3 rounded-lg text-lg mr-3 border-2 rounded-lg border-white"}
                            />
                            {errors.email && <p>{errors.email}</p>}
                            <p className="mt-4">{resetmessage}</p>
                        </div>
                    </div>
                    <div className="recaptcha my-5">
                        <ReCAPTCHA
                            sitekey={CAPTCHA_SITE_KEY}
                            onChange={handleRecaptchaChange}
                        />
                        {errors.captcha && <p className="mt-3 text-red-800">{errors.captcha}</p>}
                    </div>
                    <div className="booking__login__button w-full flex flex-col items-end">
                        <button className="border-solid border-1 rounded-lg border-white mr-4" type="submit">Wyślij
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );

};
export default ResetPasswordBasedonEmail;