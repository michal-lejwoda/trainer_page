import React, {useEffect, useState} from 'react';

import {useFormik} from 'formik';


import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {validateResetPassword} from "./auth/validation.jsx";
import {postGetUser, postResetPassword} from "./auth/api.jsx";

const AccountResetPassword = () => {
    const {t} = useTranslation()
    const [user, setUser] = useState(null)
    const {id, name} = useParams();
    const navigate = useNavigate();

    const getUser = async (form) => {
        const data = await postGetUser(form)
        setUser(data)
        return data
    }
    const handleResetPassword = async (values) => {
        let form = new FormData()
        form.append("email", user.email)
        form.append("password", values.password)
        form.append("repeat_password", values.repeat_password)
        const res = await postResetPassword(form)
        if (res.status == 200) {
            await navigate("/login");
        }
    }

    const {values, handleSubmit, handleChange, errors} = useFormik({
        initialValues: {
            user: null,
            password: '',
            repeat_password: '',
        },
        validationSchema: validateResetPassword,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            handleResetPassword(values)
        },

    });

    useEffect(() => {
        let form = new FormData()
        form.append("id", id)
        form.append("name", name)
        getUser(form)
    }, [])


    return (
        <div className="booking__login bg-container-grey p-10 rounded-2xl">
            <p className="text-4xl mb-4">{t("Password Reset")}</p>
            <div>
                <form onSubmit={handleSubmit} className="w-full mt-5 ">
                    <div className="flex justify-between mb-4">
                        <div className="w-1/2 flex flex-col ml-3">
                            <label className="mb-4 text-lg">{t("Password")}</label>
                            <input
                                value={values.password}
                                onChange={handleChange}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder={t("Password")}
                                className={errors.password ? "text-lg ml-3 py-2 px-3 rounded-lg input-error border-2 border-white" : "py-2 px-3 rounded-lg text-lg border-2 border-white"}
                            />
                            {errors.password && <p>{errors.password}</p>}
                        </div>
                        <div className="w-1/2 flex flex-col ml-3">
                            <label className="mb-4 text-lg">{t("Repeat Password")}</label>
                            <input
                                value={values.repeat_password}
                                onChange={handleChange}
                                id="password"
                                name="repeat_password"
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder={t("Repeat Password")}
                                className={errors.repeat_password ? "text-lg ml-3 py-2 px-3 rounded-lg input-error border-2 border-white" : "py-2 px-3 rounded-lg text-lg border-2 border-white"}
                            />
                        </div>
                        {errors.repeat_password && <p>{errors.repeat_password}</p>}
                    </div>
                    <button className="border-solid border-1 rounded-lg border-white mr-4"
                            type="submit">{t("Change password")}
                    </button>
                </form>
            </div>
        </div>

    );

};
export default AccountResetPassword