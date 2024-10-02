import * as yup from "yup";
import {t} from "i18next";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const validateRegistration = yup.object().shape({
    name: yup.string().min(2, t("Name is too short")).max(80, t("Name is too long")).required("Name is required"),
    last_name: yup.string().min(2, t("Last name is too short")).max(80, "Last Name is too long"),
    email: yup.string().email(t("Address Email is incorrect")).required(t("Address Email is required")),
    phone_number: yup.string().matches(phoneRegExp, t("Phone number is incorrect")),
    password: yup.string().min(5, t("Password is too short")).required("Password is required"),
    repeat_password: yup.string().oneOf([yup.ref("password"), null], t("The passwords must match."))
});

export const validateLogin = yup.object().shape({
    email: yup.string().email(t("Address Email is incorrect")).required(t("Address Email is required")),
    password: yup.string().min(5, t("Password is too short")).required("Password is required"),
})

export const validateContact = yup.object().shape({
    name: yup.string().min(2, t("Name is too short")).max(80, t("Name is too long")).required("Name is required"),
    email: yup.string().email(t("Address Email is incorrect")).required(t("Address Email is required")),
    message: yup.string().min(2, t("Message is too short")).max(1000, t("Message is too long")),
    toggle: yup.boolean().oneOf([true], t("To send a message, you must accept the consent.")),
});


export const validateResetPassword = yup.object().shape({
    password: yup.string().min(5, t("Password is too short")).required("Password is required"),
    repeat_password: yup.string().oneOf([yup.ref("password"), null], t("The passwords must match."))
});

export const validateResetPasswordBasedOnEmail = yup.object().shape({
    email: yup.string().email(t("Address Email is incorrect")).required(t("Address Email is required")),
    captcha: yup.boolean().oneOf([true], t("Complete the captcha verification")),
});