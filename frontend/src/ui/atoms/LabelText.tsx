import styled from '@emotion/styled';
import theme, { device } from '../theme';
import FlexBox from './FlexBox';
import Typography from './Typography';

export function LabelText({
  text,
  helpText,
  labelColor,
}: {
  text: string;
  helpText?: string;
  labelColor?: string;
}) {
  return (
    <FlexBox
      justifyContent="flex-start"
      alignItems="center"
      {...{
        marginBottom: '20px',
      }}
    >
      <LabelTextAdorement color={labelColor} />
      <FlexBox
        justifyContent="flex-start"
        {...{
          [device('tablet')]: {
            flexDirection: 'column',
            alignItems: 'flex-start ',
            rowGap: '8px',
          },
        }}
      >
        <StyledLabelText>{text}</StyledLabelText>
        <Typography
          variant="div"
          color={theme.colors.gray.dark}
          {...{
            marginLeft: '10px',
            [device('tablet')]: {
              marginLeft: '0px',
            },
          }}
        >
          {helpText!}
        </Typography>
      </FlexBox>
    </FlexBox>
  );
}

export const LabelTextAdorement = styled.div(
  ({ color }: { color?: string }) => ({
    width: '5px',
    height: '21px',
    borderRadius: '2px',
    marginRight: '15px',
    backgroundColor: color ?? theme.colors.primary.main,
  }),
);

export const StyledLabelText = styled.div`
  min-width: fit-content;
  font-size: ${theme.fonts.size.md};
  font-weight: ${theme.fonts.weight.extraBold};
`;
