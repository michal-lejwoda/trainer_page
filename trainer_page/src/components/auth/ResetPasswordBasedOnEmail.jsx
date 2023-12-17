import React, {useState} from 'react';

import {useFormik} from 'formik';
import {validateLogin, validateResetPasswordBasedOnEmail} from "./validation.jsx";
import {checkIfUserLogged, getLogin, postSendResetPassword} from "./api.jsx";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./AuthContext.jsx";

const ResetPasswordBasedonEmail = () => {

    const {values, handleSubmit, handleChange, errors} = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validateResetPasswordBasedOnEmail,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            handleSendReminder(values)
        },

    });

    const handleSendReminder = async (values) => {
        let form = new FormData()
        form.append("email", values.email)
        await postSendResetPassword(form)

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
                        </div>
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