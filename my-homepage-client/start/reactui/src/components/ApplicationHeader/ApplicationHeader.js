'use client';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenu,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
} from '@carbon/react';
import { User, Help, Information } from '@carbon/icons-react';
import Link from 'next/link';
import React, { useState } from 'react';
import ModalLoggedInUser from './ModalLoggedInUser';
import ModalHelp from './ModalHelp';
import ModalInfo from './ModalInfo';
import ApplicationHeaderContent from './ApplicationHeaderContent'


const ApplicationHeader = () => {

  return (
    <>
      <ApplicationHeaderContent/>
    </>
  );
};

export default ApplicationHeader;

