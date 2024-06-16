import { ReactNode, RefObject, forwardRef, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Alarm from '@icons/common/alarm.svg';
import theme, { device } from '@/ui/theme';
import useClickOutOfInput from '@/hooks/dropdown/useClickOutOfInput';
import Button from '@/ui/atoms/Button';

function NotificationDropdown({
  ariaLabelText,
  children,
}: {
  ariaLabelText?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLUListElement>(null);
  useClickOutOfInput('mentoring-notification', setOpen);
  return (
    <NotificationDropdownContainer width="100%">
      <NotificationButton
        id="mentoring-notification"
        width="100%"
        color={theme.colors.white}
        onClick={() => setOpen((prev) => !prev)}
        variant="square"
        type="button"
        hoverDisabled
        aria-label={ariaLabelText}
      >
        <Alarm id="notification-icon" />
      </NotificationButton>

      {open && (
        <NotificationDropdownContent ref={ref} width="100%">
          {children}
        </NotificationDropdownContent>
      )}
    </NotificationDropdownContainer>
  );
}

const NotificationButton = styled(Button)`
  padding: 0px;
`;

export const NotificationDropdownContainer = styled.div(
  ({ width }: { width?: string }) => ({
    width,
    minWidth: 'fit-content',
    position: 'relative',
  }),
);

export const NotificationDropdownButton = styled(Button)(
  ({ invalid }: { invalid: boolean | undefined }) => ({
    justifyContent: 'space-between',
    border: '1px solid',
    borderColor:
      invalid === true && invalid !== undefined
        ? theme.colors.error
        : theme.colors.gray.main,
  }),
);

const NotificationDropdownContent = styled.ul(
  ({ width }: { width?: string }) => ({
    width: width ?? '100%',
    minWidth: 'fit-content',
    maxHeight: '250px',
    // height: "250px",
    overflow: 'auto',
    position: 'absolute',
    zIndex: 1,
    top: '70px',
    right: '0px',
    marginBottom: '20px',
    backgroundColor: theme.colors.white,
    borderRadius: '10px',
    listStyle: 'none',
    border: `1px solid ${theme.colors.gray.main}`,
    overscrollBehavior: 'none',

    [device('mobile')]: {
      right: '-60px',
    },
  }),
);

export const NotificationDropdownItem = styled.button`
  text-align: left;
  padding: 15px 20px;
  width: 100%;
  min-width: 320px;
  color: ${theme.colors.text.strong};
  font-size: ${theme.fonts.size.sm}px;
  font-weight: ${theme.fonts.weight.regular};
  background-color: ${theme.colors.white};
  border: none;
  cursor: pointer;
  :hover {
    background-color: ${theme.colors.background};
  }
  :focus {
    background-color: ${theme.colors.primary.normal};
    color: ${theme.colors.white};
  }
`;

export const Divider = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 2px;
  background-color: ${theme.colors.background};
`;
export default NotificationDropdown;
