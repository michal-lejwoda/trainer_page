import React from 'react';

import {useFormik} from 'formik';
import {validateLogin} from "./validation.jsx";
import {checkIfUserLogged, getLogin} from "./api.jsx";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./AuthContext.jsx";

const BookingAuthorizationLogin = () => {
    const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth()
    const [cookies, setCookie] = useCookies(['jwt_trainer_auth']);
    const navigate = useNavigate();

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
            await navigate("/");

        } catch (err) {
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
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
                onChange={handleChange}
                value={values.email}
                id="email"
                name="email"
                type="email"
                required
                className={errors.email ? "input-error" : ""}
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
                className={errors.password ? "input-error" : ""}
                // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.password && <p>{errors.password}</p>}
            <button type="submit">Zaloguj się</button>
        </form>

    );

};
export default BookingAuthorizationLogin