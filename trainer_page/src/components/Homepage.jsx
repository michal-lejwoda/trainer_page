import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {useEffect} from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import {NavLink} from "react-router-dom";

function Homepage() {
    useEffect(() => {
        Aos.init({duration: 2000})
    }, []);
    return (
        <div className="homepage">
            <div className="homepage__description">
                <div className="max-h-[800px] items-center justify-center mb-5 ">
                    <img className="max-h-[800px] inline-block object-cover w-full" src="/trainer_homepage2.jpg"
                         alt=""/>
                </div>
                <div className="px-4">
                    <div>
                        <div className="mb-5 font-mono font-semibold text-center px-4">
                            <p className="text-5xl text-lighter-grey my-2">Michał</p>
                            <p className="text-6xl mb-2">Trener</p>
                            <p className="text-5xl text-lighter-grey my-2">Personalny</p>
                        </div>
                        <p className="text-lg px-4 text-center">Pomogę Ci osiągnąć Twój zamierzony cel, a jeśli takiego
                            jeszcze
                            nie masz to
                            obierzemy go razem i dojdziemy do końcowego rezultatu!</p>

                        <div className="flex flex-col items-center ">
                            <NavLink to="/reservation" className="text-white">
                                <button className="mt-10  text-lg text-white no-underline">Zarezerwuj wizytę</button>
                            </NavLink>
                        </div>
                    </div>
                    <div data-aos="fade-left"
                         className="homepage__about_me  relative my-11 px-2.5 flex flex-col lg:flex-row lg: justify-around">
                        <img
                            className="inline-block object-cover  rounded-lg lg:w-1/3  lg:object-contain overflow-hidden "
                            src="/trainer_homepage.jpg" alt=""/>
                        <div className="lg:w-1/2">
                            <div className="homepage__about_me--title my-8">
                                <strong>
                                    <span className="text-5xl text-lighter-grey my-5">PARĘ SŁÓW</span>

                                    <br/>
                                    <span className="text-6xl mb-5">O MNIE</span>
                                </strong>
                            </div>
                            <div className="shape-1 absolute z-[-1] right-0 top-20">
                                <img src="/shape-1.png" alt="shape_1"/>
                            </div>
                            <div className="shape-2 absolute z-[-1] bottom-0 left-0">
                                <img src="/shape-2.png" alt="shape_2"/>
                            </div>
                            <p className="my-5">Hej! Mam na imię Michał, jestem trenerem personalnym z certyfikatem EFA.
                                Jestem absolwentem wychowania fizycznego na kierunku
                                trener
                                personalny w akademia wychowania fizycznego im. bronisława czecha w Krakowie.</p>
                            <p className="mb-5">Zapraszam Cię do mnie na treningi jeśli masz problem ze zdrowiem,
                                lub
                                po prostu
                                potrzebujesz pomocy w treningu siłowym, a przy okazji zadbać o swoją kondycję fizyczną i
                                zdrowie.</p>
                            <p className="font-semibold">Pomogę Ci osiągnąć Twój zamierzony cel, a jeśli takiego jeszcze
                                nie
                                masz to
                                obierzemy go razem i
                                dojdziemy do końcowego rezultatu!</p>

                        </div>

                    </div>
                    <div data-aos="fade-right" className="homepage__personal_training relative my-8">

                        <div className="flex flex-col lg:flex-row lg: justify-around">

                            <div className="lg:w-1/2">
                                <strong>
                                    <span className="text-5xl text-lighter-grey my-5">Trening</span>
                                    <br/>
                                    <span className="text-6xl mb-5">Personalny</span>
                                </strong>
                                <p className="text-2xl my-10 text-red-800 font-bold">Dlaczego mój trening będzie
                                    odpowiedni
                                    dla
                                    ciebie?</p>
                                <p>Znajdziesz w nim mnóstwo przydatnych porad, wskazówek dotyczących 4 kluczy do
                                    sukcesu,
                                    które
                                    ci
                                    pomogą: </p>
                                <p className="my-5 text-left px-3"><font className="text-red-700 text-xl">✓ </font>Odżywiaj
                                    się
                                    lepiej,
                                    bez diety i bez poczucia niedostatku.</p>
                                <p className="my-5 text-left px-3"><font className="text-red-700 text-xl">✓ </font>Bądź
                                    aktywny,
                                    bez
                                    względu na to, w jakiej jesteś obecnie formie.</p>
                                <p className="my-5 text-left px-3"><font className="text-red-700 text-xl">✓ </font>Porzuć
                                    zasady
                                    żywieniowe, porzuć modne diety i sprzeczne porady.</p>
                                <p className="my-5 text-left px-3"><font className="text-red-700 text-xl">✓ </font>Wprowadź
                                    fitness
                                    do
                                    swojego życia</p>
                                <p className="my-5 text-left px-3"><font className="text-red-700 text-xl">✓ </font>Osiągaj
                                    i
                                    utrzymuj
                                    swoje cele, nawet gdy życie staje się napięte.</p>
                            </div>
                            <img
                                className="inline-block object-cover  rounded-lg lg:w-1/3  lg:object-contain overflow-hidden "
                                src="/trainer_homepage3.jpg" alt=""/>
                        </div>
                        <div className="shape-1 absolute z-[-1] left-0 top-10">
                            <img src="/shape-1.png" alt="shape_1"/>
                        </div>
                        <div className="shape-2 absolute z-[-1] left-0 bottom-0">
                            <img src="/shape-2.png" alt="shape_2"/>
                        </div>
                    </div>
                    <div className="homepage__offer flex-col sm:flex-row  sm:flex sm:flex-wrap sm:justify-center">

                        <div data-aos="fade-right"
                             className="p-10 mb-5 bg-even-more-darky-grey rounded-lg sm:w-2/5 sm:mx-5 lg:w-1/5">
                            <div className=" items-center justify-center mb-5 flex">
                                <img className="inline-block" src="/icons-3-05_1_orig.png" alt=""/>
                            </div>
                            <div className="text-2xl font-bold text-red-800 text-center">Odżywanie</div>
                            <p className="mt-3 text-center">Poznaj i zastosuj strategie żywieniowe, które odmienią Twoją
                                sylwetkę bez
                                uczucia głodu.</p>
                        </div>
                        <div data-aos="fade-right"
                             className="p-10 mb-5 bg-even-more-darky-grey rounded-lg sm:w-2/5 sm:mx-5 lg:w-1/5">
                            <div className=" items-center justify-center mb-5 flex">
                                <img className="inline-block" src="/personheart_orig.png" alt=""/>
                            </div>
                            <div className="text-2xl font-bold text-red-800 text-center">Styl życia</div>
                            <p className="mt-3 text-center">Poznaj i wprowadź w życie ważne nawyki dotyczące stylu
                                życia, aby zacząć
                                czuć
                                się niesamowicie wewnątrz i wyglądać świetnie na zewnątrz.</p>
                        </div>
                        <div data-aos="fade-left"
                             className="p-10 mb-5 bg-even-more-darky-grey rounded-lg sm:w-2/5 sm:mx-5 lg:w-1/5">
                            <div className=" items-center justify-center mb-5 flex">
                                <img className="inline-block" src="/imageedit-73-3552888680_orig.png" alt=""/>
                            </div>
                            <div className="text-2xl font-bold text-red-800 text-center">Mindset</div>
                            <p className="mt-3 text-center">Stosując zasady nastawienia do palącego pragnienia
                                osiągnięcia swoich celów
                                -
                                staniesz się lepszą wersją siebie.</p>
                        </div>
                        <div data-aos="fade-left"
                             className="p-10 mb-5 bg-even-more-darky-grey rounded-lg sm:w-2/5 sm:mx-5 lg:w-1/5">
                            <div className=" items-center justify-center mb-5 flex">
                                <img className="inline-block" src="/imageedit-5-5594810482_orig.png" alt=""/>
                            </div>
                            <div className="text-2xl font-bold text-red-800 text-center">Ćwiczenia</div>
                            <p className="mt-3 text-center">Dopasowany, ustrukturyzowany, efektywny czasowo i
                                progresywny program
                                ćwiczeń
                                spełniający Twoje wymagania i cele.</p>
                        </div>
                    </div>

                    <div className="homepage__credo bg-tourists bg-no-repeat py-10 px-4 bg-cover">
                        <div className="homepage__credo--title my-8">
                            <strong>
                                <span className="text-5xl text-lighter-grey my-5">MOJE</span>
                                <br/>
                                <span className="text-6xl mb-5">CREDO</span>
                            </strong>
                        </div>
                        <p className="my-10 font-semibold text-lg"> Zapracowani mężczyźni i kobiety poprawiają swoje
                            zdrowie i kondycję, korzystając z kombinacji dostosowanych ćwiczeń, odżywiania, stylu życia
                            i systemów mentalnych, które są holistyczne i trwałe na zawsze.</p>
                        <p className="my-5 ">✓ Poczuj się pewnie i atrakcyjnie w gronie przyjaciół, rodziny i w
                            miejscach
                            publicznych publicznie.</p>
                        <p className="my-5">✓ Poczuj się silny fizycznie i psychicznie, zdolny do podjęcia każdego
                            wyzwania nie martwiąc się, że poziom energii lub masa ciała staną na przeszkodzie.</p>
                        <p className="my-5">✓ Noś ubrania takie jakie chcesz nosić.</p>
                        <p className="my-5">✓ Przestań martwić się chorobami i młodą śmiercią</p>
                        <p className="my-5">✓ Biegaj ze swoimi dziećmi lub wnukami, nie czując bólu, wiatru ani
                            zmęczenia i robiąc to ponownie następnego dnia.</p>
                        <p className="my-5">✓ Dodaj sobie 10 lat zdrowego życia na emeryturze</p>
                        <p className="font-semibold my-7 text-xl">Bez martwienia się o:</p>
                        <p className="my-3 text-lg">✓ Głodzenie się</p>
                        <p className="my-3 text-lg">✓ Liczenia kalorii lub ważenia żywności!</p>
                        <p className="my-3 text-lg">✓ Rezygnowania z produktów, które lubisz</p>
                        <div className="flex justify-center">
                            <NavLink to="/about-me" className="text-white">
                                <button className="mt-7">
                                    O mnie
                                </button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="homepage__transformations">
                        <div className="homepage__transformations--title text-center my-8">
                            <strong>
                                <span className="text-4xl text-lighter-grey my-5">TRANSFORMACJE</span>
                                <br/>
                                <span className="text-4xl mb-5">PODOPIECZNYCH</span>
                            </strong>
                            <div
                                className="homepage__transformations__container flex flex-col sm:flex-wrap sm:flex-row sm: justify-center hidden xl:flex ">
                                <img className="rounded-2xl my-10 sm:w-2/5 lg:w-1/5 lg: mx-4" src="/Wojciech.jpg"
                                     alt=""/>
                                <img className="rounded-2xl my-10 sm:w-2/5 lg:w-1/5 lg: mx-4" src="/Bartosz.jpg"
                                     alt=""/>
                                <img className="rounded-2xl my-10 sm:w-2/5 lg:w-1/5 lg: mx-4" src="/Ewa_gnaslogo.png"
                                     alt=""/>
                                <img className="rounded-2xl my-10 sm:w-2/5 lg:w-1/5 lg: mx-4" src="/Tomasz2.jpg"
                                     alt=""/>
                            </div>
                            <div className="w-full flex justify-center my-10">
                                <div className="w-3/4 xl:hidden">
                                    <Carousel showThumbs={false} autoPlay infiniteLoop centerMode interval={3000}>
                                        <div>
                                            <img
                                                className="h-96 w-96 rounded-2xl"
                                                src="/Wojciech.jpg"
                                                alt=""/>
                                        </div>
                                        <div>
                                            <img
                                                className="h-96 w-96 rounded-2xl"
                                                src="/Bartosz.jpg"
                                                alt=""/>
                                            {/*<p>test</p>*/}
                                        </div>
                                        <div>
                                            <img
                                                className="h-96 w-96 rounded-2xl"
                                                src="/Ewa_gnaslogo.png"
                                                alt=""/>
                                        </div>
                                        <div>
                                            <img
                                                className="h-96 w-96 rounded-2xl"
                                                src="/Tomasz2.jpg"
                                                alt=""/>
                                        </div>
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage