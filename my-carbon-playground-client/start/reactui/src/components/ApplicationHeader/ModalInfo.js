'use client';

import React from 'react';
import {
    ComposedModal, ModalHeader, ModalBody, ModalFooter, Button,
    Accordion, AccordionItem
} from '@carbon/react';
import i18n from '@/singletons/i18n/I18n';


const ModalInfo = ({ open, setOpen }) => {
    return (
        <ComposedModal size="small" open={open} onClose={() => setOpen(false)}>
            <ModalHeader 
            	title={i18n.t("app.title") + " - " + i18n.t("ApplicationHeader.ModalInfo.heading.post")}
            	closeModal={() => setOpen(false)} 
            	/>
            <ModalBody>
                <div>
                    <p className="margin-b-16">
                        {i18n.t("ApplicationHeader.ModalInfo.text.subheading")}<br/><br/>
                    </p>
                    <Accordion align="start">
                        <AccordionItem title={i18n.t("ApplicationHeader.ModalInfo.Accordion1.heading")} open = {true}>
                            {i18n.t("ApplicationHeader.ModalInfo.Accordion1.text1")} 

                        </AccordionItem>
                    </Accordion>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button
                    kind="secondary"
                    onClick={() => setOpen(false)}
                >
                    {i18n.t("ApplicationHeader.ModalInfo.closeButton")}
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

export default ModalInfo;
