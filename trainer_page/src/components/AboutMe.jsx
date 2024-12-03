import {trainer_gallery_store} from "./trainer_gallery_store.jsx";
import {useTranslation} from "react-i18next";

const AboutMe = () => {
    const {t} = useTranslation()
    return (
        <div className="px-4">
            <div className="about_me--title text-center my-8">
                <strong>
                    <span className="text-5xl text-lighter-grey my-5">{t("A FEW WORDS")}</span>
                    <br/>
                    <span className="text-6xl mb-5 text-white">{t("ABOUT ME")}</span>
                </strong>
            </div>
            <div className="text-center text-white">
                <p className="mb-4 text-lg ">
                    {t("Hi, I’m Michał. I've been involved in sports since I was a child, with a significant – even excessive – amount of activity in my life. Initially, like many young boys, I played football, achieving both big and small successes. However, one day, at the age of 14, I went to the gym for the first time, and I’ve stayed ever since.")}
                </p>
                <p className="mb-4 text-lg">
                    {t("I chose bodybuilding and working on my own body because it's the only sport where we are the creators of our physique, and the results are 100% dependent solely on us. I started my bodybuilding journey on my own, making hundreds of mistakes on my own body, thus gathering invaluable experience that no training course can provide. After 8 years of training, I competed for the first time in bodybuilding competitions, earning the title of bronze medalist in the Polish Junior Championships in classic bodybuilding.")}
                </p>
                <p className="mb-4 text-lg">
                    {t("Currently, I am an active athlete in the IFBB federation, as well as a coach and nutrition advisor. What sets me apart from other trainers? Above all, it’s my individual approach to each client and the experience I’ve gained through years of training, which gives me an edge over those who have a lot of theory but lack practical experience.")}
                </p>
                <p className="mb-4 text-lg">
                    {t("I believe that a gram of practice is worth more than a kilogram of theory. Of course, when it comes to theory, I’m constantly developing, but I always test it on myself first before applying it in my work with clients. By working with the best coaching staff in our country and spending time daily among the top Polish bodybuilders, I gain knowledge every day that not everyone has access to.")}
                </p>
                <p className="mb-4 text-lg">
                    {t("I also follow a holistic approach to the human body. I’m aware, and I’ll try to make you aware too, that the effectiveness of training is influenced not only by a well-programmed training plan but also by proper nutrition, lifestyle, and even the psychological aspect and attitude towards the sport being practiced.")}
                </p>
            </div>
            <div className="about_me--title my-8 text-center">
                <strong>
                    <span className="text-5xl text-lighter-grey my-5">{t("COURSES")}</span>
                    <br/>
                    <span className="text-6xl mb-5 text-white">{t("TRAINING SESSIONS")}</span>
                </strong>
            </div>
            <ul className="text-center text-white">
                <li className="my-5 text-lg text-left px-3"><font className="text-red-700 text-xl">✓ </font>
                    {t("Personal Trainer Course at Strefa Sportu Training Center with Radek Słodkiewicz, 2016")}
                </li>
                <li className="my-5 text-lg text-left px-3"><font className="text-red-700 text-xl">✓ </font>
                    {t("Course on Theory and Practice in Strength Training (training systems: FBW, SPLIT, SLINGSHOT, and HOLISTIC TRAINING), 2016")}
                </li>
                <li className="my-5 text-lg text-left px-3"><font className="text-red-700 text-xl">✓ </font>
                    {t("Fundamentals of Human Nutrition at A4ACADEMY, 2017")}
                </li>
                <li className="my-5 text-lg text-left px-3"><font className="text-red-700 text-xl">✓ </font>
                    {t("Dietetics and Supplementation in Sports at A4ACADEMY, 2017")}
                </li>
                <li className="my-5 text-lg text-left px-3"><font className="text-red-700 text-xl">✓ </font>
                    {t("Sport Nutrition – Ketogenic & Carb Cycling at Premium Sport Academy, 2017")}
                </li>
                <li className="my-5 text-lg text-left px-3"><font className="text-red-700 text-xl">✓ </font>
                    {t("Psychodietetics – Premium Sport Academy with Karolina Gruszecka, 2017")}
                </li>
                <li className="my-5 text-lg text-left px-3"><font className="text-red-700 text-xl">✓ </font>
                    {t("Pharmacological Support in Bodybuilding and Sports online seminar, level 1 and 2, led by Robert Piotrkowicz, 2017")}
                </li>
                <li className="my-5 text-lg text-left px-3"><font className="text-red-700 text-xl">✓ </font>
                    {t("Expertise in handling: Type 1 and Type 2 Diabetes, Metabolic Syndrome, Hypertension, and Insulin Resistance, at Strefa Sportu Training Center, led by Rafał Nejmann, 2017")}
                </li>
                <li className="my-5 text-lg text-left px-3"><font className="text-red-700 text-xl">✓ </font>
                    {t("Leadership Workshop and Seminar at A4Academy with Katarzyna Szyguła, 2017")}
                </li>
            </ul>
            <div className="about_me--title text-center my-8">
                <strong>
                    <span className="text-5xl text-lighter-grey my-5">{t("PHOTO")}</span>
                    <br/>
                    <span className="text-6xl mb-5 text-white">{t("GALLERY")}</span>
                </strong>
            </div>
            <div className="about_me__gallery__container flex flex-col sm:flex-wrap sm:flex-row sm: justify-center ">
                {trainer_gallery_store.map((image, key) => {
                    return (
                        <img loading="lazy" key={key} className="rounded-2xl h-96 my-10 sm:w-2/4 xl:w-1/4 lg: mx-4"
                             src={image} alt=""/>
                    )
                })}
            </div>
        </div>

    )

}

export default AboutMe