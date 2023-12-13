import React, {useState} from 'react';

import {useFormik} from 'formik';
import {useCookies} from "react-cookie";
import {validateRegistration} from "../auth/validation.jsx";
import {checkIfUserLogged, postRegistration} from "../auth/api.jsx";
import {useAuth} from "../auth/AuthContext.jsx";


const BookingAuthorizationRegister = (props) => {
    const [cookies, setCookie] = useCookies(['jwt_trainer_auth']);
    const [errorregister, setErrorRegister] = useState(null)
    const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth()
    const handleRegister = async (values) => {
        let form = new FormData()
        form.append("name", values.name)
        form.append("last_name", values.last_name)
        form.append("email", values.email)
        form.append("phone_number", values.phone_number)
        form.append("password", values.password)
        form.append("repeat_password", values.repeat_password)
        try {
            const registration_data = await postRegistration(form)
            console.log("registration_data")
            console.log(registration_data)
            setCookie('jwt_trainer_auth', registration_data.access_token, {'sameSite': 'lax'})
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
            setErrorRegister(err.response.data.detail)
        }
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
        validationSchema: validateRegistration,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            handleRegister(values)
        },

    });
    return (
        <div className="booking__register__inputs ">
            <form className="flex flex-wrap " onSubmit={handleSubmit}>
                <input
                    value={values.name}
                    onChange={handleChange}
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Imię"
                    className="w-1/4 text-lg mr-3 py-2 px-3 mb-2 rounded-lg input-error border-2 rounded-lg border-white"
                />
                {errors.name && <p>{errors.name}</p>}
                <input
                    value={values.last_name}
                    onChange={handleChange}
                    id="last_name"
                    name="last_name"
                    type="text"
                    required
                    placeholder="Nazwisko"
                    className="w-1/4 text-lg mr-3 py-2 px-3 mb-2 rounded-lg input-error border-2 rounded-lg border-white"
                    // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.last_name && <p>{errors.last_name}</p>}
                <input
                    onChange={handleChange}
                    value={values.email}
                    id="email"
                    name="email"
                    type="email"
                    required

                    className={errors.email ? "input-error w-1/2 text-lg mr-3 py-2 px-3 mb-2 rounded-lg input-error border-2 rounded-lg border-white" : "w-1/2 text-lg mr-3 py-2 px-3 mb-2 rounded-lg input-error border-2 rounded-lg border-white"}
                    placeholder="Adres E-mail"
                />
                {errors.email && <p>{errors.email}</p>}
                <input
                    value={values.phone_number}
                    onChange={handleChange}
                    id="phone_number"
                    name="phone_number"
                    type="text"
                    required
                    placeholder="Numer telefonu"
                    className={errors.phone_number ? "input-error w-1/2 text-lg mr-3 py-2 px-3 mb-2 rounded-lg input-error border-2 rounded-lg border-white" : "w-1/2 text-lg mr-3 py-2 px-3 mb-2 rounded-lg input-error border-2 rounded-lg border-white"}
                    // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.phone_number && <p>{errors.phone_number}</p>}
                <input
                    value={values.password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={errors.password ? "input-error w-1/2 text-lg mr-3 py-2 px-3 mb-2 rounded-lg input-error border-2 rounded-lg border-white" : "w-1/2 text-lg mr-3 py-2 px-3 mb-2 rounded-lg input-error border-2 rounded-lg border-white"}
                    placeholder="Hasło"
                    // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && <p>{errors.password}</p>}
                <input
                    value={values.repeat_password}
                    onChange={handleChange}
                    id="repeat_password"
                    name="repeat_password"
                    type="password"
                    autoComplete="repeat_current-password"
                    required
                    className={errors.repeat_password ? "input-error w-1/2 text-lg mr-3 py-2 px-3 mb-2 rounded-lg input-error border-2 rounded-lg border-white" : "w-1/2 text-lg mr-3 py-2 px-3 mb-2 rounded-lg input-error border-2 rounded-lg border-white"}
                    placeholder="Powtórz hasło"
                    // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.repeat_password && <p>{errors.repeat_password}</p>}
                <button type="submit">Zarejestruj się</button>
            </form>
        </div>
    );

};
export default BookingAuthorizationRegister