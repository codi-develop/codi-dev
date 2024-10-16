import { css } from '@emotion/css';
import styled from '@emotion/styled';
import MyInfoCard from '@/components/pages/menteeCenter/myInfoCommon/MyInfoCard';
import LabelBox from '@/ui/molecules/LabelBox';
import ProfileLabelText from '../ProfileLabelText';
import { MenteeProfile } from '@/types/profile';
import FlexBox from '@/ui/atoms/FlexBox';
import Chip from '@/ui/atoms/Chip';
import { device } from '@/ui/theme';
import Grid from '@/ui/atoms/Grid';
import Typography from '@/ui/atoms/Typography';
import Skeleton from 'react-loading-skeleton';

function MenteeProfileInformation({ profile }: { profile: MenteeProfile }) {
  return (
    <MyInfoCard
      className={css({
        minHeight: '477px',
      })}
    >
      <FlexBox direction="column" rowGap="60px">
        <LabelBox text="멘티정보">
          <ReactiveGrid1
            gridTemplateColumns="repeat(auto-fit, minmax(300px, 2fr))"
            rowGap="10px"
          >
            <ProfileLabelText name="이름" value={profile?.nickname} />
            <ProfileLabelText name="희망직무" value={profile?.desiredJob} />
            <ProfileLabelText name="장애구분" value={profile?.disability} />
            <ProfileLabelText
              name="취업상태"
              value={profile?.employmentStatus}
            />
            <ProfileLabelText name="중증도" value={profile?.severity} />
          </ReactiveGrid1>
        </LabelBox>

        <FlexBox
          justifyContent="flex-start"
          {...{
            [device('tablet')]: {
              marginTop: '20px',
              flexDirection: 'column',
              rowGap: '20px',
            },
          }}
        >
          <LabelBox text="희망직무" width="50%">
            <Chip>{profile?.desiredJob}</Chip>
          </LabelBox>
          <LabelBox text="태그" width="50%">
            <FlexBox justifyContent="flex-start" columnGap="10px">
              <Chip>{profile?.disability}</Chip>
              <Chip>{profile?.severity}</Chip>
            </FlexBox>
          </LabelBox>
        </FlexBox>
      </FlexBox>
    </MyInfoCard>
  );
}

const ReactiveGrid1 = styled(Grid)({
  [device('tablet')]: {
    gridTemplateColumns: '1fr',
  },
});

export default MenteeProfileInformation;
