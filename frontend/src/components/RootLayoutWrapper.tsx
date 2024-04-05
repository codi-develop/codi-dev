'use client';

import '../app/globals.css';
import '../components/Skeleton/skeleton.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { ReactNode } from 'react';
import { store } from '@/store/store';
import AccessibilityLayout from '@/components/Layout/AccessibilityLayout';
import theme from '@/ui/theme';
import AppBar from '@/components/NavBar/AppBar/AppBar';
import AccessibilityFloating from '@/components/Accessibility/AccessibilityFloating';
import MobileBottomNavigation from './NavBar/AppBar/MobileBottomNavigation';
import GlobalModal from '@/ui/molecules/Modal/GlobalModal';
import AppLayout from './Layout/AppLayout';
import ChannelTalkFloating from './ChannelTalk/ChannelTalkFloating';
import '../utils/channeltalk/channelTalk';

const queryClient = new QueryClient();

function RootLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AppLayout>
            <AccessibilityLayout>
              <AppBar />
              <MobileBottomNavigation />
              {children}
              <ChannelTalkFloating />
              <AccessibilityFloating />
              <GlobalModal />
            </AccessibilityLayout>
          </AppLayout>
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default RootLayoutWrapper;
