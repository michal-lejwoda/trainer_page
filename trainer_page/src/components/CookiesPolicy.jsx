import {useTranslation} from "react-i18next";

function CookiesPolicy() {
    const {t} = useTranslation()
    return (<div className="px-4">
        <strong className="mb-5">
            <p className="text-4xl text-center text-lighter-grey my-2">{t("Cookies")}</p>

            <p className="text-4xl text-center mb-4">{t("Policies")}</p>
        </strong>

        <p>{t("And the Administrator, in accordance with the provisions of Article 173 and 174 of the Act of July 16, 2004, Telecommunications Law (consolidated text Journal of Laws of 2014, item 243), uses 'cookies' files, which are used to collect information about Users' use of the Administrator's website at the address trenerpersonalnymichal.pl (hereinafter referred to as the 'Service').")}
        </p>
        <br/>
        <p>
            {t("The Service uses Cookies. Cookies are text files stored on the User's end device and are used to browse the Service pages.")}
            {t("The purpose of using Cookies by the Service is:")}
        </p>
        <br/>
        {t("a) adapting the content of the website to the individual needs and preferences of the User;")}
        <br/>
        <br/>
        {t("b) maintaining the User's session.")}
        <br/>
        <br/>
        <p>
            {t("During visits to the Service, the Service's system sends at least one Cookie file to the User's computer to uniquely identify the browser.")}
            {t("The information sent by the User's browser is automatically recorded on the Server.")}
            {t("Each User has the option to block the reception of Cookies, allowing them to remain anonymous, however, in such a case, the Service will not be able to identify the User or their preferences.")}
            {t("Limiting the transmission of Cookies may, therefore, affect some functionalities of the Service.")}
            {t("To block the reception of Cookies or receive information about each time they are placed on the User's end device, appropriate settings in the web browser should be modified.")}
        </p>
        <br/>
        <p>
            {t("Cookies are available to the Administrator.")}
            {t("Cookies placed on the end device may also be used by the provider of the Google Analytics and Google AdWords services, in accordance with its privacy policy.")}

        </p>
        <br/>
        <p>
            {t("Cookies and the information stored in them or the ability to access them do not cause configuration changes in the device and software installed on that device.")}
            {t("If the User does not change the default settings of the web browser regarding Cookies, they will be placed on their end device and used in accordance with the rules specified by the web browser provider.")}
            {t("And this, Cookies may be stored on the User's end device, and the Administrator may access the information contained in these files.")}

        </p>
        <br/>
        <p>
            {t("And information on managing Cookies in individual browsers can be found on the pages dedicated to each browser:")}
            <p>
                <br/>
                a)
                Firefox: {t("https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer")}
            </p>
            <br/>
            <p>
                b) Internet
                Explorer: {t("https://support.microsoft.com/en-gb/topic/description-of-cookies-ad01aa7e-66c9-8ab2-7898-6652c100999d")}
            </p>
            <br/>
            <p>
                c) Chrome: {t("https://support.google.com/chrome/answer/95647?hl=en")}
            </p>
            <br/>
            <p>
                d) Opera: {t("https://help.opera.com/en/latest/web-preferences/#cookies")}
            </p>
            <br/>
            <p className="mb-4">
                e) Safari: {t("https://support.apple.com/en-gb/105082")}
            </p>
        </p>
    </div>)
}

export default CookiesPolicy