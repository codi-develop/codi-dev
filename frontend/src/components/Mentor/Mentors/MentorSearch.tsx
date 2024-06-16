import Search from '@icons/common/search.svg';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import Dropdown from '@/ui/atoms/Dropdown';
import IconInputContainer from '@/ui/molecules/Input/IconInput';
import FlexBox from '@/ui/atoms/FlexBox';
import Input from '@/ui/atoms/Input';
import Button from '@/ui/atoms/Button';
import theme, { device } from '@/ui/theme';
import { CAREERS, DISABILITIES, JOBS } from '@/constants';
import { GetMentorsParameters } from '@/types/api/mentor';
import { SetState } from '@/index';
import InvisibleLabel from '@/ui/atoms/InvisibleLabel';

function MentorSearch({
  query,
  setQuery,
  refetch,
  setSearched,
}: {
  query: GetMentorsParameters;
  setQuery: SetState<GetMentorsParameters>;
  setSearched: Dispatch<SetStateAction<string>>;
  refetch: () => void;
}) {
  return (
    <FlexBox
      justifyContent="flex-start"
      columnGap="10px"
      {...{
        [device('tablet')]: {
          flexDirection: 'column',
          rowGap: '10px',
        },
      }}
    >
      <FlexBox
        width="60%"
        columnGap="10px"
        {...{
          [device('tablet')]: {
            width: '100%',
          },
        }}
      >
        <Dropdown
          id="disability"
          type="form"
          width="30%"
          title="장애구분"
          categories={DISABILITIES}
          selectedCategory={query.disability!}
          setSelectedCategory={(disability) =>
            setQuery({ ...query, disability })
          }
          isReset
        />
        <Dropdown
          id="job"
          type="form"
          width="40%"
          title="직무"
          categories={JOBS}
          selectedCategory={query.job!}
          setSelectedCategory={(job) => setQuery({ ...query, job })}
          isReset
        />
        <Dropdown
          id="career"
          type="form"
          width="30%"
          title="경력"
          categories={CAREERS}
          selectedCategory={query.career!}
          setSelectedCategory={(career) => setQuery({ ...query, career })}
          isReset
        />
      </FlexBox>
      <FlexBox
        width="40%"
        columnGap="10px"
        {...{
          [device('tablet')]: {
            width: '100%',
          },
        }}
      >
        <InvisibleLabel
          htmlFor="search-mentor"
          text="원하는 멘토를 검색하세요"
        />
        <IconInputContainer iconComponent={<Search />}>
          <Input
            id="search-mentor"
            value={query.keyword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setQuery({ ...query, keyword: e.target.value })
            }
            outline
          />
        </IconInputContainer>

        <Button
          onClick={() => {
            setSearched(JSON.stringify(query));
          }}
          width="40%"
          color={theme.colors.primary.normal}
          variant="square"
        >
          검색
        </Button>
      </FlexBox>
    </FlexBox>
  );
}

export default MentorSearch;
