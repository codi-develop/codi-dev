import Link from 'next/link';
import Logo from '@icons/logo/logo-primary.svg';
import { usePathname } from 'next/navigation';
import { TopNavigator } from '@/ui/atoms/Navigator';
import FlexBox from '@/ui/atoms/FlexBox';
import Typography from '@/ui/atoms/Typography';
import theme from '@/ui/theme';

function AppBarTab() {
  const path = usePathname();

  return (
    <FlexBox
      justifyContent="space-between"
      {...{ height: '100%', maxWidth: '50%' }}
    >
      <Link href="/" aria-label="홈으로 이동">
        <Logo width="108px" height="26px" />
      </Link>

      <TopNavigator current={path.includes('/mentorsMain')} href="/mentorsMain">
        <Typography
          color={
            path.includes('/mentorsMain')
              ? theme.colors.white
              : theme.colors.text.strong
          }
          variant="div"
        >
          멘토 찾기
        </Typography>
      </TopNavigator>
      <TopNavigator
        current={path.includes('/menteeCenter')}
        href="/menteeCenter"
      >
        <Typography
          variant="div"
          color={
            path.includes('/menteeCenter')
              ? theme.colors.white
              : theme.colors.text.strong
          }
        >
          멘티 센터
        </Typography>
      </TopNavigator>
    </FlexBox>
  );
}

export default AppBarTab;
