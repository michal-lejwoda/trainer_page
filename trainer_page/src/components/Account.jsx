import React, {useEffect, useState} from 'react';
import AccountOrders from "./AccountOrders.jsx";
import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faShoppingCart} from "@fortawesome/fontawesome-free-solid";
import BoxLoading from "./BoxLoading.jsx";
import SaveSettingsSuccessModal from "./modals/SaveSettingsSuccessModal.jsx";
import {useAuth} from "./auth/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import AccountResetPassword from "./AccountResetPassword.jsx";

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
        return <BoxLoading/>;
    }

    return (
        <div className="settings flex justify-center">
            <div
                className="menu settings__menu flex flex-row  rounded-lg p-6 min-h-[600px] min-w-[700px] max-w-[800px]">
                <div className="menu__choices flex flex-col  items-center border-r-2 mr-5">
                    <div
                        className={`cursor-pointer choices__element w-full flex justify-center pb-4 pr-2 ${activeState === 'ACCOUNT_ORDERS' ? 'active' : ''}`}
                        onClick={() => setActiveState("ACCOUNT_ORDERS")}
                    >
                        <FontAwesomeIcon size="2x" icon={faShoppingCart}/>
                    </div>
                    <div
                        className={`cursor-pointer choices__element pt-4 w-full flex justify-center border-t-2 ${activeState === 'RESET_PASSWORD' ? 'active' : ''}`}
                        onClick={() => setActiveState("RESET_PASSWORD")}
                    >
                        <FontAwesomeIcon size="2x" icon={faLock}/>
                    </div>
                </div>
                <div className="menu__options min-w-[700px] flex-grow flex">
                    {activeState === 'ACCOUNT_ORDERS' && (
                        <AccountOrders setSuccessModal={setSuccessModal}/>
                    )}
                    {activeState === 'RESET_PASSWORD' && (
                        <AccountResetPassword setSuccessModal={setSuccessModal}/>
                    )}
                </div>
            </div>
            <SaveSettingsSuccessModal show={successModal} handleClose={() => setSuccessModal(false)}/>
        </div>
    );
};

export default Account;
