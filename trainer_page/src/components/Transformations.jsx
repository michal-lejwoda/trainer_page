import Aos from "aos";
import {useEffect} from "react";
import "aos/dist/aos.css";

function Transformations() {
    useEffect(() => {
        Aos.init({duration: 2000})

    }, []);
    return (
        <>
            <div className="transformations px-4">
                <div className="transformations--title my-8 text-center">
                    <strong>
                        <span className="text-4xl text-center text-lighter-grey my-5">TRANSFORMACJE</span>
                        <br/>
                        <span className="text-4xl text-center mb-5">PODOPIECZNYCH</span>
                    </strong>
                </div>
                <div className="transformations--description">
                    <p className="mb-7 text-base text-center">Przeprowadzę Cię przez cały proces od momentu, w którym jesteś teraz
                        do uzyskania efektów ze zdjęć poniżej. Zyskasz zdrowie, lepszy nastrój i witalność, a nowe,
                        zdrowe nawyki przekażesz swoim dzieciom. Podejmując współpracę ze mną poprawisz nie tylko swoją
                        jakość życia, ale i całej rodziny. </p>
                    <p className=" text-center font-semibold text-center">Pomagam przejść drogę po lepszą formę od 2012
                        roku</p>
                </div>

                <div
                    className="homepage__transformations__container flex flex-col sm:flex-row sm:flex-wrap justify-center">
                    <div data-aos="fade-right" className="my-10 sm:w-2/5 lg:w-1/5 lg: mx-4 bg-container-grey">
                        <img className="rounded-2xl h-96"
                             src="/Wojciech.jpg" alt=""/>
                        <div className="transformation__image__description p-4">
                            <p className="flex justify-center my-3 font-semibold text-center">Bartosz</p>
                            <p className="text-center ">
                                Z Bartkiem współpraca online trwała niespełna 5 miesięcy. Celem było spalenie zbędnego
                                tłuszczu oraz uzyskanie atletycznej sylwetki.
                            </p>
                            <p className="font-semibold text-center mt-4 mb-10">Realizacja 100%.</p>
                        </div>
                    </div>
                    <div data-aos="fade-right" className="my-10 sm:w-2/5 lg:w-1/5 lg: mx-4 bg-container-grey">
                        <img className="rounded-2xl h-96"
                             src="/Bartosz.jpg" alt=""/>
                        <div className="transformation__image__description p-4">
                            <p className="flex justify-center   my-3 font-semibold text-center">Wojtek</p>
                            <p className="text-center ">
                                Z Bartkiem współpraca online trwała niespełna 5 miesięcy. Celem było spalenie zbędnego
                                tłuszczu oraz uzyskanie atletycznej sylwetki.
                            </p>
                            <p className="font-semibold text-center mt-4 mb-10">Realizacja 100%.</p>
                        </div>
                    </div>


                    <div data-aos="fade-right" className="my-10 sm:w-2/5 lg:w-1/5 lg: mx-4 bg-container-grey">
                        <img className="rounded-2xl h-96"
                             src="/Ewa_gnaslogo.png" alt=""/>
                        <div className="transformation__image__description p-4">
                            <p className="flex justify-center   my-3 font-semibold text-center">Ania</p>
                            <p className="text-center ">
                                Z Bartkiem współpraca online trwała niespełna 5 miesięcy. Celem było spalenie zbędnego
                                tłuszczu oraz uzyskanie atletycznej sylwetki.
                            </p>
                            <p className="font-semibold text-center mt-4 mb-10">Realizacja 100%.</p>
                        </div>

                    </div>
                    <div data-aos="fade-right" className="my-10 sm:w-2/5 lg:w-1/5 lg: mx-4 bg-container-grey">
                        <img className="rounded-2xl h-96"
                             src="/Tomasz2.jpg" alt=""/>
                        <div className="transformation__image__description p-4">
                            <p className="flex justify-center   my-3 font-semibold text-center">Andrzej</p>
                            <p className="text-center ">
                                Z Bartkiem współpraca online trwała niespełna 5 miesięcy. Celem było spalenie zbędnego
                                tłuszczu oraz uzyskanie atletycznej sylwetki.
                            </p>
                            <p className="font-semibold text-center mt-4 mb-10">Realizacja 100%.</p>
                        </div>

                    </div>
                    <div data-aos="fade-left" className="my-10 sm:w-2/5 lg:w-1/5 lg: mx-4 bg-container-grey">
                        <img className="rounded-2xl h-96"
                             src="/Wojciech.jpg" alt=""/>
                        <div className="transformation__image__description p-4">
                            <p className="flex justify-center   my-3 font-semibold text-center">Karol</p>
                            <p className="text-center ">
                                Z Bartkiem współpraca online trwała niespełna 5 miesięcy. Celem było spalenie zbędnego
                                tłuszczu oraz uzyskanie atletycznej sylwetki.
                            </p>
                            <p className="font-semibold text-center mt-4 mb-10">Realizacja 100%.</p>
                        </div>
                    </div>
                    <div data-aos="fade-left" className="my-10 sm:w-2/5 lg:w-1/5 lg: mx-4 bg-container-grey">
                        <img className="rounded-2xl h-96"
                             src="/Bartosz.jpg" alt=""/>
                        <div className="transformation__image__description p-4">
                            <p className="flex justify-center   my-3 font-semibold text-center">Tomek</p>
                            <p className="text-center ">
                                Z Bartkiem współpraca online trwała niespełna 5 miesięcy. Celem było spalenie zbędnego
                                tłuszczu oraz uzyskanie atletycznej sylwetki.
                            </p>
                            <p className="font-semibold text-center mt-4 mb-10">Realizacja 100%.</p>
                        </div>
                    </div>
                    <div data-aos="fade-left" className="my-10 sm:w-2/5 lg:w-1/5 lg: mx-4 bg-container-grey">
                        <img className="rounded-2xl h-96"
                             src="/Ewa_gnaslogo.png" alt=""/>
                        <div className="transformation__image__description p-4">
                            <p className="flex justify-center   my-3 font-semibold text-center">Natalia</p>
                            <p className="text-center ">
                                Z Bartkiem współpraca online trwała niespełna 5 miesięcy. Celem było spalenie zbędnego
                                tłuszczu oraz uzyskanie atletycznej sylwetki.
                            </p>
                            <p className="font-semibold text-center mt-4 mb-10">Realizacja 100%.</p>
                        </div>
                    </div>
                    <div data-aos="fade-left" className="my-10 sm:w-2/5 lg:w-1/5 lg: mx-4 bg-container-grey">
                        <img className="rounded-2xl h-96"
                             src="/Tomasz2.jpg" alt=""/>
                        <div className="transformation__image__description p-4">
                            <p className="flex justify-center my-3 font-semibold text-center">Paweł</p>
                            <p className="text-center ">
                                Z Bartkiem współpraca online trwała niespełna 5 miesięcy. Celem było spalenie zbędnego
                                tłuszczu oraz uzyskanie atletycznej sylwetki.
                            </p>
                            <p className="font-semibold text-center mt-4 mb-10">Realizacja 100%.</p>
                        </div>
                    </div>
                    <div data-aos="fade-right" className="my-10 sm:w-2/5 lg:w-1/5 lg: mx-4 bg-container-grey">
                        <img className="rounded-2xl h-96"
                             src="/Wojciech.jpg" alt=""/>
                        <div className="transformation__image__description p-4">
                            <p className="flex justify-center my-3 font-semibold text-center">Piotr</p>
                            <p className="text-center ">
                                Z Bartkiem współpraca online trwała niespełna 5 miesięcy. Celem było spalenie zbędnego
                                tłuszczu oraz uzyskanie atletycznej sylwetki.
                            </p>
                            <p className="font-semibold text-center mt-4 mb-10">Realizacja 100%.</p>
                        </div>
                    </div>
                    <div data-aos="fade-right" className="my-10 sm:w-2/5 lg:w-1/5 lg: mx-4 bg-container-grey">
                        <img className="rounded-2xl h-96"
                             src="/Bartosz.jpg" alt=""/>
                        <div className="transformation__image__description p-4">
                            <p className="flex justify-center   my-3 font-semibold text-center">Kazimierz</p>
                            <p className="text-center ">
                                Z Bartkiem współpraca online trwała niespełna 5 miesięcy. Celem było spalenie zbędnego
                                tłuszczu oraz uzyskanie atletycznej sylwetki.
                            </p>
                            <p className="font-semibold text-center mt-4 mb-10">Realizacja 100%.</p>
                        </div>
                    </div>
                    <div data-aos="fade-right" className="my-10 sm:w-2/5 lg:w-1/5 lg: mx-4 bg-container-grey">
                        <img className="rounded-2xl h-96"
                             src="/Ewa_gnaslogo.png" alt=""/>
                        <div className="transformation__image__description p-4">
                            <p className="flex justify-center   my-3 font-semibold text-center">Julia</p>
                            <p className="text-center ">
                                Z Bartkiem współpraca online trwała niespełna 5 miesięcy. Celem było spalenie zbędnego
                                tłuszczu oraz uzyskanie atletycznej sylwetki.
                            </p>
                            <p className="font-semibold text-center mt-4 mb-10">Realizacja 100%.</p>
                        </div>
                    </div>
                    <div data-aos="fade-right" className="my-10 sm:w-2/5 lg:w-1/5 lg: mx-4 bg-container-grey">
                        <img className="rounded-2xl h-96"
                             src="/Tomasz2.jpg" alt=""/>
                        <div className="transformation__image__description p-4">
                            <p className="flex justify-center   my-3 font-semibold text-center">Konrad</p>
                            <p className="text-center ">
                                Z Bartkiem współpraca online trwała niespełna 5 miesięcy. Celem było spalenie zbędnego
                                tłuszczu oraz uzyskanie atletycznej sylwetki.
                            </p>
                            <p className="font-semibold text-center mt-4 mb-10">Realizacja 100%.</p>
                        </div>
                    </div>
                    <div data-aos="fade-left" className="my-10 sm:w-2/5 lg:w-1/5 lg: mx-4 bg-container-grey">
                        <img className="rounded-2xl h-96"
                             src="/Wojciech.jpg" alt=""/>
                        <div className="transformation__image__description p-4">
                            <p className="flex justify-center   my-3 font-semibold text-center">Oskar</p>
                            <p className="text-center ">
                                Z Bartkiem współpraca online trwała niespełna 5 miesięcy. Celem było spalenie zbędnego
                                tłuszczu oraz uzyskanie atletycznej sylwetki.
                            </p>
                            <p className="font-semibold text-center mt-4 mb-10">Realizacja 100%.</p>
                        </div>
                    </div>
                    <div data-aos="fade-left" className="my-10 sm:w-2/5 lg:w-1/5 lg: mx-4 bg-container-grey">
                        <img className="rounded-2xl h-96"
                             src="/Bartosz.jpg" alt=""/>
                        <div className="transformation__image__description p-4">
                            <p className="flex justify-center   my-3 font-semibold text-center">Tomasz</p>
                            <p className="text-center ">
                                Z Bartkiem współpraca online trwała niespełna 5 miesięcy. Celem było spalenie zbędnego
                                tłuszczu oraz uzyskanie atletycznej sylwetki.
                            </p>
                            <p className="font-semibold text-center mt-4 mb-10">Realizacja 100%.</p>
                        </div>
                    </div>
                    <div data-aos="fade-left" className="my-10 sm:w-2/5 lg:w-1/5 lg: mx-4 bg-container-grey">
                        <img className="rounded-2xl h-96"
                             src="/Ewa_gnaslogo.png" alt=""/>
                        <div className="transformation__image__description p-4">
                            <p className="flex justify-center   my-3 font-semibold text-center">Maja</p>
                            <p className="text-center ">
                                Z Bartkiem współpraca online trwała niespełna 5 miesięcy. Celem było spalenie zbędnego
                                tłuszczu oraz uzyskanie atletycznej sylwetki.
                            </p>
                            <p className="font-semibold text-center mt-4 mb-10">Realizacja 100%.</p>
                        </div>
                    </div>
                    <div data-aos="fade-left" className="my-10 sm:w-2/5 lg:w-1/5 lg: mx-4 bg-container-grey">
                        <img className="rounded-2xl h-96"
                             src="/Tomasz2.jpg" alt=""/>
                        <div className="transformation__image__description p-4">
                            <p className="flex justify-center my-3 font-semibold text-center">Mateusz</p>
                            <p className="text-center ">
                                Z Bartkiem współpraca online trwała niespełna 5 miesięcy. Celem było spalenie zbędnego
                                tłuszczu oraz uzyskanie atletycznej sylwetki.
                            </p>
                            <p className="font-semibold text-center mt-4 mb-10">Realizacja 100%.</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Transformations