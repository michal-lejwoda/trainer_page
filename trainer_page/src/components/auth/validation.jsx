import * as yup from "yup";
export const validate_login = values => {
   const errors = {};
   if (!values.email) {
     errors.email = 'Required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   }
   if (!values.password) {
     errors.password = 'Required';
   }

   return errors;
 };

export const validate_register = values => {
   const errors = {};
   if (!values.firstName) {
     errors.firstName = 'Required';
   } else if (values.firstName.length > 15) {
     errors.firstName = 'Must be 15 characters or less';
   }
   if (!values.lastName) {
     errors.lastName = 'Required';
   } else if (values.lastName.length > 20) {
     errors.lastName = 'Must be 20 characters or less';
   }
   if (!values.email) {
     errors.email = 'Required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   }
   return errors;
 };

 export function validateEmail(value) {
   let error;
   if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
     error = 'Email is not correct!';
   }
   return error;

 }
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
 export const validateRegistration = yup.object().shape({
     name: yup.string().min(2, "Imię jest za krótkie").max(80, "Imię jest za długie"),
     last_name: yup.string().min(2, "Nazwisko jest za krótkie").max(80, "Nazwisko jest za długie"),
     email: yup.string().email("Adres email jest niepoprawny").required("Email jest wymagany"),
     phone_number: yup.string().matches(phoneRegExp, 'Numer telefonu jest nieprawidłowy'),
     password: yup.string().min(5, "Hasło jest za krótkie").required("Hasło jest wymagane"),
     repeat_password: yup.string().oneOf([yup.ref("password"), null], "Hasła muszą do siebie pasować")
 });

 export const validateLogin = yup.object().shape({
     email: yup.string().email("Adres email jest niepoprawny").required("Email jest wymagany"),
     password: yup.string().min(5, "Hasło jest za krótkie").required("Hasło jest wymagane"),
 })


