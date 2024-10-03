import {useTranslation} from "react-i18next";

function TermsAndConditions() {
    const {t} = useTranslation()
    return (
        <div className="px-4 text-white">
            <strong className="mb-5">
                <p className="text-4xl text-center text-lighter-grey my-2">{t("Terms and Conditions")}</p>
                <p className="text-4xl text-center mb-4">{t("Parties")}</p>
            </strong>

            <p className="mb-4"><strong>{t("TERMS AND CONDITIONS OF PROVIDING ELECTRONIC SERVICES")}</strong></p>

            <p>{t("These Terms and Conditions constitute the terms and conditions of providing electronic services as defined in Article 8, paragraph 1, point 1 of the Act of 18 July 2002 on providing electronic services (Journal of Laws of 2002, No. 144, item 1204, as amended), taking into account the provisions of the Act of 30 May 2014 on consumer rights (Journal of Laws of 2014, item 827).")}</p>

            <p className="my-4"><strong>{t("§ 1. General Provisions")}</strong></p>

            <p>{t("1. These Terms and Conditions define the conditions of providing electronic services by the" +
                " Service Provider within the framework of the website located at www.trenerpersonalnymichal.pl.")}</p>

            <p>{t("2. The terms used in these Terms and Conditions have the following meanings:")}</p>

            <p>{t("a) Service Provider – Michał Lejwoda")}</p>
            <p>{t("b) Website – the Service Provider’s website operated at www.michal-trener.pl.")}</p>
            <p>{t("c) Client – a natural person, legal entity, or organizational unit with legal capacity, making purchases on the Website;")}</p>
            <p>{t("d) Consumer – a Client who is a natural person making a legal transaction with the Service Provider, who is an entrepreneur, which is not directly related to the person’s business or professional activity;")}</p>
            <p>{t("e) Newsletter – materials sent by the Service Provider electronically to Clients who have expressly agreed to receive them, which may constitute commercial information within the meaning of the Act of 18 July 2002 on providing electronic services (Journal of Laws of 2002, No. 144, item 1204, as amended).")}</p>
        </div>
    )
}

export default TermsAndConditions