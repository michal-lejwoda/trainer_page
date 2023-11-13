import React from 'react';

import {useFormik} from 'formik';


const SignupForm = () => {

    // Pass the useFormik() hook initial form values and a submit function that will

    // be called when the form is submitted


    const formik = useFormik({

        initialValues: {
            name: '',
            last_name: '',
            email: '',
            phone_number: '',
            password: '',
            repeat_password: '',

        },
        onSubmit: values => {
            console.log(formik.values.name)
            console.log(formik.values.last_name)
            console.log(formik.values.email)
            console.log(formik.values.phone_number)
            console.log(formik.values.password)
            console.log(formik.values.repeat_password)
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Imię</label>
            <input
                value={formik.values.name}
                onChange={formik.handleChange}
                id="name"
                name="name"
                type="text"
                required
            />
            <label htmlFor="email">Nazwisko</label>
            <input
                value={formik.values.last_name}
                onChange={formik.handleChange}
                id="last_name"
                name="last_name"
                type="text"
                required
                // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <label htmlFor="email">Email Address</label>
            <input
                onChange={formik.handleChange}
                value={formik.values.email}
                id="email"
                name="email"
                type="email"
                required
            />
            <label htmlFor="email">Numer telefonu</label>
            <input
                value={formik.values.phone_number}
                onChange={formik.handleChange}
                id="phone_number"
                name="phone_number"
                type="text"
                required
                // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <label htmlFor="email">Hasło</label>
            <input
                value={formik.values.password}
                onChange={formik.handleChange}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <label htmlFor="email">Powtórz Hasło</label>
            <input
                value={formik.values.repeat_password}
                onChange={formik.handleChange}
                id="repeat_password"
                name="repeat_password"
                type="password"
                autoComplete="repeat_current-password"
                required
                // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button type="submit">Submit</button>
        </form>

    );

};
export default SignupForm