import "aos/dist/aos.css";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {useEffect} from "react";
import Aos from "aos";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

function Homepage() {
    const {t} = useTranslation()
    useEffect(() => {
        Aos.init({duration: 2000})
    }, []);
    return (
        <div className="homepage overflow-x-hidden">
            <div className="homepage__description">
                <div className="max-h-[800px] items-center justify-center mb-5 ">
                    <img loading="lazy"
                         height="800"
                         width="800"
                         className="max-h-[800px] inline-block object-cover w-full"
                         src="/trainer_homepage2.jpg"
                         alt=""/>
                </div>
                <div className="px-4">
                    <div>
                        <div className="mb-5 font-mono font-semibold text-center px-4">
                            <p className="text-5xl text-lighter-grey my-2">{t("Michał")}</p>
                            <p className="text-6xl text-white mb-2">{t("Personal")}</p>
                            <p className="text-5xl text-lighter-grey my-2">{t("Trainer")}</p>
                        </div>
                        <p className="text-lg px-4 text-center text-white">{t("I will help you achieve your intended goal, and if you don't have one yet, we will set it together and reach the final result!")}</p>

                        <div className="flex flex-col items-center ">
                            <NavLink to="/reservation" className="text-white">
                                <button className="mt-10  text-lg bg-button-grey text-white no-underline">
                                    {t("Book an appointment.")}
                                </button>
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
                                    <span className="text-5xl text-lighter-grey my-5">{t("A FEW WORDS")}</span>

                                    <br/>
                                    <span className="text-6xl mb-5 text-white">{t("ABOUT ME")}</span>
                                </strong>
                            </div>
                            <div className="shape-1 absolute z-[-1] right-0 top-20">
                                <img loading="lazy" src="/shape-1.png" alt="shape_1"/>
                            </div>
                            <div className="shape-2 absolute z-[-1] bottom-0 left-0">
                                <img loading="lazy" src="/shape-2.png" alt="shape_2"/>
                            </div>
                            <p className="my-5 text-white">{t("Hi! My name is Michał, I am a personal trainer certified by the EFA. I graduated in physical education, specializing in personal training, from the Academy of Physical Education named after Bronisław Czech in Kraków.")}</p>
                            <p className="mb-5 text-white">{t("I invite you to join my training sessions if you have health issues or simply need help with strength training, while also taking care of your physical fitness and health.")}</p>
                            <p className="font-semibold text-white">{t("I will help you achieve your intended goal, and if you don't have one yet, we will set it together and reach the final result!")}</p>
                        </div>
                    </div>
                    <div data-aos="fade-right" className="homepage__personal_training relative my-8">

                        <div className="flex flex-col lg:flex-row lg: justify-around">

                            <div className="lg:w-1/2">
                                <strong>
                                    <span className="text-5xl text-lighter-grey my-5">{t("Personal Reverse Trainer")}</span>
                                    <br/>
                                    <span className="text-6xl mb-5 text-white">{"Trainer Reverse Personal"}</span>
                                </strong>
                                <p className="text-2xl my-10 text-red-800 font-bold">{t("Why will my training be" +
                                    " suitable for you?")}</p>
                                <p className="text-white">{t("You will find plenty of useful tips and advice on the 4 keys to success that will help you:")} </p>
                                <p className="my-5 text-left px-3 text-white"><font
                                    className="text-red-700 text-xl">✓ </font>{t("Eat better, without dieting and without feeling deprived.")}</p>
                                <p className="my-5 text-left px-3 text-white"><font
                                    className="text-red-700 text-xl">✓ </font>{t("Be active, regardless of your current fitness level.")}</p>
                                <p className="my-5 text-left px-3 text-white"><font
                                    className="text-red-700 text-xl">✓ </font>{t("Ditch the food rules, ditch fad diets and conflicting advice.")}</p>
                                <p className="my-5 text-left px-3 text-white"><font
                                    className="text-red-700 text-xl">✓ </font>{t("Incorporate fitness into your life.")}</p>
                                <p className="my-5 text-left px-3 text-white"><font
                                    className="text-red-700 text-xl">✓ </font>{t("Achieve and maintain your goals, even when life gets busy.")}</p>
                            </div>
                            <img
                                className="inline-block object-cover  rounded-lg lg:w-1/3  lg:object-contain overflow-hidden "
                                src="/trainer_homepage3.jpg" alt=""/>
                        </div>
                        <div className="shape-1 absolute z-[-1] left-0 top-10">
                            <img loading="lazy" src="/shape-1.png" alt="shape_1"/>
                        </div>
                        <div className="shape-2 absolute z-[-1] left-0 bottom-0">
                            <img loading="lazy" src="/shape-2.png" alt="shape_2"/>
                        </div>
                    </div>
                    <div className="homepage__offer flex-col sm:flex-row  sm:flex sm:flex-wrap sm:justify-center">

                        <div data-aos="fade-right"
                             className="p-10 mb-5 bg-even-more-darky-grey rounded-lg sm:w-2/5 sm:mx-5 lg:w-1/5">
                            <div className=" items-center justify-center mb-5 flex">
                                <img loading="lazy" className="inline-block" src="/icons-3-05_1_orig.png" alt=""/>
                            </div>
                            <div className="text-2xl font-bold text-red-800 text-center">{t("Nutrition")}</div>
                            <p className="mt-3 text-center text-white">{t("Learn and apply nutritional strategies that will transform your body without feeling hungry.")}</p>
                        </div>
                        <div data-aos="fade-right"
                             className="p-10 mb-5 bg-even-more-darky-grey rounded-lg sm:w-2/5 sm:mx-5 lg:w-1/5">
                            <div className=" items-center justify-center mb-5 flex">
                                <img loading="lazy" className="inline-block" src="/personheart_orig.png" alt=""/>
                            </div>
                            <div className="text-2xl font-bold text-red-800 text-center">{t("Lifestyle")}</div>
                            <p className="mt-3 text-center text-white">{t("Discover and implement important lifestyle habits to start feeling amazing on the inside and looking great on the outside.")}</p>
                        </div>
                        <div data-aos="fade-left"
                             className="p-10 mb-5 bg-even-more-darky-grey rounded-lg sm:w-2/5 sm:mx-5 lg:w-1/5">
                            <div className=" items-center justify-center mb-5 flex">
                                <img loading="lazy" className="inline-block" src="/imageedit-73-3552888680_orig.png"
                                     alt=""/>
                            </div>
                            <div className="text-2xl font-bold text-red-800 text-center">{t("Mindset")}</div>
                            <p className="mt-3 text-center text-white">{t("By applying mindset principles toward the burning desire to achieve your goals – you will become a better version of yourself.")}
                                </p>
                        </div>
                        <div data-aos="fade-left"
                             className="p-10 mb-5 bg-even-more-darky-grey rounded-lg sm:w-2/5 sm:mx-5 lg:w-1/5">
                            <div className=" items-center justify-center mb-5 flex">
                                <img loading="lazy" className="inline-block" src="/imageedit-5-5594810482_orig.png"
                                     alt=""/>
                            </div>
                            <div className="text-2xl font-bold text-red-800 text-center">{t("Exercises")}</div>
                            <p className="mt-3 text-center text-white">{t("A tailored, structured, time-efficient, and progressive exercise program to meet your needs and goals.")}</p>
                        </div>
                    </div>

                    <div className="homepage__credo bg-tourists bg-no-repeat py-10 px-4 bg-cover">
                        <div className="homepage__credo--title my-8">
                            <strong>
                                <span className="text-5xl text-lighter-grey my-5">{t("MY")}</span>
                                <br/>
                                <span className="text-6xl mb-5 text-white">{t("CREDO")}</span>
                            </strong>
                        </div>
                        <p className="my-10 font-semibold text-lg text-white">{t("Busy men and women improve their health and fitness using a combination of tailored exercise, nutrition, lifestyle, and mindset systems that are holistic and sustainable for life.")}</p>
                        <p className="my-5 text-white">{t("✓ Feel confident and attractive among friends, family, and in public spaces.")}</p>
                        <p className="my-5 text-white">{t("✓ Feel physically and mentally strong, ready to take on any challenge without worrying that your energy levels or body weight will hold you back.")}</p>
                        <p className="my-5 text-white">{t("✓ Wear the clothes you want to wear.")}</p>
                        <p className="my-5 text-white">{t("✓ Stop worrying about diseases and early death.")}</p>
                        <p className="my-5 text-white">{t("✓ Run with your kids or grandkids without feeling pain, winded, or exhausted, and do it again the next day.")}</p>
                        <p className="my-5 text-white">{t("✓ Add 10 years of healthy life to your retirement.")}</p>
                        <p className="font-semibold my-7 text-xl text-white">{t("Without worrying about:")}</p>
                        <p className="my-3 text-lg text-white">{t("✓ Starving yourself.")}</p>
                        <p className="my-3 text-lg text-white">{t("✓ Counting calories or weighing food!")}</p>
                        <p className="my-3 text-lg text-white">{t("✓ Giving up the foods you enjoy.")}</p>
                        <div className="flex justify-center">
                            <NavLink to="/about-me" className="text-white">
                                <button className="mt-7 bg-button-grey">
                                    {t("About me")}
                                </button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="homepage__transformations">
                        <div className="homepage__transformations--title text-center my-8">
                            <strong>
                                <span className="text-4xl text-lighter-grey my-5">{t("Clients Reverse Transformations")}</span>
                                <br/>
                                <span className="text-4xl mb-5 text-white">{t("Transformations Reverse Clients")}</span>
                            </strong>
                            <div
                                className="homepage__transformations__container flex flex-col sm:flex-wrap sm:flex-row sm: justify-center hidden xl:flex ">
                                <img loading="lazy" className="rounded-2xl my-10 sm:w-2/5 lg:w-1/5 lg: mx-4"
                                     src="/Wojciech.jpg"
                                     alt=""/>
                                <img loading="lazy" className="rounded-2xl my-10 sm:w-2/5 lg:w-1/5 lg: mx-4"
                                     src="/Bartosz.jpg"
                                     alt=""/>
                                <img loading="lazy" className="rounded-2xl my-10 sm:w-2/5 lg:w-1/5 lg: mx-4"
                                     src="/Ewa_gnaslogo.png"
                                     alt=""/>
                                <img loading="lazy" className="rounded-2xl my-10 sm:w-2/5 lg:w-1/5 lg: mx-4"
                                     src="/Tomasz2.jpg"
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
                            <div className="flex flex-col items-center ">
                                <NavLink to="/transformations" className="text-white">
                                    <button className="mt-10  text-lg text-white bg-button-grey no-underline">{t("More Transformations")}
                                    </button>
                                </NavLink>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage