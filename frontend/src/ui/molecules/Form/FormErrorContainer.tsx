import { forwardRef, ReactNode } from 'react';
import FormError from '../Typography/FormError';
import styled from '@emotion/styled';

export const FormErrorContainer = forwardRef<
  HTMLDivElement,
  {
    errorMessage: string;
    children: ReactNode;
  }
>(({ errorMessage, children }, ref) => {
  return (
    <FormInputContainer ref={ref}>
      {children}
      {errorMessage && <FormError>{errorMessage}</FormError>}
    </FormInputContainer>
  );
});

const FormInputContainer = styled.div(({ width }: { width?: string }) => ({
  width: width ?? '100%',
  // position: 'relative',
}));
export default FormErrorContainer;
