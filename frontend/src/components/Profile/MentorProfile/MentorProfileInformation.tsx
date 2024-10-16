import MyInfoCard from '@/components/pages/menteeCenter/myInfoCommon/MyInfoCard';
import FlexBox from '@/ui/atoms/FlexBox';
import Grid from '@/ui/atoms/Grid';
import LabelBox from '@/ui/molecules/LabelBox';
import ProfileLabelText from '../ProfileLabelText';
import { Mentor } from '@/types/profile';
import theme, { device } from '@/ui/theme';
import { MENTOR_CATEGORIES } from '@/components/Mentoring/MentoringCategory/MentoringCategoriesSelector';
import MentorCategoryButton from '@/components/Mentoring/MentoringCategory/MentoringCategoryButton';
import Typography from '@/ui/atoms/Typography';

function MentorProfileInformation({ mentor }: { mentor: Mentor }) {
  return (
    <MyInfoCard>
      <FlexBox
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        rowGap="60px"
      >
        <LabelBox text="멘토정보">
          <Grid
            gridTemplateColumns="repeat(auto-fit, minmax(300px, 2fr))"
            rowGap="10px"
          >
            <ProfileLabelText name="별명" value={mentor?.nickname} />
            <ProfileLabelText name="직무" value={mentor?.job} />
            <ProfileLabelText name="장애구분" value={mentor?.disability} />
            <ProfileLabelText name="중증도" value={mentor?.severity} />
            <ProfileLabelText name="경력" value={mentor?.career} />
          </Grid>
        </LabelBox>
        <LabelBox text="멘토링분야">
          <FlexBox
            justifyContent="flex-start"
            alignItems="center"
            columnGap="10px"
            {...{
              [device('tablet')]: {
                rowGap: '10px',
                flexWrap: 'wrap',
              },
            }}
          >
            {MENTOR_CATEGORIES.filter((category) =>
              mentor?.mentoringCategories?.find((c) => c === category.text),
            ).map(({ text, iconComponent: IconComponent }) => (
              <MentorCategoryButton variant="default" key={text} hoverDisabled>
                <IconComponent fill={theme.colors.primary.normal} />
                {text}
              </MentorCategoryButton>
            ))}
          </FlexBox>
        </LabelBox>
        <LabelBox text="자기소개">
          <Typography
            variant="div"
            lineHeight="21px"
            {...{ whiteSpace: 'pre-wrap' }}
          >
            {mentor?.introduction!}
          </Typography>
        </LabelBox>
      </FlexBox>
    </MyInfoCard>
  );
}

export default MentorProfileInformation;
