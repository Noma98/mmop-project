'use client';

import React, { ReactNode } from 'react';
import { SWRConfig } from 'swr';

type Props = {
  children: ReactNode;
};
export default function SWRConfigContext({ children }: Props) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
}
