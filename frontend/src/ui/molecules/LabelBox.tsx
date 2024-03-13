import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { ContentText } from '../atoms/ContentText';
import { device } from '../theme';
import FlexBox from '../atoms/FlexBox';

function LabelBox({
  width,
  text,
  helpText,
  children,
  adornment,
  labelColor,
}: {
  width?: string;
  text: string;
  helpText?: string;
  children?: ReactNode;
  adornment?: JSX.Element;
  labelColor?: string;
}) {
  return (
    <StyledLabelBox>
      {adornment ? (
        <FlexBox justifyContent="space-between" alignItems="flex-start">
          <ContentText text={text} helpText={helpText} />
          {adornment}
        </FlexBox>
      ) : (
        <ContentText text={text} helpText={helpText} />
      )}

      {children}
    </StyledLabelBox>
  );
}

const StyledLabelBox = styled.div(({ width }: { width?: string }) => ({
  width: width ?? '100%',
  [device('tablet')]: {
    width: '100%',
  },
}));

export default LabelBox;
