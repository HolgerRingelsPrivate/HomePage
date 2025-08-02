'use client';

import ApplicationHeader from '@/components/ApplicationHeader/ApplicationHeader';
import { Content, Theme } from '@carbon/react';

export function Providers({ children }) {

  return (
    <>
    <Theme theme="g100">
      <ApplicationHeader />
      <Content>{children}</Content>
      </Theme>  
    </>
  );
}
