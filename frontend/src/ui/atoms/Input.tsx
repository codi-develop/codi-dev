import styled from '@emotion/styled';
import theme from '@/ui/theme';
import { InputProps, InputPropsContainsHtmlAttribute } from '@/types/ui';

export const borderStyle = (
  invalid: boolean | undefined,
  outline: boolean | undefined,
) => {
  if (invalid) {
    return theme.colors.error;
  }
  if (outline) return theme.colors.gray.main;
  return theme.colors.gray.light;
};

const Input = (props: InputPropsContainsHtmlAttribute) => (
  <StyledInput autoComplete="off" {...props} />
);

const StyledInput = styled.input(
  ({ width, outline, invalid, ...rest }: InputProps) => ({
    width: width ?? '100%',
    position: 'relative',
    height: '50px',
    borderRadius: '10px',
    border: '1px solid',
    borderColor: borderStyle(invalid, outline),
    background: 'var(--white, #fcfcfc)',
    boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.04)',
    paddingLeft: '30px',
    fontSize: `${theme.fonts.size.sm}px`,
    '::placeholder': {
      color: theme.colors.gray.dark,
    },
    ...rest,
  }),
);

export default Input;
