import Aos from "aos";
import {useEffect} from "react";
import "aos/dist/aos.css";
import {transformations} from "./transformations_store.jsx";
import {useTranslation} from "react-i18next";

function Transformations() {
    const {t} = useTranslation()
    useEffect(() => {
        Aos.init({duration: 2000})
    }, []);
    return (
        <>
            <div className="transformations px-4 text-white overflow-x-hidden">
                <div className="transformations--title my-8 text-center">
                    <strong>
                        <span
                            className="text-4xl text-center text-lighter-grey my-5">{t("Clients Reverse Transformations")}</span>
                        <br/>
                        <span className="text-4xl text-center mb-5">{t("Transformations Reverse Clients")}</span>
                    </strong>
                </div>
                <div className="transformations--description">
                    <p className="mb-7 text-base text-center">{t("I will guide you through the entire process from where you are now to achieving the results shown in the pictures below. You will gain health, a better mood, and vitality, and you will pass on new, healthy habits to your children. By working with me, you will improve not only your quality of life but that of your entire family.")}</p>
                    <p className=" text-center font-semibold text-center">{t("I have been helping people on their journey to better fitness since 2012.")}
                        roku</p>
                </div>
                <div
                    className="homepage__transformations__container flex flex-col sm:flex-row sm:flex-wrap justify-center">
                    {transformations.map((el, key) => {
                        return (
                            <div key={key} data-aos={el.fade}
                                 className="my-10 sm:w-2/5 xl:w-1/5 lg: mx-4 bg-container-grey min-w-96">
                                <img loading="lazy" className="rounded-2xl h-96 min-w-96 w-full"
                                     src={el.image} alt=""/>
                                <div className="transformation__image__description p-4">
                                    <p className="flex justify-center my-3 font-semibold text-center">{el.name}</p>
                                    <p className="text-center ">
                                        {el.description}
                                    </p>
                                    <p className="font-semibold text-center mt-4 mb-10">{el.realization}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}

export default Transformations