import Overlay from '@/ui/atoms/BackgroundOverlay';
import { device } from '@/ui/theme';
import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';

export const ModalOverlay = styled(Overlay)({
  backgroundColor: 'rgba(0,0,0,0.4)',
  zIndex: 999,
  cursor: 'default',
});

export const ModalContainer = styled.div({
  position: 'fixed',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  zIndex: 1000,
  boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.04)',
  cursor: 'default',

  [device('tablet')]: {
    transform: 'translate(-50%, -50%)',
    top: '50%',
    width: '90%',
  },
});

export const ModalExternalContainer = styled.div(() => ({
  animation: `${fadeIn} 0.3s`,
}));

export const fadeIn = keyframes`
    0% {
      opacity: 0;
    }
    100%{
      opacity:1;
    }
  `;
