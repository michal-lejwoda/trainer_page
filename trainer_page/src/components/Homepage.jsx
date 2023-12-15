import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Homepage() {
    return (
        <div className="homepage">
            <div className="homepage__description">
                <div className=" items-center justify-center mb-5 ">
                    <img className="inline-block object-cover w-full" src="/public/trainer_homepage.jpg" alt=""/>
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
                            <a href="/reservation">
                                <button className="mt-10  text-lg text-white no-underline"
                                        href="/reservation">Zarezerwuj
                                    wizytę
                                </button>
                            </a>
                        </div>
                    </div>
                    <div
                        className="homepage__about_me relative my-11 px-2.5 flex flex-col lg:flex-row lg: justify-around">
                        <img
                            className="inline-block object-cover  rounded-lg lg:w-1/3  lg:object-contain overflow-hidden "
                            src="/public/trainer_homepage.jpg" alt=""/>
                        <div className="lg:w-1/2">
                            <div className="homepage__about_me--title my-8">
                                <strong>
                                    <span className="text-5xl text-lighter-grey my-5">PARĘ SŁÓW</span>

                                    <br/>
                                    <span className="text-6xl mb-5">O MNIE</span>
                                </strong>
                            </div>
                            <div className="shape-1 absolute z-[-1] right-0 top-20">
                                <img src="/public/shape-1.png" alt="shape_1"/>
                            </div>
                            <div className="shape-2 absolute z-[-1] bottom-0 left-0">
                                <img src="/public/shape-2.png" alt="shape_2"/>
                            </div>
                            <p className="my-5">Hej! Mam na imię Michał, jestem trenerem personalnym z certyfikatem EFA,
                                instruktorem zajęć
                                grupowych, instruktorem pływania. Jestem absolwentem wychowania fizycznego na kierunku
                                trener
                                personalny w Akademii Nauk Stosowanych Wincentego Pola w Lublinie.</p>
                            <p className="mb-5">Zapraszam Cię do mnie na treningi jeśli masz problem ze zdrowiem,
                                samopoczuciem
                                lub
                                po prostu
                                potrzebujesz z kimś porozmawiać, a przy okazji zadbać o swoją kondycję fizyczną i
                                zdrowie.</p>
                            <p className="font-semibold">Pomogę Ci osiągnąć Twój zamierzony cel, a jeśli takiego jeszcze
                                nie
                                masz to
                                obierzemy go razem i
                                dojdziemy do końcowego rezultatu!</p>

                        </div>

                    </div>
                    <div className="homepage__personal_training relative my-8">

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
                                src="/public/trainer_homepage.jpg" alt=""/>
                        </div>
                        <div className="shape-1 absolute z-[-1] left-0 top-10">
                            <img src="/public/shape-1.png" alt="shape_1"/>
                        </div>
                        <div className="shape-2 absolute z-[-1] left-0 bottom-0">
                            <img src="/public/shape-2.png" alt="shape_2"/>
                        </div>
                    </div>
                    <div className="homepage__offer flex-col sm:flex-row  sm:flex sm:flex-wrap sm:justify-center">

                        <div className="p-10 mb-5 bg-even-more-darky-grey rounded-lg sm:w-2/5 sm:mx-5 lg:w-1/5">
                            <div className=" items-center justify-center mb-5 flex">
                                <img className="inline-block" src="/public/imageedit-73-3552888680_orig.png" alt=""/>
                            </div>
                            <div className="text-2xl font-bold text-red-800 text-center">Odżywanie</div>
                            <p className="mt-3 text-center">Poznaj i zastosuj strategie żywieniowe, które odmienią Twoją
                                sylwetkę bez
                                uczucia głodu.</p>
                        </div>
                        <div className="p-10 mb-5 bg-even-more-darky-grey rounded-lg sm:w-2/5 sm:mx-5 lg:w-1/5">
                            <div className=" items-center justify-center mb-5 flex">
                                <img className="inline-block" src="/public/imageedit-73-3552888680_orig.png" alt=""/>
                            </div>
                            <div className="text-2xl font-bold text-red-800 text-center">Styl życia</div>
                            <p className="mt-3 text-center">Poznaj i wprowadź w życie ważne nawyki dotyczące stylu
                                życia, aby zacząć
                                czuć
                                się niesamowicie wewnątrz i wyglądać świetnie na zewnątrz.</p>
                        </div>
                        <div className="p-10 mb-5 bg-even-more-darky-grey rounded-lg sm:w-2/5 sm:mx-5 lg:w-1/5">
                            <div className=" items-center justify-center mb-5 flex">
                                <img className="inline-block" src="/public/imageedit-73-3552888680_orig.png" alt=""/>
                            </div>
                            <div className="text-2xl font-bold text-red-800 text-center">Mindset</div>
                            <p className="mt-3 text-center">Stosując zasady nastawienia do palącego pragnienia
                                osiągnięcia swoich celów
                                -
                                staniesz się lepszą wersją siebie.</p>
                        </div>
                        <div className="p-10 mb-5 bg-even-more-darky-grey rounded-lg sm:w-2/5 sm:mx-5 lg:w-1/5">
                            <div className=" items-center justify-center mb-5 flex">
                                <img className="inline-block" src="/public/imageedit-73-3552888680_orig.png" alt=""/>
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
                        <p className="my-10 font-semibold text-lg"> Busy men and women overhaul their health & fitness
                            using
                            a
                            combination of tailored exercise, nutrition, lifestyle and mindset systems that are holistic
                            and
                            sustainable forever </p>
                        <p className="my-5 ">✓ Feel confident and attractive around their friends, family, and out in
                            public</p>
                        <p className="my-5">✓ Feel Physically & mentally strong, capable of taking on any challenge
                            without
                            worrying that their energy levels or body weight will get in the way.</p>
                        <p className="my-5">✓ Fit into the clothes they want to wear</p>
                        <p className="my-5">✓ Stop worrying about getting diseases and dying young</p>
                        <p className="my-5">✓ Run around with their kids, or grandkids, without feeling pain, winded or
                            tired;
                            and do it again the next day</p>
                        <p className="my-5">✓ Add 10+ years of healthy living to their retirement</p>
                        <p className="font-semibold my-7 text-xl">Without having to</p>
                        <p className="my-3 text-lg">✓ Starve themselves - No diets!</p>
                        <p className="my-3 text-lg">✓ Count calories or weigh foods</p>
                        <p className="my-3 text-lg">✓ Give up the foods they enjoy</p>
                        <p className="my-3 text-lg">✓ Spend hours cooking or exercising</p>
                        <p className="my-3 text-lg">✓ Share a gym with others</p>
                        <div className="flex justify-center">
                            <button className="mt-7 ">O mnie</button>
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
                                <div className="w-2/4 xl:hidden">
                                    {/*// className="homepage__transformations__container flex flex-col sm:flex-wrap sm:flex-row sm: justify-center ">*/}
                                    <Carousel showThumbs={false} autoPlay infiniteLoop centerMode interval={3000}>
                                        <div>
                                            <img
                                                className="h-96 w-96 rounded-2xl"
                                                // className="rounded-2xl my-10 sm:w-2/5 lg:w-1/5 lg: mx-4"
                                                src="/Wojciech.jpg"
                                                alt=""/>
                                            {/*<p>test</p>*/}
                                        </div>
                                        <div>
                                            <img
                                                className="h-96 w-96 rounded-2xl"
                                                // className="rounded-2xl my-10 sm:w-2/5 lg:w-1/5 lg: mx-4"
                                                src="/Bartosz.jpg"
                                                alt=""/>
                                            {/*<p>test</p>*/}
                                        </div>
                                        <div>
                                            <img
                                                className="h-96 w-96 rounded-2xl"
                                                // className="rounded-2xl my-10 sm:w-2/5 lg:w-1/5 lg: mx-4"
                                                src="/Ewa_gnaslogo.png"
                                                alt=""/>
                                            {/*<p>test</p>*/}
                                        </div>
                                        <div>
                                            <img
                                                className="h-96 w-96 rounded-2xl"
                                                // className="rounded-2xl my-10 sm:w-2/5 lg:w-1/5 lg: mx-4"
                                                src="/Tomasz2.jpg"
                                                alt=""/>
                                            {/*<p>test</p>*/}
                                        </div>
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<div className="homepage__contact relative">*/}
                    {/*    <div className="homepage__contact--title my-8">*/}
                    {/*        <strong>*/}
                    {/*            <span className="text-5xl text-lighter-grey my-5">ZAPRASZAM</span>*/}
                    {/*            <br/>*/}
                    {/*            <span className="text-4xl mb-5">DO KONTAKTU</span>*/}
                    {/*        </strong>*/}
                    {/*    </div>*/}
                    {/*    <font className="font-bold text-3xl text-center">TELEFON</font>*/}
                    {/*    <p className="text-lighter-grey font-bold text-3xl my-5 ">+ 48 501 779 384</p>*/}
                    {/*    <font className="font-bold text-3xl text-center">E-MAIL</font>*/}
                    {/*    <p className="text-lighter-grey font-bold text-2xl my-5">michal.lejwoda@gmail.com</p>*/}
                    {/*    /!*<font className="font-bold text-4xl">SOCIAL MEDIA</font>*!/*/}
                    {/*    /!*<p className="text-red-800 font-bold text-4xl my-5 ">+ 48 501 779 384</p>*!/*/}
                    {/*    /!*<div className="shape-1 absolute z-[-1] left-0 bottom-20">*!/*/}
                    {/*    /!*    <img src="/public/shape-1.png" alt="shape_1"/>*!/*/}
                    {/*    /!*</div>*!/*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}

export default Homepage