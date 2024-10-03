import {useTranslation} from "react-i18next";

function PrivatePolicy() {
    const {t} = useTranslation()
    return (<>

        <header className="entry-header">
            <strong className="mb-5">
                <p className="text-4xl text-center text-lighter-grey my-2">{t("Privacy")}</p>

                <p className="text-4xl text-center mb-4">{t("Policy")}</p>
            </strong>
        </header>


        <div className="entry-content px-4 my-4">
            <p><strong>{t("1. Data Administrator")}</strong></p>
            <p>{t("The administrator of your personal data is Michał Lejwoda")}</p>
            <p>{t("If you have any questions regarding the method, purpose, or scope of data processing by the Administrator or questions concerning your rights, you can contact the Administrator via email at: michal.lejwoda@gmail.com")}</p>
            <br/>

            <p><strong>{t("2. GDPR")}</strong></p>
            <p>{t("GDPR is the Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data, and repealing Directive 95/46/EC. GDPR regulates issues related to the processing of personal data.")}</p>
            <br/>

            <p><strong>{t("3. Purposes and legal grounds for processing personal data")}</strong></p>
            <p>{t("Your personal data is processed for the purpose of concluding and performing a contract with the Administrator, i.e., a contract for the provision of services specified in the Terms of Service available on the website www.michal-trener.com (legal basis: Article 6(1)(b) of GDPR).")}</p>
            <p>{t("Your personal data is also processed to fulfill legal obligations incumbent on the Administrator related to issuing invoices, receipts, and maintaining financial reporting (legal basis: Article 6(1)(c) of GDPR).")}</p>
            <p>{t("Furthermore, in some cases, it is or may be necessary to process your personal data for purposes resulting from the legitimate interests of the Administrator (legal basis: Article 6(1)(f) of GDPR), in particular:")}</p>
            <ul>
                <li>{t("1) for marketing the products and services offered by the Administrator or the Administrator's partners,")}</li>
                <li>{t("2) for responding to inquiries submitted via the contact form,")}</li>
                <li>{t("3) for handling complaints regarding services provided by the Administrator,")}</li>
                <li>{t("4) for purposes related to monitoring and improving the quality of services provided by the Administrator,")}</li>
                <li>{t("5) where applicable – for purposes related to conducting legal proceedings, as well as proceedings before public authorities or other proceedings, including the pursuit and defense of claims,")}</li>
                <li>{t("6) for sending commercial information electronically as defined by the Act of 18 July 2002 on the provision of services by electronic means (if appropriate consent has been given).")}</li>
            </ul>
            <p>{t("In other cases, your personal data will be processed solely based on consent (legal basis: Article 6(1)(a) or Article 9(2)(a) of GDPR), for purposes specified in the consent.")}</p>
            <br/>
            <p><strong>{t("4. Obligation to provide personal data")}</strong></p>
            <p>{t("Providing your personal data is a condition for concluding and properly performing the contract or processing a submitted inquiry, complaint, or report. Failure to provide the required personal data may prevent the conclusion and execution of the contract and the provision of services by the Administrator.")}</p>
            <br/>

            <p><strong>{t("5. Information about recipients of personal data")}</strong></p>
            <p>{t("Your personal data may be shared with the following recipients or categories of recipients:")}</p>
            <br/>
            <p>1) {t("public authorities and entities performing public tasks or acting on behalf of public authorities, to the extent and for the purposes resulting from applicable law,")}</p>
            <br/>
            <p>2) {t("entities supporting the Administrator in carrying out his business and operational processes, including entities processing personal data on behalf of the Administrator,")}</p>
            <br/>
            <p>3) {t("the electronic payment operator.")}</p>
            <br/>

            <p><strong>{t("6. Periods of personal data processing")}</strong></p>
            <p>{t("Your personal data will be processed for the period necessary to achieve the purposes of processing indicated in point 3 above, i.e., for the duration:")}</p>
            <br/>
            <ol>
                <li>{t("a) of the contract binding you with the Administrator,")}</li>
                <br/>
                <li>{t("b) of fulfilling legal obligations incumbent on the Administrator, including obligations related to data storage, e.g., for financial reporting purposes,")}</li>
                <br/>
                <li>{t("c) of the Administrator’s legitimate interests, in particular for the periods of limitation specified in separate regulations,")}</li>
                <br/>
                <li>{t("d) until the withdrawal of consent – if the processing is based on your consent.")}</li>
            </ol>
            <br/>

            <p><strong>{t("7. Profiling and automated decision-making")}</strong></p>
            <p>{t("Your personal data will not be subject to profiling. The Administrator will not make automated decisions that have significant consequences for you.")}</p>
            <br/>

            <p><strong>{t("8. Rights of the data subject")}</strong></p>
            <p>{t("In connection with the processing of your personal data, you have the following rights:")}</p>
            <ol>
                <li>{t("a) the right to access personal data, including the right to obtain a copy of such data,")}</li>
                <br/>
                <li>{t("b) the right to request rectification (correction) of data,")}</li>
                <br/>
                <li>{t("c) the right to request the erasure of personal data (the so-called 'right to be forgotten'),")}</li>
                <br/>
                <li>{t("d) the right to request restriction of the processing of personal data,")}</li>
                <br/>
                <li>{t("e) the right to data portability, including the right to transfer data directly to another data controller,")}</li>
                <br/>
                <li>{t("f) the right to object to the processing of personal data.")}</li>
            </ol>
            <br/>

            <p>{t("You can exercise the above rights:")}</p>
            <p>{t("The scope of each of the above rights and the situations in which you can exercise them are determined by law. The possibility of exercising some of these rights may depend, among other things, on the legal grounds, purpose, or method of processing.")}</p>
            <br/>

            <p><strong>{t("9. Right to withdraw consent to personal data processing")}</strong></p>
            <p>{t("To the extent that you have given consent for the processing of personal data, you have the right to withdraw this consent. Withdrawal of consent does not affect the lawfulness of the processing carried out on the basis of consent before its withdrawal.")}</p>
            <br/>

            <p><strong>{t("10. Right to lodge a complaint with a supervisory authority")}</strong></p>
            <p>{t("If you believe that the processing of your personal data violates applicable law, you may lodge a complaint with the supervisory authority – the President of the Personal Data Protection Office (ul. Stawki 2, 00-193 Warsaw).")}</p>
            <br/>

            <p>
                <strong>{t("11. Transfer of personal data to entities outside the European Economic Area ('EEA') or international organizations")}</strong>
            </p>
            <p>{t("The Administrator does not plan to transfer your personal data to entities outside the EEA or to international organizations.")}</p>
        </div>


    </>)
}

export default PrivatePolicy