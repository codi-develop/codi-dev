import { css } from '@emotion/css';
import Chip from '@/ui/atoms/Chip';
import MentoringCard from './MentoringCard';
import FlexBox from '@/ui/atoms/FlexBox';
import theme from '@/ui/theme';
import { DailyMentoringMember, MentoringMember } from '@/types/mentoring';
import { formattedDate } from '@/utils/dateFormat';
import Card from '@/ui/atoms/Card';

const today = (date: string) => {
  return date === formattedDate(new Date());
};

function Mentorings({
  mentorings,
}: {
  mentorings: DailyMentoringMember[] | DailyMentoringMember;
}) {
  if (Array.isArray(mentorings))
    return <MonthlyMentorings mentorings={mentorings} />;
  return (
    <div className={css({ width: '100%', marginBottom: '30px' })}>
      {mentorings?.mentoringMembers.length > 0 ? (
        <Chip
          color={
            today(mentorings?.date)
              ? theme.colors.primary.main
              : theme.colors.gray.main
          }
          fontColor={
            today(mentorings?.date)
              ? theme.colors.white
              : theme.colors.primary.main
          }
        >
          {mentorings?.date}
        </Chip>
      ) : (
        <div>예정된 멘토링이 없습니다.</div>
      )}

      <FlexBox
        justifyContent="flex-start"
        isWrap
        columnGap="20px"
        rowGap="20px"
        {...{ marginTop: '10px' }}
      >
        {mentorings?.mentoringMembers?.map(
          (
            {
              time,
              name,
              mentoringJob,
              mentoringId,
              platform,
              profileId,
              mentorId,
              imgUrl,
            },
            index,
          ) => (
            <MentoringCard
              imgUrl={imgUrl}
              profileId={profileId}
              mentorId={mentorId}
              mentoringId={mentoringId}
              date={mentorings?.date}
              time={time}
              name={name}
              mentoringJob={mentoringJob}
              platform={platform}
              key={index}
            />
          ),
        )}
      </FlexBox>
    </div>
  );
}

const MonthlyMentorings = ({
  mentorings,
}: {
  mentorings: DailyMentoringMember[];
}) => {
  return mentorings?.map(({ date, mentoringMembers }, index) => {
    return (
      <div
        className={css({ width: '100%', marginBottom: '30px' })}
        key={`mentoring-container-${index}-${new Date().toUTCString()}`}
      >
        <Chip
          color={
            today(date) ? theme.colors.primary.main : theme.colors.gray.main
          }
          fontColor={
            today(date) ? theme.colors.white : theme.colors.primary.main
          }
        >
          {date}
        </Chip>
        <FlexBox
          justifyContent="flex-start"
          isWrap
          columnGap="20px"
          rowGap="20px"
          {...{ marginTop: '10px' }}
        >
          {mentoringMembers?.map(
            ({
              time,
              name,
              mentoringJob,
              mentoringId,
              platform,
              profileId,
              mentorId,
              imgUrl,
            }) => (
              <MentoringCard
                profileId={profileId}
                mentorId={mentorId}
                mentoringId={mentoringId}
                date={date}
                time={time}
                name={name}
                mentoringJob={mentoringJob}
                platform={platform}
                imgUrl={imgUrl}
                key={`mentoring-member-${mentoringId}-${index}`}
              />
            ),
          )}
        </FlexBox>
      </div>
    );
  });
};

const chipColor = (today: boolean) => {
  return today ? theme.colors.primary.main : theme.colors.gray.main;
};

export default Mentorings;
