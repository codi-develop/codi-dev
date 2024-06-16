import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import Overlay from '@/ui/atoms/BackgroundOverlay';
import Button from '@/ui/atoms/Button';
import FlexBox from '@/ui/atoms/FlexBox';
import theme, { device } from '@/ui/theme';
import { SetState } from '@/index';
import useSideBar from '@/hooks/useSideBar';
import { SideNavigator } from '@/ui/atoms/Navigator';
import { keyframes } from '@emotion/css';
import { fadeIn } from '@/ui/molecules/Modal/Modal.styled';
import Typography from '@/ui/atoms/Typography';

interface SideBarSideNavigator {
  iconComponent?: React.JSX.Element;
  currentIconComponent?: React.JSX.Element;
  nestedParentIconComponent?: React.JSX.Element;
  name: string;
  href: string;
  adornment?: React.JSX.Element;
}

interface SideBarSideNavigators extends SideBarSideNavigator {
  nested?: SideBarSideNavigator[];
}

function SideBar({
  navigators,
  open,
  setOpen,
}: {
  navigators: SideBarSideNavigators[];
  open: boolean;
  setOpen: SetState<boolean>;
}) {
  const { setNestedParent, setCurrent, current, nestedParent, path } =
    useSideBar(navigators, setOpen);

  return (
    <Container open={open}>
      <FlexBox direction="column">
        {navigators.map(
          (
            {
              name,
              href,
              iconComponent,
              currentIconComponent,
              nestedParentIconComponent,
              nested,
              adornment,
            },
            index,
          ) => {
            return (
              <div key={index}>
                <SideNavigator
                  onClick={() => {
                    setNestedParent(nested ? href : '');
                    setCurrent(href);
                  }}
                  current={current === href && nestedParent !== href}
                  nestedParent={nestedParent === href}
                  href={href!}
                  key={`${name}_${index}`}
                >
                  <FlexBox justifyContent="flex-start" columnGap="10px">
                    {nestedParent === href && nestedParentIconComponent}
                    {nestedParent !== href &&
                      (current === href ? currentIconComponent : iconComponent)}
                    <Typography
                      variant="div"
                      color={
                        current === href
                          ? theme.colors.white
                          : theme.colors.text.strong
                      }
                    >
                      {name}
                    </Typography>
                    {adornment}
                  </FlexBox>
                </SideNavigator>
                {nested?.map(
                  ({ name: nestedName, href: nestedHref }, index) => {
                    return (
                      <SideNavigator
                        onClick={() => {
                          if (!nestedParent) {
                            setNestedParent(href);
                          }
                          setCurrent(nestedHref!);
                        }}
                        current={path === nestedHref}
                        nested={2}
                        key={`${name}_${index}`}
                        href={nestedHref!}
                      >
                        {nestedName}
                      </SideNavigator>
                    );
                  },
                )}
              </div>
            );
          },
        )}
      </FlexBox>
    </Container>
  );
}

const Container = styled.nav(({ open }: { open: boolean }) => ({
  display: open ? 'block' : 'none',
  width: '244px',
  height: '93vh',
  position: 'sticky',
  alignSelf: 'flex-start',
  left: '0px',
  top: '59px',

  background: theme.colors.white,
  boxShadow: '0px 2px 4px 0px rgba(22, 23, 24, 0.08)',
  [device('smWeb')]: {
    position: 'fixed',
    zIndex: '3',
    top: '0px',
    height: '100%',
    animation: `${fadeIn} 0.2s ease-in-out`,
  },
}));

export const SideBarOverlay = styled(Overlay)(
  ({ open }: { open: boolean }) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.20)',
    display: 'none',
    [device('smWeb')]: {
      display: open ? 'block' : 'none',
    },
  }),
);

export const MobileMenuButton = styled(Button)({
  position: 'fixed',
  top: '20px',
  left: '20px',
  maxWidth: 'none',
  width: '56px',
  height: '56px',
  borderRadius: '32px',
  boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.04)',
  border: 'solid 1px #eeeff2',
  backgroundColor: theme.colors.white,
});

export default SideBar;
