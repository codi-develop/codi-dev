import styled from '@emotion/styled'
import theme from '../theme'
import FlexBox from './FlexBox'
import Typography from './Typography'

export function ContentText({
  text,
  helpText,
  labelColor,
}: {
  text: string
  helpText?: string
  labelColor?: string
}) {
  return (
    <FlexBox
      justifyContent="flex-start"
      alignItems="center"
      {...{
        marginBottom: '20px',
      }}
    >
      <ContentTextAdorement color={labelColor} />
      <StyledContentText>{text}</StyledContentText>
      <Typography
        variant="div"
        color={theme.colors.gray.main}
        {...{ marginLeft: '10px' }}
      >
        {helpText!}
      </Typography>
    </FlexBox>
  )
}

export const ContentTextAdorement = styled.div(
  ({ color }: { color?: string }) => ({
    width: '5px',
    height: '21px',
    borderRadius: '2px',
    marginRight: '15px',
    backgroundColor: color ?? theme.colors.primary.main,
  }),
)

export const StyledContentText = styled.div`
  min-width: fit-content;
  font-size: ${theme.fonts.size.md};
  font-weight: ${theme.fonts.weight.extraBold};
`
