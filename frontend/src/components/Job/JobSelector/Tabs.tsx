import { CATEGORIZED_JOBS } from '@/constants';
import Button from '@/ui/atoms/Button';
import FlexBox from '@/ui/atoms/FlexBox';
import theme, { device } from '@/ui/theme';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';

function Tabs({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: number;
  setSelectedTab: Dispatch<SetStateAction<number>>;
}) {
  return (
    <FlexBox
      justifyContent="flex-start"
      {...{
        [device('tablet')]: {
          maxWidth: '100%',
          overflowX: 'auto',
        },
      }}
    >
      {CATEGORIZED_JOBS.map(({ category }, index) => {
        return (
          <TabButton
            onClick={() => setSelectedTab(index)}
            type="button"
            variant="square"
            key={index}
            color={
              selectedTab === index
                ? theme.colors.primary.main
                : theme.colors.white
            }
            width="25%"
            hoverDisabled
            {...{
              [device('tablet')]: {
                width: '100%',
                maxWidth: '100%',
                height: '38px',
                minWidth: 'fit-content',
              },
            }}
          >
            {category}
          </TabButton>
        );
      })}
    </FlexBox>
  );
}

const TabButton = styled(Button)(({}) => ({
  borderRadius: '10px',
  borderBottomLeftRadius: '0px',
  borderBottomRightRadius: '0px',
  borderBottom: `2px solid ${theme.colors.primary.main}`,
}));

export default Tabs;
