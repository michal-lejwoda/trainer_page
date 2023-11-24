import React from 'react';

import {useFormik} from 'formik';
import {validateLogin} from "./validation.jsx";


const LoginForm = () => {

    const {values,handleSubmit, handleChange, errors} = useFormik({

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
            // validateRegistration(values)
            alert(JSON.stringify(values, null, 2));
        },

    });
    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Zaloguj się</button>
        </form>

    );

};
export default LoginForm