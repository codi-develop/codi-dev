import styled from '@emotion/styled';
import Logo from '@icons/logo/recommend-icon.svg';
import { usePathname, useRouter } from 'next/navigation';
import { PageComponentLayout } from '@/components/pages/mentorsMain/PageComonentLayout';
import theme from '@/ui/theme';
import TitleSection from './TitleSection';
import Button from '@/ui/atoms/Button';
import MentorList from '@/components/Mentor/Mentors/MentorList';
import { useJobRanksQuery } from '@/queries/jobQuery';
import { useGetRecommendationMentorsQuery } from '@/queries/mentorQuery';

function Recommendation() {
  const router = useRouter();
  const isMainPage = !usePathname().includes('mentorsMain');
  const { data: jobRanks, isSuccess } = useJobRanksQuery();

  const recommendationMentorsQueryParams = () => {
    if (!isSuccess || !jobRanks.infos) {
      return undefined;
    }

    return {
      disability: jobRanks.disability,
      firstJob: jobRanks.infos[0].job,
      secondJob: jobRanks.infos[1].job ?? '',
      thirdJob: jobRanks.infos[2].job ?? '',
    };
  };

  const {
    data: recommendationMentors,
    isSuccess: isRecommendationMentorsSuccess,
  } = useGetRecommendationMentorsQuery(recommendationMentorsQueryParams());
  return (
    <PageComponentLayout>
      <TitleSection
        logo={<Logo />}
        title="추천멘토"
        description="다양한 분야에서 꿈을 펼치고 있는 멘토들을 만나보세요!"
      />
      {isRecommendationMentorsSuccess && (
        <MentorList mentors={recommendationMentors} />
      )}

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          margin: '40px 0px',
        }}
      >
        {isMainPage && (
          <MoreMentorsButton
            onClick={() =>
              router.push(`/mentorsMain?fromRecommendation=${true}`)
            }
            variant="default"
            color={theme.colors.primary.normal}
          >
            멘토 전체 보기
          </MoreMentorsButton>
        )}
      </div>
      {/* <ApplyAndShareButtons /> */}
    </PageComponentLayout>
  );
}

const MoreMentorsButton = styled(Button)({
  fontWeight: theme.fonts.weight.black,
});

export default Recommendation;
