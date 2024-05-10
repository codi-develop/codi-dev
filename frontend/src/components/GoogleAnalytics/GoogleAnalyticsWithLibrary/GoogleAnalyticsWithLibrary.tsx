'use client';

import { useEffect } from 'react';
import { initializeGA } from './googlaAnalytics';

type WindowWithGA = Window & {
  GA_INITIALIZED: boolean;
};

declare const window: WindowWithGA;

export default function GoogleAnalyticsWithLibrary() {
  useEffect(() => {
    if (!window.GA_INITIALIZED && process.env.NODE_ENV === 'production') {
      initializeGA();
      window.GA_INITIALIZED = true;
    }
  }, []);
  return <></>;
}
