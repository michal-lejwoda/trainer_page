import React, {useState} from 'react';

import {useFormik} from 'formik';
import {validateResetPasswordBasedOnEmail} from "./validation.jsx";
import {postSendResetPassword} from "./api.jsx";
import ReCAPTCHA from "react-google-recaptcha";
import {useTranslation} from "react-i18next";

const ResetPasswordBasedonEmail = () => {
    const {t} = useTranslation()
    const CAPTCHA_SITE_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY
    const [resetmessage, setResetMessage] = useState('')
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
        setResetMessage(t("If the email exists in our database, an email has been sent with a link to reset your password."))
    }

    return (
        <div className="booking__login bg-container-grey p-10 rounded-2xl text-white">
            <div className="w-full md:w-1/2 ">
                <p className="text-4xl mb-4">{t("Remind password")}</p>
                <div>
                    <form onSubmit={handleSubmit} className="w-full mt-5 ">
                        <div className="flex justify-between mb-4">
                            <div className="w-full flex flex-col mr-3 ">
                                <label className="mb-4 text-lg">{t("Email address")}</label>
                                <input
                                    onChange={handleChange}
                                    value={values.email}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder={t("Email address")}
                                    className={errors.email ? "bg-background-black-color text-lg mr-3 py-2 px-3 rounded-lg input-error border-2 rounded-lg border-white" : "bg-background-black-color py-2 px-3 rounded-lg text-lg mr-3 border-2 rounded-lg border-white"}
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
                            <button className="border-solid border-1 rounded-lg border-white mr-4"
                                    type="submit">{t("Send")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );

};
export default ResetPasswordBasedonEmail;