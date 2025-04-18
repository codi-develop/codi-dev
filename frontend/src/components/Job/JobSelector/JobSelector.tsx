import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Add from '@icons/common/add.svg';
import theme, { device } from '@/ui/theme';
import Card from '@/ui/atoms/Card';
import FlexBox from '@/ui/atoms/FlexBox';
import { getJobCategories } from '@/api/jobApi';
import { SetState } from '@/index';
import { DropdownContainer, DropdownButton } from '@/ui/atoms/Dropdown';
import Header from './Header';
import Tabs from './Tabs';
import TabContent from './TabContent';

export interface Jobs {
  classification: string;
  jobs: {
    name: string;
  }[];
}

function JobSelector({
  id,
  width,
  invalid,
  open,
  setOpen,
  selected,
  setSelected,
  ...rest
}: {
  id: string;
  width?: string;
  invalid: boolean | undefined;
  open: boolean;
  setOpen: SetState<boolean>;
  selected: string;
  setSelected: SetState<string>;
}) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [categorizedJobs, setCategorizedJobs] = useState<
    { name: string }[] | undefined
  >([]);
  const [isClickedOutside, setIsClickedOutside] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await getJobCategories<Jobs[]>();
      setJobs(data!);
      setCategorizedJobs(data![0].jobs);
    })();
  }, []);
  useEffect(() => {
    setCategorizedJobs(
      jobs?.find((_, index) => {
        return index === selectedTab;
      })?.jobs,
    );
  }, [selectedTab, jobs]);

  return (
    <DropdownContainer width={width} {...rest}>
      <JobSelectorDropdownButton
        id={id}
        width="100%"
        variant="square"
        type="button"
        color={theme.colors.white}
        invalid={invalid}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        hoverDisabled
        {...rest}
      >
        {selected || '직무 카테고리'}

        <Add id={id} />
      </JobSelectorDropdownButton>

      {open && (
        <Container>
          <FlexBox rowGap="30px" direction="column">
            <Header setOpen={setOpen} />
            <FlexBox
              direction="column"
              rowGap="20px"
              {...{
                [device('tablet')]: {},
              }}
            >
              <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
              <TabContent
                jobs={categorizedJobs!}
                selected={selected}
                setSelected={setSelected}
              />
            </FlexBox>
          </FlexBox>
        </Container>
      )}
    </DropdownContainer>
  );
}

const Container = styled(Card)({
  position: 'absolute',
  minWidth: '660px',
  height: 'auto',
  padding: '30px',
  marginTop: '10px',
  zIndex: 1,
  [device('tablet')]: {
    width: '100%',
    minWidth: 'auto',
    padding: '10px',
  },
});

const JobSelectorDropdownButton = styled(DropdownButton)(() => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'left',
}));

export default JobSelector;
