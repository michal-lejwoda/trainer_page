import React, {useState} from 'react';

import {useFormik} from 'formik';
import {useCookies} from "react-cookie";
import {validateLogin} from "../auth/validation.jsx";
import {checkIfUserLogged, getLogin} from "../auth/api.jsx";
import {useAuth} from "../auth/AuthContext.jsx";

const BookingAuthorizationLogin = (props) => {
    const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth()
    const [errorlogin, setErrorLogin] = useState(null)
    const [cookies, setCookie] = useCookies(['jwt_trainer_auth']);

    const handleLogin = async (values) => {
        let form = new FormData()
        form.append("username", values.email)
        form.append("password", values.password)
        try {
            let login_data = await getLogin(form)
            await setCookie('jwt_trainer_auth', login_data.access_token, {'sameSite': 'lax'})
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

        <form onSubmit={handleSubmit} className="w-full mt-5 ">
            <div className="flex justify-between mb-4">
                <input
                    onChange={handleChange}
                    value={values.email}
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Adres email"
                    className={errors.email ? "w-1/2 text-lg mr-3 py-2 px-3 rounded-lg input-error border-2 rounded-lg border-white" : "w-1/2  py-2 px-3 rounded-lg text-lg mr-3 border-2 rounded-lg border-white"}
                />
                {errors.email && <p>{errors.email}</p>}
                <input
                    value={values.password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Hasło"
                    className={errors.password ? "w-1/2 text-lg ml-3 py-2 px-3 rounded-lg input-error border-2 rounded-lg border-white" : "w-1/2 py-2 px-3 rounded-lg text-lg ml-3 border-2 rounded-lg border-white"}
                    // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
            {errors.password && <p>{errors.password}</p>}
            {errorlogin && <p>{errorlogin}</p>}
            <div className="booking__login__button w-full flex justify-end">
                <button className="border-solid border-1 rounded-lg border-white" type="submit">Zaloguj się</button>
            </div>
        </form>

    );

};
export default BookingAuthorizationLogin