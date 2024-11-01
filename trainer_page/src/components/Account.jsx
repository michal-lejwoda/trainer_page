import React, {useState} from 'react';
import AccountOrders from "./AccountOrders.jsx";
import ResetPassword from "./auth/ResetPassword.jsx";
import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faWeight} from "@fortawesome/fontawesome-free-solid";
import BoxLoading from "./BoxLoading.jsx";
import SaveSettingsSuccessModal from "./modals/SaveSettingsSuccessModal.jsx";

const Account = (props) => {
    const {t} = useTranslation();
    const [activeState, setActiveState] = useState('ACCOUNT_ORDERS')
    const [successModal, setSuccessModal] = useState(false)
    return (
        <>
            {activeState ? (
                <div className="settings">
                    <h1 className="title settings__title">{t("Settings")}</h1>
                    <div className="menu settings__menu">
                        <div className="menu__elements">
                            <div className="choices menu__choices">
                                <div className="choices__element"
                                     onClick={() => setActiveState("ACCOUNT_ORDERS")}>
                                    <FontAwesomeIcon size="2x" icon={faWeight}/>
                                </div>
                                <div className="choices__element"
                                     onClick={() => setActiveState("RESET_PASSWORD")}>
                                    <FontAwesomeIcon size="2x" icon={faLock}/>
                                </div>
                            </div>
                            <div className="menu__options">
                                {activeState === 'ACCOUNT_ORDERS' &&
                                    <AccountOrders setSuccessModal={setSuccessModal}/>
                                }
                                {activeState === 'RESET_PASSWORD' &&
                                    <ResetPassword
                                        // changePassword={props.changePassword}
                                        // postLogoutAuth={props.postLogoutAuth}
                                        setSuccessModal={setSuccessModal}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                    <SaveSettingsSuccessModal show={successModal} handleClose={() => setSuccessModal(false)}/>
                </div>
            ) : (
                <div className="box-loading">
                    <BoxLoading/>
                </div>
            )}
        </>
    );
};
export default Account;