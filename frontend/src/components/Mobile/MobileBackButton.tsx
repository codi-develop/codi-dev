'use client';

import InvisibleLabel from '@/ui/atoms/InvisibleLabel';
import { device } from '@/ui/theme';
import styled from '@emotion/styled';
import Back from '@icons/mobile/appbar/back.svg';
import { useRouter } from 'next/navigation';

const MobileBackButton = () => {
  const router = useRouter();
  return (
    <StyledMobileBackButton id="mobileBackButton" onClick={() => router.back()}>
      <InvisibleLabel htmlFor="mobileBackButton" text="뒤로가기" />
      <Back />
    </StyledMobileBackButton>
  );
};
const StyledMobileBackButton = styled.button(() => ({
  background: 'transparent',
  outline: 'none',
  border: 'none',
  display: 'none',
  [device('tablet')]: {
    display: 'block',
    marginBottom: '8px',
  },
}));

export default MobileBackButton;
