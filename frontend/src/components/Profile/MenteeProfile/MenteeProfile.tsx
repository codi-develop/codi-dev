'use client';

import styled from '@emotion/styled';
import { ReactNode } from 'react';
import FlexBox from '@/ui/atoms/FlexBox';
import Grid from '@/ui/atoms/Grid';
import { MenteeProfile as IMenteeProfile } from '@/types/profile';
import { device } from '@/ui/theme';
import MenteeProfileInformation from './MenteeProfileInformation';

interface MenteeProfilePageParams {
  profile?: IMenteeProfile;
  children?: ReactNode;
}

function MenteeProfile({ profile, children }: MenteeProfilePageParams) {
  return (
    <FlexBox
      justifyContent="space-between"
      alignItems="flex-start"
      columnGap="20px"
      rowGap="20px"
      {...{
        [device('tablet')]: {
          flexDirection: 'column',
        },
      }}
    >
      {children}

      <MenteeProfileInformation profile={profile!} />
    </FlexBox>
  );
}

const ReactiveGrid1 = styled(Grid)({
  [device('tablet')]: {
    gridTemplateColumns: '1fr',
  },
});

export default MenteeProfile;
