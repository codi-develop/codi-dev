import Prepare from '@icons/mentoring-categories/prepare.svg';
import Direction from '@icons/mentoring-categories/direction.svg';
import Info from '@icons/mentoring-categories/info.svg';
import JobPrepare from '@icons/mentoring-categories/jobPrepare.svg';
import Power from '@icons/mentoring-categories/power.svg';
import Share from '@icons/mentoring-categories/share.svg';
import Social from '@icons/mentoring-categories/social.svg';
import Tech from '@icons/mentoring-categories/tech.svg';
import { Dispatch, SetStateAction } from 'react';
import theme from '@/ui/theme';
import MentoringCategoryButton from './MentoringCategoryButton';
import FlexBox from '@/ui/atoms/FlexBox';

export interface MentorCategoriesData {
  iconComponent: any;
  text: string;
  value: string;
}

export const MENTOR_CATEGORIES = [
  { iconComponent: Prepare, text: '면접대비', value: 'PREPARINGINTERVIEW' },
  { iconComponent: Direction, text: '커리어방향', value: 'CAREERDIRECTION' },
  { iconComponent: Info, text: '일자리정보', value: 'JOBINFORMATION' },
  { iconComponent: JobPrepare, text: '취업준비', value: 'PREPARATIONEMPLOY' },
  { iconComponent: Power, text: '업무역량', value: 'WORKCOMPETENCY' },
  { iconComponent: Share, text: '경험공유', value: 'SHARINGEXPERIENCE' },
  { iconComponent: Social, text: '사회생활', value: 'SOCIALSKILL' },
  { iconComponent: Tech, text: '실무/기술', value: 'PRACTICALSKILL' },
];

function MentorCategoriesSelector({
  id,
  mentoringCategories,
  setMentoringCategories,
}: {
  id: string;
  mentoringCategories: string[];
  setMentoringCategories: Dispatch<SetStateAction<string[]>>;
}) {
  const disabled = (text: string) =>
    !mentoringCategories?.includes(text) && mentoringCategories?.length > 3;
  const handleClickMentoringCategory = (text: string) => {
    const copied = [...mentoringCategories];

    if (mentoringCategories?.includes(text)) {
      if (mentoringCategories.length === 1) {
        return;
      }
      setMentoringCategories([
        ...copied.filter((category) => category !== text),
      ]);
    } else setMentoringCategories([...copied, text]);
  };
  return (
    <FlexBox justifyContent="flex-start" columnGap="10px" rowGap="10px" isWrap>
      {MENTOR_CATEGORIES.map(
        ({ iconComponent: IconComponent, text }, index) => (
          <div
            id={id}
            key={index}
            onClick={() => handleClickMentoringCategory(text)}
          >
            <MentoringCategoryButton
              variant="square"
              type="button"
              selected={mentoringCategories?.includes(text)}
              disabled={disabled(text)}
              hoverDisabled
            >
              <IconComponent
                fill={
                  disabled(text)
                    ? theme.colors.gray.light
                    : mentoringCategories?.includes(text)
                      ? theme.colors.white
                      : theme.colors.primary.main
                }
              />
              {text}
            </MentoringCategoryButton>
          </div>
        ),
      )}
    </FlexBox>
  );
}

export default MentorCategoriesSelector;
