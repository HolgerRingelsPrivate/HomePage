'use client';

import React from 'react';
import {
    ComposedModal, ModalHeader, ModalBody, ModalFooter, Button,
    Accordion, AccordionItem
} from '@carbon/react';
import i18n from '@/singletons/i18n/I18n';


const ModalHelp = ({ open, setOpen }) => {
    let emailAdress = 'xyz@bla.com';
    let eMailTo = 'mailto:' + emailAdress;
    let providingTeam = 'Team ABC at bla.com';
    return (
        <ComposedModal size="small" open={open} onClose={() => setOpen(false)}>
            <ModalHeader 
            	title={i18n.t("app.title") + " - " + i18n.t("ApplicationHeader.ModalHelp.heading.post")}
            	closeModal={() => setOpen(false)} 
            	/>
            <ModalBody>
                <div>
                    <p className="margin-b-16">
                        {i18n.t("ApplicationHeader.ModalHelp.text.subheading")} <a href={eMailTo}>{emailAdress}</a><br/><br/>
                    </p>
                    <Accordion align="start">
                        <AccordionItem title={i18n.t("ApplicationHeader.ModalHelp.Accordion1.heading")} open = {true}>
                            {i18n.t("ApplicationHeader.ModalHelp.Accordion1.text1")} <a href={eMailTo}>{emailAdress}</a> {i18n.t("ApplicationHeader.ModalHelp.Accordion1.text2")} 

                        </AccordionItem>
                        <AccordionItem title={i18n.t("ApplicationHeader.ModalHelp.Accordion2.heading")} open = {true}>
                            {i18n.t("ApplicationHeader.ModalHelp.Accordion2.text1")}:&nbsp;{providingTeam}<br/>
                            {i18n.t("ApplicationHeader.ModalHelp.Accordion2.text2")}
                            &nbsp;
                            <a href={eMailTo}>{emailAdress}</a>
                            &nbsp;
                            {i18n.t("ApplicationHeader.ModalHelp.Accordion2.text3")}
                            &nbsp;
                            .
                          </AccordionItem>
                    </Accordion>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button
                    kind="secondary"
                    onClick={() => setOpen(false)}
                >
                    {i18n.t("ApplicationHeader.ModalHelp.closeButton")}
                </Button>
                <Button
                    disabled={true}
                    kind="ghost"

                >

                </Button>
            </ModalFooter>
        </ComposedModal>
    );
};

export default ModalHelp;
