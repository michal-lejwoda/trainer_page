import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import '../css/map.css'
import ReCAPTCHA from "react-google-recaptcha";
import {useFormik} from "formik";
import {validateContact} from "./auth/validation.jsx";
import React, {useState} from "react";
import {postMessageFromUser} from "./auth/api.jsx";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


function Contact() {
    const recaptchaRef = React.createRef();
    const CAPTCHA_SITE_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY
    const [resetmessage, setResetMessage] = useState('')
    const [captchaError, setCaptchaError] = useState(false)
    const {values, handleSubmit, handleChange, errors} = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: '',
            toggle: false,

        },
        validationSchema: validateContact,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            if (recaptchaRef.current.getValue().length !== 0) {
                handleSendMessageFromUser(values)
                setCaptchaError(false)
            } else {
                setCaptchaError(true)
            }

        },

    });

    const handleSendMessageFromUser = async (values) => {
        let form = new FormData()
        form.append("name", values.name)
        form.append("email", values.email)
        form.append('message', values.message)
        await postMessageFromUser(form)
        setResetMessage('Wiadomość została wysłana')
    }

    const position = [50.019581842782905, 22.01792718408926]
    return (
        <div className="contact text-white">
            <div className="md:flex md:flex-row justify-stretch">
                <div className="contact--image  items-stretch md:basis-2/5">
                    <img
                        className="inline-block object-cover object-top h-72 w-full md:h-full md:object-center md:object-cover"
                        src="/contact_image.jpg" alt=""/>
                </div>
                <div className="md:basis-3/5  ">
                    <div className="contact--description px-2 flex flex-col items-center">
                        <p className="text-xl my-5">Treningi prowadzone są na siłowni:</p>
                        <p className="text-xl mb-6 font-bold">Cityfit Rzeszów</p>
                        <p className="text-xl my-5">Numer konta</p>
                        <p className="text-xl mb-10 font-bold">5468 8468 4864 8946 6468 7555</p>
                    </div>
                    <hr/>
                    <div className="contact--mail px-4">
                        <form onSubmit={handleSubmit}>
                            <div className="border-b border-gray-900/10 pb-12 flex flex-col items-center">
                                <div className="mt-10 w-4/6">
                                    <div className="md:col-span-4 ">
                                        <label htmlFor="first-name"
                                               className="block text-lg font-medium leading-6 text-white font-semibold mb-3">
                                            Imię
                                        </label>
                                        <div className="my-3">
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                placeholder="Imię*"
                                                autoComplete="given-name"
                                                value={values.name}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-white shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white md:text-md md:leading-6"
                                            />
                                            {errors.name && <p className="mt-3 text-red-800">{errors.name}</p>}
                                        </div>
                                    </div>

                                    <div className="md:col-span-4">
                                        <label htmlFor="email"
                                               className="block text-lg font-medium leading-6 text-white font-semibold mb-3">
                                            Adres Email
                                        </label>
                                        <div className="my-3">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                placeholder="Adres Email*"
                                                autoComplete="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-white shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white md:text-md md:leading-6"
                                            />
                                            {errors.email && <p className="mt-3 text-red-800">{errors.email}</p>}
                                        </div>
                                    </div>
                                    <div className="md:col-span-4 ">
                                        <label htmlFor="email"
                                               className="block text-lg font-medium leading-6 text-white font-semibold mb-3">
                                            Treść Wiadomości
                                        </label>
                                        <div className="my-3">
                                    <textarea
                                        name="message"
                                        rows="8"
                                        required
                                        placeholder="Treść Wiadomości*"
                                        value={values.message}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-white shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white md:text-md md:leading-6"
                                    />
                                            {errors.message && <p className="mt-3 text-red-800">{errors.message}</p>}
                                        </div>
                                    </div>

                                    <div className="recaptcha my-5">
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey={CAPTCHA_SITE_KEY}
                                        />
                                        {captchaError && <p className="mt-3 text-red-800">Uzupełnij Captche</p>}
                                    </div>
                                    <div className="my-5">
                                        <input type="checkbox" name="toggle" onChange={handleChange}/><span> Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z ustawą o ochronie danych osobowych w celu przesyłania informacji handlowej drogą elektroniczną. </span>
                                        {errors.toggle && <p className="mt-3 text-red-800">{errors.toggle}</p>}
                                    </div>
                                    <div className="flex justify-center">
                                        <button type="submit"
                                                className="border-solid border-1 rounded-lg border-white mr-4"
                                                onClick={handleSubmit}>Wyślij wiadomość
                                        </button>
                                    </div>
                                    <p className="mt-4">{resetmessage}</p>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            <div style={{height: '100%', width: '100%'}} className="contact--map">
                <MapContainer center={position} zoom={15} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            CityFit Rzeszów
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>

        </div>
    )

}

export default Contact