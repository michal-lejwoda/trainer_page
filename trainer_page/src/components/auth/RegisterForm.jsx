import React, {useEffect, useState} from 'react';

import {useFormik} from 'formik';
import {validateRegistration} from "./validation.jsx";
import {useCookies} from "react-cookie";
import {checkIfUserLogged, postRegistration} from "./api.jsx";
import {useAuth} from "./AuthContext.jsx";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";


const RegisterForm = (props) => {
    const [cookies, setCookie] = useCookies(['jwt_trainer_auth']);
    const [errorregister, setErrorRegister] = useState(null)
    const navigate = useNavigate()
    const {setAuthUser, setIsLoggedIn} = useAuth()
    const {t} = useTranslation()
    useEffect(()=>{

        if (cookies['jwt_trainer_auth_expires']){
            navigate("/")
        }
    },[])
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
            const dtObject = new Date(registration_data.access_token_expires);
            await setCookie('jwt_trainer_auth', registration_data.access_token, {'sameSite': 'lax', 'expires': dtObject})
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
            await navigate("/")
        } catch (err) {
            console.log(err)
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
    return (<div className="booking__login bg-container-grey p-10 rounded-2xl text-white">
            <p className="text-4xl mb-4">{t("Register")}</p>
            <div className="booking__register__inputs ">
                <form className="flex flex-wrap " onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col md:flex-row md:justify-between">
                        <div className="w-full md:w-1/2 flex flex-col">
                            <label className="mb-4 text-lg">{t("Name")}</label>
                            <input
                                value={values.name}
                                onChange={handleChange}
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder={t("Name")}
                                className="bg-background-black-color text-lg py-2 px-3 md:mr-3 mb-5 rounded-lg input-error border-2 rounded-lg border-white"
                            />
                            {errors.name && <p className="text-red-400 mb-4">{errors.name}</p>}
                        </div>
                        <div className="w-full md:w-1/2 md:ml-3 flex flex-col">
                            <label className="mb-4 text-lg">{t("Last Name")}</label>
                            <input
                                value={values.last_name}
                                onChange={handleChange}
                                id="last_name"
                                name="last_name"
                                type="text"
                                required
                                placeholder={t("Last Name")}
                                className="bg-background-black-color text-lg py-2 px-3 mb-5 rounded-lg input-error border-2 rounded-lg border-white"
                            />
                            {errors.last_name && <p className="text-red-400 mb-4">{errors.last_name}</p>}
                        </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row md:justify-between">
                        <div className="w-full md:w-1/2 flex flex-col">
                            <label className="mb-4 text-lg ">{t("Email address")}</label>
                            <input
                                onChange={handleChange}
                                value={values.email}
                                id="email"
                                name="email"
                                type="email"
                                required

                                className={errors.email ? "bg-background-black-color input-error text-lg py-2 px-3 mb-5 md:mr-3 rounded-lg input-error border-2 rounded-lg border-white" : "bg-background-black-color text-lg py-2 px-3 mb-5 md:mr-3 rounded-lg input-error border-2 rounded-lg border-white"}
                                placeholder={t("Email address")}
                            />
                            {errors.email && <p className="text-red-400 mb-4">{errors.email}</p>}
                            {errorregister && <p className="text-red-400 mb-4">{errorregister}</p>}
                        </div>
                        <div className="w-full md:w-1/2 md:ml-3 flex flex-col">
                            <label className="mb-4 text-lg">{t("Telephone number")}</label>
                            <input
                                value={values.phone_number}
                                onChange={handleChange}
                                id="phone_number"
                                name="phone_number"
                                type="text"
                                required
                                placeholder={t("Telephone number")}
                                className={errors.phone_number ? "bg-background-black-color input-error text-lg py-2 px-3 mb-5 rounded-lg input-error border-2 rounded-lg border-white" : "bg-background-black-color text-lg py-2 px-3 mb-5 rounded-lg input-error border-2 rounded-lg border-white"}
                            />
                            {errors.phone_number && <p className="text-red-400 mb-4">{errors.phone_number}</p>}
                        </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row md:justify-between">
                        <div className="w-full md:w-1/2 flex flex-col">
                            <label className="mb-4 text-lg">{t("Password")}</label>
                            <input
                                value={values.password}
                                onChange={handleChange}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className={errors.password ? "bg-background-black-color input-error text-lg py-2 px-3 md:mr-3 mb-5 rounded-lg input-error border-2 rounded-lg border-white" : "bg-background-black-color text-lg py-2 px-3 mb-5 md:mr-3 rounded-lg input-error border-2 rounded-lg border-white"}
                                placeholder={t("Password")}
                            />
                            {errors.password && <p className="text-red-400 mb-4">{errors.password}</p>}
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col md:ml-3">
                            <label className="mb-4 text-lg">{t("Repeat password")}</label>
                            <input
                                value={values.repeat_password}
                                onChange={handleChange}
                                id="repeat_password"
                                name="repeat_password"
                                type="password"
                                autoComplete="repeat_current-password"
                                required
                                className={errors.repeat_password ? "bg-background-black-color input-error text-lg py-2 px-3 mb-5 rounded-lg input-error border-2 rounded-lg border-white" : "bg-background-black-color text-lg py-2 px-3 mb-5 rounded-lg input-error border-2 rounded-lg border-white"}
                                placeholder={t("Repeat password")}
                            />
                            {errors.repeat_password && <p className="text-red-400 mb-4">{errors.repeat_password}</p>}
                        </div>
                    </div>
                    <div className="booking__login__button w-full flex flex-col items-end mt-2">
                        <a className="mb-4 cursor-pointer mr-4" href="/login">{t("If you have an account, please log in.")}</a>
                        <button className="border-solid border-1 rounded-lg border-white mr-4" type="submit">{t("Register")}
                        </button>
                    </div>

                </form>
            </div>
        </div>

    );

};
export default RegisterForm