import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import '../css/map.css'
import {ReCAPTCHA} from "react-google-recaptcha";

function Contact() {

    const position = [50.019581842782905, 22.01792718408926]
    return (
        <div className="contact">
            <div className="md:flex md:flex-row justify-stretch">
                <div className="contact--image  items-stretch md:basis-2/5">
                    <img className="inline-block object-cover object-top h-72 w-full md:h-full md:object-center md:object-cover" src="/kontakt-01.jpg" alt=""/>
                </div>
                <div className="md:basis-3/5">
                    <div className="contact--description px-2">
                        <p className="text-xl my-5">Treningi prowadzone są na siłowni:</p>
                        <p className="text-xl mb-6 font-bold">Cityfit Rzeszów</p>
                        <p className="text-xl my-5">Numer konta</p>
                        <p className="text-xl mb-10 font-bold">5468 8468 4864 8946 6468 7555</p>
                    </div>
                    <hr/>
                    <div className="contact--mail px-4">
                        <form>
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-6">
                                    <div className="md:col-span-4">
                                        <label htmlFor="first-name"
                                               className="block text-lg font-medium leading-6 text-white font-semibold mb-3">
                                            Imię
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                placeholder="Imię*"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-white shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white md:text-md md:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-4">
                                        <label htmlFor="email"
                                               className="block text-lg font-medium leading-6 text-white font-semibold mb-3">
                                            Adres Email
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Adres Email*"
                                                autoComplete="email"
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-white shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white md:text-md md:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-4">
                                        <label htmlFor="email"
                                               className="block text-lg font-medium leading-6 text-white font-semibold mb-3">
                                            Treść Wiadomości
                                        </label>
                                        <div className="mt-2">
                                    <textarea
                                        id="content"
                                        name="content"
                                        rows="8"
                                        placeholder="Treść Wiadomości*"
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-white shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white md:text-md md:leading-6"
                                    />
                                        </div>
                                    </div>
                                </div>
                                <ReCAPTCHA
                                    sitekey={"6LeEIYMmAAAAAIl0vfJ5BqGZqAybQhT5PvAPSk9r"}
                                    // style={{ display: "inline-block" }}
                                    // theme="dark"
                                    // grecaptcha={grecaptchaObject}
                                    // onChange={onChange}
                                />,
                                <div className="my-5">
                                    <input type="checkbox"/> <span>Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z ustawą o ochronie danych osobowych w celu przesyłania informacji handlowej drogą elektroniczną. </span>
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