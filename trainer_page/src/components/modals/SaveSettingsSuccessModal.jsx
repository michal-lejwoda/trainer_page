import React from 'react';
import Modal from "react-bootstrap/Modal";
import {CloseButton} from "react-bootstrap";
import {t} from "i18next";

const SaveSettingsSuccessModal = (props) => {
    return (
        <Modal className="transparent-modal" show={props.show} onHide={props.handleClose}>
            <Modal.Header>
                <Modal.Title>{t("Settings saved")}</Modal.Title>
                <CloseButton onClick={props.handleClose} variant="white"/>
            </Modal.Header>
            <Modal.Body>
                <p>{t("Successfully saved the settings !!!")}</p>
            </Modal.Body>
            <Modal.Footer>
                <button className="standard-button" onClick={props.handleClose}>{t("Close")}</button>
            </Modal.Footer>
        </Modal>
    );
};

export default SaveSettingsSuccessModal;
