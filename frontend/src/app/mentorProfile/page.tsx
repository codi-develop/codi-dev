'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import SinglePageLayout from '@/components/Layout/SinglePageLayout';
import MentorProfile from '@/components/Profile/MentorProfile/MentorProfile';
import ProfileCard from '@/components/Profile/ProfileCard';
import Content from '@/components/Profile/ProfileCard/Content';
import { useGetMentorQuery } from '@/queries/mentorQuery';
import Button from '@/ui/atoms/Button';
import theme, { device } from '@/ui/theme';

function MentorProfilePage() {
  const router = useRouter();
  const param = useSearchParams();

  const mentorId = parseInt(param.get('mentorId')!);
  const isMentoringApplied = param.get('mentoringId');

  const { data: mentor, isSuccess } = useGetMentorQuery({ mentorId });
  return (
    isSuccess && (
      <SinglePageLayout>
        <MentorProfile mentor={mentor!}>
          <ProfileCard width="322px">
            <Content.Container>
              <Content.Avatar src={mentor?.imgUrl} />
              <Content.Name name={mentor?.nickname!} />
              <Content.Job job={mentor?.job!} />
              <Content.Rating star={mentor?.star!} mentees={mentor?.mentees!} />
              <Content.Tags
                career={mentor?.career}
                disability={mentor?.disability!}
                severity={mentor?.severity!}
              />
            </Content.Container>
            {!isMentoringApplied && (
              <Button
                disabled={mentor?.futureScheduleCount === 0}
                onClick={() =>
                  router.push(`/mentoringApplyForm?mentorId=${mentorId}`)
                }
                size="small"
                variant="default"
                color={theme.colors.secondary.normal}
                {...{ marginTop: '20px' }}
              >
                멘토링 신청하기
              </Button>
            )}
          </ProfileCard>
        </MentorProfile>
      </SinglePageLayout>
    )
  );
}

export default MentorProfilePage;
