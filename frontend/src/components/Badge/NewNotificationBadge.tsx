import styled from '@emotion/styled';
import InvisibleLabel from '@/ui/atoms/InvisibleLabel';

const StyledNewNotificationBadge = styled.div(({}: {}) => ({
  position: 'absolute',
  top: '8px',
  right: '4px',
  width: '7px',
  zIndex: '1',
  height: '7px',
  backgroundColor: '#E0291D',
  borderRadius: '50%',
}));

function NewNotificationBadge() {
  return <StyledNewNotificationBadge />;
}

export default NewNotificationBadge;
