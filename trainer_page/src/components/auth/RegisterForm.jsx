import React from 'react';

import {useFormik} from 'formik';
import {validateRegistration} from "./validation.jsx";
import {useCookies} from "react-cookie";
import {checkIfUserLogged, postRegistration} from "./api.jsx";
import {useAuth} from "./AuthContext.jsx";


const RegisterForm = () => {
    const [cookies, setCookie] = useCookies(['jwt_trainer_auth']);
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
    return (<div className="booking__login bg-container-grey p-10 rounded-2xl">
            <p className="text-4xl mb-4">Rejestracja</p>
            <div className="booking__register__inputs ">
                <form className="flex flex-wrap " onSubmit={handleSubmit}>
                    <div className="w-full flex justify-between">
                        <div className="w-1/2 flex flex-col">
                            <label className="mb-4 text-lg">Imię</label>
                            <input
                                value={values.name}
                                onChange={handleChange}
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Imię"
                                className=" text-lg py-2 px-3 mr-3 mb-5 rounded-lg input-error border-2 rounded-lg border-white"
                            />
                            {errors.name && <p>{errors.name}</p>}
                        </div>
                        <div className="w-1/2 ml-3 flex flex-col">
                            <label className="mb-4 text-lg">Nazwisko</label>
                            <input
                                value={values.last_name}
                                onChange={handleChange}
                                id="last_name"
                                name="last_name"
                                type="text"
                                required
                                placeholder="Nazwisko"
                                className="text-lg py-2 px-3 mb-5 rounded-lg input-error border-2 rounded-lg border-white"
                                // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.last_name && <p>{errors.last_name}</p>}
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="w-1/2 flex flex-col">
                            <label className="mb-4 text-lg ">Adres E-mail</label>
                            <input
                                onChange={handleChange}
                                value={values.email}
                                id="email"
                                name="email"
                                type="email"
                                required

                                className={errors.email ? "input-error text-lg py-2 px-3 mb-5 mr-3 rounded-lg input-error border-2 rounded-lg border-white" : "text-lg py-2 px-3 mb-5 mr-3 rounded-lg input-error border-2 rounded-lg border-white"}
                                placeholder="Adres E-mail"
                            />
                            {errors.email && <p>{errors.email}</p>}
                        </div>
                        <div className="w-1/2 ml-3 flex flex-col">
                            <label className="mb-4 text-lg">Numer telefonu</label>
                            <input
                                value={values.phone_number}
                                onChange={handleChange}
                                id="phone_number"
                                name="phone_number"
                                type="text"
                                required
                                placeholder="Numer telefonu"
                                className={errors.phone_number ? "input-error text-lg py-2 px-3 mb-5 rounded-lg input-error border-2 rounded-lg border-white" : "text-lg py-2 px-3 mb-5 rounded-lg input-error border-2 rounded-lg border-white"}
                            />
                            {errors.phone_number && <p>{errors.phone_number}</p>}
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="w-1/2 flex flex-col">
                            <label className="mb-4 text-lg">Hasło</label>
                            <input
                                value={values.password}
                                onChange={handleChange}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className={errors.password ? "input-error text-lg py-2 px-3 mr-3 mb-5 rounded-lg input-error border-2 rounded-lg border-white" : "text-lg py-2 px-3 mb-5 mr-3 rounded-lg input-error border-2 rounded-lg border-white"}
                                placeholder="Hasło"
                                // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.password && <p>{errors.password}</p>}
                        </div>
                        <div className="w-1/2 flex flex-col ml-3">
                            <label className="mb-4 text-lg">Powtórz hasło</label>
                            <input
                                value={values.repeat_password}
                                onChange={handleChange}
                                id="repeat_password"
                                name="repeat_password"
                                type="password"
                                autoComplete="repeat_current-password"
                                required
                                className={errors.repeat_password ? "input-error text-lg py-2 px-3 mb-5 rounded-lg input-error border-2 rounded-lg border-white" : "text-lg py-2 px-3 mb-5 rounded-lg input-error border-2 rounded-lg border-white"}
                                placeholder="Powtórz hasło"
                            />
                            {errors.repeat_password && <p>{errors.repeat_password}</p>}
                        </div>
                    </div>
                    <div className="booking__login__button w-full flex flex-col items-end mt-2">
                        <a className="mb-4 cursor-pointer mr-4">Jeśli posiadasz konto. Zaloguj się</a>
                        <button className="border-solid border-1 rounded-lg border-white mr-4" type="submit">Zarejestruj
                            się
                        </button>
                    </div>

                </form>
            </div>
        </div>

    );

};
export default RegisterForm