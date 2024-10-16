'use client';

import { useRouter } from 'next/navigation';
import SinglePageLayout from '@/components/Layout/SinglePageLayout';
import MenteeProfile from '@/components/Profile/MenteeProfile/MenteeProfile';
import ProfileCard from '@/components/Profile/ProfileCard';
import Content from '@/components/Profile/ProfileCard/Content';
import useGetProfileQuery from '@/queries/profileQuery';
import Button from '@/ui/atoms/Button';
import theme from '@/ui/theme';
import ProfileStatusCard from '@/components/Profile/ProfileStatusCard/ProfileStatusCard';
import Footer from '@/components/Profile/ProfileCard/Footer';

function MyInfoPage() {
  const { data: profile } = useGetProfileQuery();

  const router = useRouter();

  return (
    profile?.id && (
      <MenteeProfile profile={profile}>
        <ProfileCard width="328px" height="477px">
          <Content.Container>
            <Content.Avatar src={profile?.imgUrl} />
            <Content.Name name={profile?.nickname!} />
            <Content.EmploymentStatus
              employmentStatus={profile?.employmentStatus!}
            />
          </Content.Container>
          <Footer.Container>
            <Button
              onClick={() => router.push('/profileForm?edit=true')}
              size="small"
              variant="default"
              color={theme.colors.secondary.normal}
            >
              프로필 수정하기
            </Button>
          </Footer.Container>
        </ProfileCard>
      </MenteeProfile>
    )
  );
}

export default MyInfoPage;
