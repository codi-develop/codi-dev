import styled from '@emotion/styled';
import Logo from '@icons/logo/recommendation-page-logo.svg';
import { useSelector } from 'react-redux';
import FlexBox from '@/ui/atoms/FlexBox';
import { PageComponentLayout } from '@/components/pages/mentorsMain/PageComonentLayout';
import Typography from '@/ui/atoms/Typography';
import theme, { device } from '@/ui/theme';
import TitleSection from '../pages/mentorsMain/TitleSection';
import { useJobRanksQuery } from '@/queries/jobQuery';
import { selectUser } from '@/features/user/userSlice';
import Button from '@/ui/atoms/Button';
import { useRouter } from 'next/navigation';

function JobRank() {
  const { id, isProfile } = useSelector(selectUser);
  const { data: jobRanks, isSuccess: isJobRanksQuerySuccess } =
    useJobRanksQuery();
  const router = useRouter();
  const description = () => {
    if (!id) {
      return '로그인 후 프로필을 작성하여 공공데이터를 기반으로한 추천 직무들을 확인해보세요!';
    }
    if (id && !isProfile) {
      return '프로필을 작성하여 공공데이터를 기반으로한 추천 직무들을 확인해보세요!';
    }
  };

  return (
    <PageComponentLayout>
      <FlexBox direction="column">
        <TitleSection
          title={`${jobRanks?.disability ?? ''} 취업 직무순위`}
          logo={<Logo />}
          description={description()}
        />
        {!id && (
          <Button variant="default" onClick={() => router.push('/signin')}>
            로그인 하기
          </Button>
        )}
        {id && !isProfile && (
          <Button variant="default" onClick={() => router.push('/profileForm')}>
            프로필 작성 하기
          </Button>
        )}
        {isJobRanksQuerySuccess &&
          (jobRanks?.infos?.length === 0 ? (
            <div>해당 장애로 취업자의 정보가 없습니다. </div>
          ) : (
            <FlexBox justifyContent="center" direction="column">
              {jobRanks?.infos?.map(({ job, ranking, ratio }, index) => (
                <Bar key={index} first={index === 0}>
                  <FlexBox alignItems="center" justifyContent="space-between">
                    <Typography
                      weight={
                        index === 0
                          ? theme.fonts.weight.extraBold
                          : theme.fonts.weight.regular
                      }
                      size={
                        index === 0 ? theme.fonts.size.md : theme.fonts.size.sm
                      }
                      color={theme.colors.text.strong}
                      variant="div"
                    >
                      {`${ranking}위 ${job}`}
                    </Typography>
                    <Typography
                      size={
                        index === 0 ? theme.fonts.size.md : theme.fonts.size.sm
                      }
                      color={theme.colors.text.strong}
                      variant="div"
                    >{`${ratio.toString()}%`}</Typography>
                  </FlexBox>
                </Bar>
              ))}
            </FlexBox>
          ))}
      </FlexBox>
    </PageComponentLayout>
  );
}

const Bar = styled.div(({ first }: { first: boolean }) => ({
  width: first ? '771px' : '709px',
  height: first ? '56px' : '39px',
  backgroundColor: first ? theme.colors.assist.normal : theme.colors.white,
  display: 'flex',
  alignItems: 'center',
  borderRadius: '43px',
  border: `1px solid ${theme.colors.background}`,
  padding: '0px 20px',
  boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.04)',
  marginBottom: '10px',
  ':last-child': {
    marginBottom: '0px',
  },
  [device('tablet')]: {
    width: first ? '100%' : '90%',
  },
}));

export default JobRank;
