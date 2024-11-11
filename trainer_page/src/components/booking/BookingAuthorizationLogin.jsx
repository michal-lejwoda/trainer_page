import React, {useState} from 'react';

import {useFormik} from 'formik';
import {useCookies} from "react-cookie";
import {validateLogin} from "../auth/validation.jsx";
import {checkIfUserLogged, getLogin} from "../auth/api.jsx";
import {useAuth} from "../auth/AuthContext.jsx";
import {useTranslation} from "react-i18next";

const BookingAuthorizationLogin = (props) => {
    const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth()
    const [errorlogin, setErrorLogin] = useState(null)
    const [cookies, setCookie] = useCookies(['jwt_trainer_auth']);
    const {t} = useTranslation()
    const handleLogin = async (values) => {
        let form = new FormData()
        form.append("username", values.email)
        form.append("password", values.password)
        try {
            let login_data = await getLogin(form)
            const dtObject = new Date(login_data.access_token_expires);
            await setCookie('jwt_trainer_auth', login_data.access_token, {'sameSite': 'lax', 'expires': dtObject})
            await setCookie('jwt_trainer_auth_expires', dtObject.toUTCString(), {
                'sameSite': 'lax',
                'expires': dtObject
            });
            try {
                let logged_user = await checkIfUserLogged()
                setAuthUser(logged_user)
                setIsLoggedIn(true)
            } catch (err) {
                setAuthUser(null)
                setIsLoggedIn(false)
            }
            await props.goToBookingConfirmation()

        } catch (err) {
            setErrorLogin(err.response.data.detail)
        }
        ;
    }
    const {values, handleSubmit, handleChange, errors} = useFormik({
        initialValues: {
            name: '',
            last_name: '',
            email: '',
            phone_number: '',
            password: '',
            repeat_password: '',
        },
        validationSchema: validateLogin,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            handleLogin(values)
        },

    });
    return (
        <form onSubmit={handleSubmit} className="w-full mt-5 text-white">
            <div className="flex flex-col md:flex-row justify-between mb-4">
                <div className="w-full md:w-1/2 flex flex-col md:mr-3 ">
                    <label className="mb-4 text-lg">{t("Email address")}</label>
                    <input
                        onChange={handleChange}
                        value={values.email}
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder={t("Email address")}
                        className={errors.email ? "bg-background-black-color text-lg md:mr-3 py-2 px-3 rounded-lg input-error border-2 rounded-lg border-white" : "bg-background-black-color py-2 px-3 rounded-lg text-lg md:mr-3 border-2 rounded-lg border-white"}
                    />

                </div>
                <div className="w-full md:w-1/2 flex flex-col md:ml-3">
                    <label className="mb-4 text-lg mt-4 md:mt-0">{t("Password")}</label>
                    <input
                        value={values.password}
                        onChange={handleChange}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        placeholder={t("Password")}
                        className={errors.password ? "bg-background-black-color text-lg ml-3 py-2 px-3 rounded-lg input-error border-2 rounded-lg border-white" : "bg-background-black-color py-2 px-3 rounded-lg text-lg border-2 rounded-lg border-white"}
                    />
                </div>
            </div>
            {errors.email && <p className="text-red-400 mb-4">{errors.email}</p>}
            {errors.password && <p className="text-red-400 mb-4">{errors.password}</p>}
            {errorlogin && <p className="text-red-400 mb-4">{errorlogin}</p>}
            <div className="booking__login__button w-full flex justify-end">
                <button className="border-solid border-1 rounded-lg border-white mr-4" type="submit">{t("Log in")}
                </button>
            </div>
        </form>

    );

};
export default BookingAuthorizationLogin