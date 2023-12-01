import React from 'react';

import {useFormik} from 'formik';
import {validateRegistration} from "./validation.jsx";
import {useCookies} from "react-cookie";
import {checkIfUserLogged, getLogin, postRegistration} from "./api.jsx";


const SignupForm = () => {
    const handleRegister = async (values) => {
        let form = new FormData()
        form.append("name", values.name)
        form.append("last_name", values.last_name)
        form.append("email", values.email)
        form.append("phone_number", values.phone_number)
        form.append("password", values.password)
        form.append("repeat_password", values.repeat_password)
        await postRegistration(form)
        // let login_data = await getLogin(form)
        // setCookie('jwt_trainer_auth', login_data.access_token, {'sameSite': 'lax'})
        // let users_me = await checkIfUserLogged()
    }
    const {values,handleSubmit, handleChange, errors} = useFormik({

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
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Imię</label>
            <input
                value={values.name}
                onChange={handleChange}
                id="name"
                name="name"
                type="text"
                required
            />
            {errors.name && <p>{errors.name}</p>}
            <label htmlFor="last_name">Nazwisko</label>
            <input
                value={values.last_name}
                onChange={handleChange}
                id="last_name"
                name="last_name"
                type="text"
                required
                // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.last_name && <p>{errors.last_name}</p>}
            <label htmlFor="email">Email Address</label>
            <input
                onChange={handleChange}
                value={values.email}
                id="email"
                name="email"
                type="email"
                required
                className={errors.email ? "input-error": ""}
            />
            {errors.email && <p>{errors.email}</p>}
            <label htmlFor="phone_number">Numer telefonu</label>
            <input
                value={values.phone_number}
                onChange={handleChange}
                id="phone_number"
                name="phone_number"
                type="text"
                required
                // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.phone_number && <p>{errors.phone_number}</p>}
            <label htmlFor="password">Hasło</label>
            <input
                value={values.password}
                onChange={handleChange}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={errors.password  ? "input-error": ""}
                // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.password && <p>{errors.password}</p>}
            <label htmlFor="repeat_password">Powtórz Hasło</label>
            <input
                value={values.repeat_password}
                onChange={handleChange}
                id="repeat_password"
                name="repeat_password"
                type="password"
                autoComplete="repeat_current-password"
                required
                className={errors.repeat_password ? "input-error": ""}
                // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.repeat_password && <p>{errors.repeat_password}</p>}
            <button type="submit">Zarejestruj się</button>
        </form>

    );

};
export default SignupForm