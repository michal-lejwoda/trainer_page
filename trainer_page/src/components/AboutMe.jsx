import {trainer_gallery_store} from "./trainer_gallery_store.jsx";

function AboutMe() {
    return (
        <div className="px-4">
            <div className="about_me--title text-center my-8">
                <strong>
                    <span className="text-5xl text-lighter-grey my-5">PARĘ SŁÓW</span>
                    <br/>
                    <span className="text-6xl mb-5">O MNIE</span>
                </strong>
            </div>
            <div className="text-center">
                <p className="mb-4 text-lg ">
                    Cześć, jestem Michał, ze sportem mam kontakt od najmłodszych lat, w moim życiu zawsze była duża, a
                    nawet
                    zbyt duża ilość aktywności. Początkowo jak to u każdego młodego chłopaka była to piłka nożna z
                    większymi
                    jak i mniejszymi sukcesami. Natomiast pewnego dnia w wieku 14 lat poszedłem pierwszy raz na siłownię
                    i
                    już tam zostałem.
                </p>
                <p className="mb-4 text-lg">
                    Wybrałem kulturystykę i pracę nad własnym ciałem, gdyż jest to jedyny tak piękny sport gdzie
                    jesteśmy
                    twórcami własnego ciała i to, jakie będą efekty w 100% jest zależne tylko i wyłącznie od nas. Swoją
                    przygodę z kulturystyką zacząłem sam, popełniając setki błędów na własnym ciele, tym samym zbierając
                    bezcenne doświadczenie, którego nie zdobędziemy na żadnym szkoleniu, po 8 latach treningów
                    wystartowałem
                    pierwszy raz w zawodach kulturystycznych tym samym zdobywając tytuł brązowego medalisty Mistrzostw
                    Polski Juniorów w kulturystyce klasycznej.
                </p>
                <p className="mb-4 text-lg">
                    Aktualnie jestem czynnym zawodnikiem federacji IFBB, trenerem, jak i doradcą żywieniowym. Co mnie
                    wyróżnia od innych trenerów? Przede wszystkim indywidualne podejście do każdego podopiecznego i
                    doświadczenie, które zdobywałem przez lata treningów, dzięki czemu mam przewagę nad tymi, co
                    posiadają
                    dużą ilość teorii, a brakuje im praktyki.
                </p>
                <p className="mb-4 text-lg">
                    Jestem zdania, że gram praktyki jest warty więcej niż kilogram teorii, oczywiście jeśli chodzi o
                    teorię
                    rozwijam się cały czas, ale najpierw sprawdzam ją na sobie, a następnie przenoszę na pracę z ludźmi.
                    Współpracując również z najlepszym sztabem trenerskim w naszym kraju i przebywając codziennie wśród
                    czołówki polskiej kulturystyki zdobywam wiedzę każdego dnia, do której nie każdy może mieć dostęp.
                </p>
                <p className="mb-4 text-lg">
                    Kieruję się również holistycznym podejściem do ludzkiego ciała. Mam świadomość i postaram się
                    uświadomić
                    to również Tobie, że na skuteczność treningów ma wpływ nie tylko dobrze zaprogramowany plan
                    treningowy,
                    ale także sposób odżywiania, tryb życia oraz sfera psychologiczna człowieka, a nawet nastawienie do
                    rodzaju uprawianego sportu.
                </p>
            </div>
            <div className="about_me--title my-8 text-center">
                <strong>
                    <span className="text-5xl text-lighter-grey my-5">KURSY</span>
                    <br/>
                    <span className="text-6xl mb-5">SZKOLENIA</span>
                </strong>
            </div>
            <ul className="text-center">
                <li className="my-5 text-lg text-left px-3"><font className="text-red-700 text-xl">✓ </font>
                    Kurs na Trenara Personalnego w Centum Szkoleniowym Strefa Sportu u Radka Słodkiewicza 2016
                </li>
                <li className="my-5 text-lg text-left px-3"><font className="text-red-700 text-xl">✓ </font>
                    Kurs z Teorii i praktyki w treningu siłowym (systemy treningowe: FBW, SPLIT, SLINGSHOT oraz TRENING
                    HOLISTYCZNY) 2016
                </li>
                <li className="my-5 text-lg text-left px-3"><font className="text-red-700 text-xl">✓ </font>
                    “Fundamenty żywienia Człowieka” w A4ACADEMY’ 2017
                </li>
                <li className="my-5 text-lg text-left px-3"><font className="text-red-700 text-xl">✓ </font>
                    “Dietetyki i suplementacja w sporcie” w A4ACADEMY 2017
                </li>
                <li className="my-5 text-lg text-left px-3"><font className="text-red-700 text-xl">✓ </font>
                    “Sport Nutrition – Ketogenic & Carb Cyccling” w Premium Sport Academy; 2017
                </li>
                <li className="my-5 text-lg text-left px-3"><font className="text-red-700 text-xl">✓ </font>
                    “Psychodietetyka” – Premium Sport Academy Karolina Gruszecka;
                </li>
                <li className="my-5 text-lg text-left px-3"><font className="text-red-700 text-xl">✓ </font>
                    “Wspomaganie farmakologiczne w kulturystyce i sporcie” seminarium on-line poziom 1 i 2, prowadzący
                    seminarium Robert Piotrkowicz 2017
                </li>
                <li className="my-5 text-lg text-left px-3"><font className="text-red-700 text-xl">✓ </font>
                    Kompetencje o wiedzę z zakresu postępowania w: Cukrzycy typu 1 i 2, zespole metabolicznym,
                    nadciśnieniu tętniczym i insulinooporności również w Centrum Szkoleniowym Strefa Sportu prowadzonego
                    przez Rafała Nejmanna 2017
                </li>
                <li className="my-5 text-lg text-left px-3"><font className="text-red-700 text-xl">✓ </font>
                    Leadership workshop and seminar A4Academy Katarzyna Szyguła 2017
                </li>
            </ul>
            <div className="about_me--title text-center my-8">
                <strong>
                    <span className="text-5xl text-lighter-grey my-5">GALERIA</span>
                    <br/>
                    <span className="text-6xl mb-5">ZDJĘĆ</span>
                </strong>
            </div>
            <div className="about_me__gallery__container flex flex-col sm:flex-wrap sm:flex-row sm: justify-center ">
                {trainer_gallery_store.map((image, key)=>{
                    return (
                        <img key={key} className="rounded-2xl h-96 my-10 sm:w-2/4 xl:w-1/4 lg: mx-4" src={image} alt=""/>
                    )
                })}
            </div>
        </div>

    )

}

export default AboutMe