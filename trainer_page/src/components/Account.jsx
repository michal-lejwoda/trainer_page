import React, {useEffect, useState} from 'react';
import AccountOrders from "./AccountOrders.jsx";
import ResetPassword from "./auth/ResetPassword.jsx";
import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faWeight} from "@fortawesome/fontawesome-free-solid";
import BoxLoading from "./BoxLoading.jsx";
import SaveSettingsSuccessModal from "./modals/SaveSettingsSuccessModal.jsx";
import {useAuth} from "./auth/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const Account = () => {
    const {t} = useTranslation();
    const [activeState, setActiveState] = useState('ACCOUNT_ORDERS');
    const [successModal, setSuccessModal] = useState(false);
    const navigate = useNavigate();
    const {authUser} = useAuth();

    useEffect(() => {
        if (authUser == null) {
            navigate("/login");
        }
    }, [authUser, navigate]);

    if (authUser == null) {
        return <BoxLoading />;
    }

    return (
        <div className="settings">
            <h1 className="title settings__title">{t("Settings")}</h1>
            <div className="menu settings__menu">
                <div className="menu__elements">
                    <div className="choices menu__choices">
                        <div
                            className={`choices__element ${activeState === 'ACCOUNT_ORDERS' ? 'active' : ''}`}
                            onClick={() => setActiveState("ACCOUNT_ORDERS")}
                        >
                            <FontAwesomeIcon size="2x" icon={faWeight}/>
                        </div>
                        <div
                            className={`choices__element ${activeState === 'RESET_PASSWORD' ? 'active' : ''}`}
                            onClick={() => setActiveState("RESET_PASSWORD")}
                        >
                            <FontAwesomeIcon size="2x" icon={faLock}/>
                        </div>
                    </div>
                    <div className="menu__options">
                        {activeState === 'ACCOUNT_ORDERS' && (
                            <AccountOrders setSuccessModal={setSuccessModal}/>
                        )}
                        {activeState === 'RESET_PASSWORD' && (
                            <ResetPassword setSuccessModal={setSuccessModal}/>
                        )}
                    </div>
                </div>
            </div>
            <SaveSettingsSuccessModal show={successModal} handleClose={() => setSuccessModal(false)}/>
        </div>
    );
};

export default Account;
