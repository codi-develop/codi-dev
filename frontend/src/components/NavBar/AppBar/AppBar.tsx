'use client';

import styled from '@emotion/styled';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import theme, { device } from '@/ui/theme';
import { selectUser } from '@/features/user/userSlice';
import { selectAuth } from '@/features/auth/authSlice';
import UserAppBarMenu from './AppBarMenu/UserAppBarMenu';
import NonUserAppBarMenu from './AppBarMenu/NonUserAppBarMenu';
import AppBarTab from './AppBarMenu/AppBarTab';
import { APPBAR_NOT_SHOWING_PAGES } from '@/constants';
import 'react-loading-skeleton/dist/skeleton.css';

function AppBar() {
  const path = usePathname();
  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);

  if (APPBAR_NOT_SHOWING_PAGES.includes(path)) return;

  return (
    <StyledAppBar>
      <AppBarTab />
      {auth?.isLoggedIn && user.id && <UserAppBarMenu />}
      {auth?.isLoggedIn === false && <NonUserAppBarMenu />}
    </StyledAppBar>
  );
}

const StyledAppBar = styled.nav({
  width: '100%',
  padding: '0px 15.8%',
  position: 'sticky',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  top: '0',
  zIndex: '998',
  height: '59px',
  backgroundColor: theme.colors.white,
  borderBottom: `1px solid ${theme.colors.gray.main}`,

  [device('smWeb')]: {
    display: 'none',
  },
});

export default AppBar;
