'use client';

import React from 'react';
import { ComposedModal, ModalHeader, ModalBody, ModalFooter, Button } from '@carbon/react';
import { Logout } from '@carbon/icons-react';
import i18n from '@/singletons/i18n/I18n';

import appSession from '@/singletons/session/AppSession';
import * as AppSessionData from '@/singletons/session/AppSessionData';


const ModalLoggedInUser = ({ open, setOpen, doLogOutAndResetData }) => {
    let oUser = appSession.getObject(AppSessionData.OBJECT_DEF.LOGGED_IN_USER);
    let user = '';
    if (oUser !== undefined) {
        user = oUser.user;  
    } 

    return (
        <ComposedModal size="small" open={open} onClose={() => setOpen(false)}>
            <ModalHeader 
            	title={i18n.t("app.title") + " - " + i18n.t("ApplicationHeader.ModalUser.heading.post")}
            	closeModal={() => setOpen(false)} 
            	/>
            <ModalBody>
                <div className="padding-l-16">
                    <p>
                    {i18n.t("ApplicationHeader.ModalUser.account.label1")} : &nbsp;{user}
                    </p>
                    <hr size="1"></hr>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button kind="secondary" onClick={() => setOpen(false)}>
                {i18n.t("ApplicationHeader.ModalUser.closeButton")}
                </Button>
                <Button kind="primary" renderIcon={Logout} onClick={() => {
                    // Handle primary action
                    doLogOutAndResetData();
                }}>
                    {i18n.t("ApplicationHeader.ModalUser.logOutButton")}
                </Button>
            </ModalFooter>
        </ComposedModal>
    );
};

export default ModalLoggedInUser;
